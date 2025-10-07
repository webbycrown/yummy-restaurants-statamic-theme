<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Statamic\Facades\Form;
use Statamic\Facades\Term;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function search(Request $request){   
        // Get the search keyword from the request
        $query = $request->get('q');
        $tag = $request->get('tag');

                    // Query blog entries from the 'blog' collection matching the title
        $entries = Entry::query()
        ->where('collection', 'blogs')
        ->when(!empty($tag), function ($q) use ($tag) {
                        $q->where('tag', 'like', "%$tag%"); // or ->whereJsonContains('tags', $tag)
                    })
        ->when($query, function ($q) use ($query) {
            $q->where(function ($subQuery) use ($query) {
                $subQuery->where('title', 'like', "%{$query}%")
                ->orWhere('slug', 'like', "%{$query}%");
            });
        })
            ->orderBy('updated_at', 'desc') // Sort results by last updated
            ->get()
            ->map(function ($entry) {
                $image = $entry->get('image'); // Get image field (can be array of asset IDs)
                return [
                    'title' => $entry->get('title'),
                    'short_description' => $entry->get('short_description'),
                    'category' => $entry->get('category'),
                    'button_text' => $entry->get('button_text'),
                    'button_url' => $entry->get('button_url'),
                    'slug' => $entry->slug(),
                    'url' => $entry->url(),
                    // Convert asset paths to public URLs
                    'image' =>  collect($image)->map(function ($asset) {
                        return url('assets/'.$asset);
                    })->toArray(),
                    // Format the updated date

                    'updated_at' => Carbon::createFromTimestamp($entry->get('updated_at'))->format('F j, Y'),
                    'date' =>  Carbon::createFromTimestamp($entry->get('updated_at'))->format('d'),
                    'day' =>  Carbon::createFromTimestamp($entry->get('updated_at'))->format('F'),
                ];
            });

        return response()->json($entries);  // Return as JSON response
    }
}
