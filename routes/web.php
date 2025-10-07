<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use Statamic\Facades\Site;

Site::all()->each(function (Statamic\Sites\Site $site) {
	Route::prefix($site->url())->group(function () {
		Route::statamic('/blog/category/{category_slug}', 'category');
	});
});

Route::get('/blog-search', [BlogController::class, 'search'])->name('blog.search');