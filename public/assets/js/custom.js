$(document).ready(function () {
    $(document).on('submit', '#contact-form', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $messages = $form.find('#form-response');
        $messages.html('');
        const formData = new FormData(this);

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {

                $('.field-error.text-danger').text('');
                if (response.success) {
                    $messages.text("Thank you! We'll be in touch shortly.").css('color', '#C69247').fadeIn();

                    setTimeout(() => {
                        $form[0].reset();
                        $messages.html('');
                    }, 1500);
                }
            },
            error: function (response) {
                if (response.responseJSON.error) {
                    $.each(response.responseJSON.error, function (field, message) {
                        const $input = $form.find('[name="' + field + '"]');
                        const $errorContainer = $form.find('[data-error-for="' + field + '"]');

                        $input.addClass('error');
                        $errorContainer.html(Array.isArray(message) ? message.join('<br>') : message);
                    });
                }
            }
        });
    });


    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get('s');
    const tag = params.get('tag');

    if ((searchValue != 'null' && searchValue != null) || (tag != 'null' && tag != null)) {

        $.ajax({
            url: blogSearchUrl,
            type: 'GET',
            data: { q: searchValue, tag: tag },
            success: function (data) {
                let html = '';
                if (data.length === 0) {
                    html = '<div class="grid-item"><p class="text-center fw-bold fs-5">Oops! No blogs here right now.</p></div>';
                } else {
                    data.forEach(function (item) {

                        html += `
                            <div class="col-12 col-md-4" data-aos="fade-down" data-aos-duration="1000">
                <div class="news-blogs-box blog-page-news">
                    <div class="news-blogs-img">
                           ${item.image ? `<img src="${item.image}" alt="blog-img" class="object-cover">` : ''}
                    </div>
                    <div class="news-blogs-text">
                        <h4><a href="/blog/${item.slug}">${item.title}</a></h4>
                        <small>${item.updated_at}<span><svg width="9px" height="9px">
                            <path fill-rule="evenodd" fill="rgb(193, 153, 119)" d="M4.670,0.008 L8.909,4.254 L4.663,8.493 L0.424,4.247 L4.670,0.008 Z" /></svg></span> 
                            ${Array.isArray(item.category) ? item.category.join(", ") : item.category}
                        </small>
                        <p>${item.short_description}</p>
                        <a href="${item.button_url }/${item.slug}" class="btn btn-primary">${item.button_text }</a>
                    </div>
                </div>
            </div>
                       `;
                   });
                }

                $('.blog_search').html(html);
            }
        });
    }

    $('.star').each(function() {
        var rating = parseInt($(this).data('rating')) || 0;
        var maxStars = 5;
        $(this).empty(); // clear any existing content

        // Add filled stars
        for (var i = 1; i <= rating; i++) {
            $(this).append('<i class="fas fa-star"></i>');
        }

        // Add empty stars
        for (var i = rating + 1; i <= maxStars; i++) {
            $(this).append('<i class="far fa-star"></i>');
        }
    });

    $(document).on('submit', '#book-table-form', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $messages = $form.find('#form-response');
        $messages.html('');
        const formData = new FormData(this);

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {

                $('.field-error.text-danger').text('');
                if (response.success) {
                    $messages.text("Your table has been successfully booked!").css('color', '#C69247').fadeIn();

                    setTimeout(() => {
                        $form[0].reset();
                        $messages.html('');
                    }, 1500);
                }
            },
            error: function (response) {
                if (response.responseJSON.error) {
                    $.each(response.responseJSON.error, function (field, message) {
                        const $input = $form.find('[name="' + field + '"]');
                        const $errorContainer = $form.find('[data-error-for="' + field + '"]');

                        $input.addClass('error');
                        $errorContainer.html(Array.isArray(message) ? message.join('<br>') : message);
                    });
                }
            }
        });
    });



    var today = new Date();
    today.setHours(0,0,0,0);

    $('#datepickers').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: today,
        onSelect: function() {
            updateTimepicker();
        }
    });
    if ($('.book-table-section').length > 0) {

        function updateTimepicker() {
            var selectedDate = $('#datepickers').datepicker('getDate');
            var now = new Date();
            var minTime = '07:00am';
            var maxTime = '06:00pm';

            if (selectedDate) {
                $('#timepickers').timepicker('destroy');
                selectedDate.setHours(0,0,0,0);
                var todayCheck = new Date();
                todayCheck.setHours(0,0,0,0);
            // If selected date is today, set minTime to current time
                if (selectedDate.getTime() === todayCheck.getTime()) {
                    console.log("Selected date is today");
                    var hours = now.getHours();
                    var minutes = Math.ceil(now.getMinutes() / 15) * 15;
                    if (minutes === 60) {
                        hours += 1;
                        minutes = 0;
                    }

                // Prevent minTime from exceeding 6:00pm
                    if (hours >= 18) {
                        minTime = '06:00pm';
                    } else {
                        minTime = ((hours > 12 ? hours-12 : hours) || 12) + ':' +
                        (minutes < 10 ? '0'+minutes : minutes) +
                        (hours >= 12 ? 'pm' : 'am');
                    }
                }
            }

        // Initialize timepicker
            $('#timepickers').timepicker({
                timeFormat: 'h:mm p',
                interval: 15,
                minTime: minTime,
                maxTime: maxTime,
                defaultTime: minTime,
                dynamic: false,
                dropdown: true,
                scrollbar: true,
                showSecond: false
            });
        }

    // Initialize timepicker on page load
        updateTimepicker();
    }


   function updateCartDisplay() {
        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        let $cartItems = $('#cart-items');
        let $cartsection = $('#cart-section');
        let $cartsectionerror = $('.cart-section');
        $cartItems.html('');
        
        if (cart.length === 0) {
           $cartsection.addClass('d-none');
            $cartsectionerror.append(`

                <div class="text-center">
                    Looks like you have not added anything to your cart. Go ahead, explore top categories.
                </div>
            
            `);
            $('#cart-subtotal').text('$0.00');
            $('#cart-total').text('$0.00');
            return;
        }

        $cartsection.removeClass('d-none');
        let subtotal = 0;

        cart.forEach((item, index) => {
            let price = parseFloat(item.price?.toString().replace('$', '') || 0);
            let itemTotal = price * item.qty;
            subtotal += itemTotal;

            $cartItems.append(`
                <tr>
                    <td><a href="javascript:;" class="remove" aria-label="Remove" data-index="${index}">×</a></td>
                    <td data-label="Description" class="description-col">
                        <div class="product-images-title">
                            <div class="product-images">
                                <a href="javascript:;"><img src="${item.image}" alt="${item.title}"></a>
                            </div>
                            <h4 class="product-title"><a href="javascript:;">${item.title}</a></h4>
                        </div>
                    </td>
                    <td data-label="Price" class="price-col">
                        <h4><span>$${price.toFixed(2)}</span></h4>
                    </td>
                    <td data-label="Quantity">
                        <div class="quantity-form">
                            <form method="POST" class="quantity">
                                <input type="button" value="-" class="qtyminus minus" data-index="${index}">
                                <input type="text" name="quantity" value="${item.qty}" class="qty" data-index="${index}">
                                <input type="button" value="+" class="qtyplus plus" data-index="${index}">
                            </form>
                        </div>
                    </td>
                    <td class="product-subtotal">
                        <p class="Price-amount">$${itemTotal.toFixed(2)}</p>
                    </td>
                </tr>
            `);
        });

        $('#cart-subtotal').text(`$${subtotal.toFixed(2)}`);
        $('#cart-total').text(`$${subtotal.toFixed(2)}`);
    }

    // Add product to cart
    $(document).on('click', '.add-to-cart', function() {
        let id = $(this).data('id');
        let title = $(this).data('title');
        let price = parseFloat(($(this).data('price') || '0').toString().replace('$', '')) || 0;
        let image = $(this).data('image');

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        let existing = cart.find(i => i.id === id);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({id, title, price, image, qty: 1});
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    // Remove item
    $(document).on('click', '.remove', function() {
        let index = $(this).data('index');
        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        cart.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    // Qty input change
    $(document).on('change', '.qty', function() {
        let index = $(this).data('index');
        let qty = parseInt($(this).val(), 10) || 1;

        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        if (cart[index]) {
            cart[index].qty = qty;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Plus button
    $(document).on('click', '.qtyplus', function () {
        let index = $(this).data('index');
        let input = $(`.qty[data-index="${index}"]`);
        let qty = parseInt(input.val(), 10) || 1;
        input.val(qty + 1).trigger('change');
    });

    // Minus button
    $(document).on('click', '.qtyminus', function () {
        let index = $(this).data('index');
        let input = $(`.qty[data-index="${index}"]`);
        let qty = parseInt(input.val(), 10) || 1;
        if (qty > 1) input.val(qty - 1).trigger('change');
    });

    // Initialize on load
    updateCartDisplay();


    $(document).on('click', '.menu-popup-link', function(e) {
    e.preventDefault();
    var $button = $(this);
    var slug = $button.data('slug');
    var $popup = $('#test-menu-cart');

        // Show loading state in popup
    $popup.html('<div class="error-message">No content found for this team member.</div>');


    $.ajax({
        url: '/products/' + slug + '?type=popup',
        type: 'GET',
        dataType: 'html',
        headers: { 
            'X-Requested-With': 'XMLHttpRequest'
        },
        success: function(response) {
        // Inject the response into the popup container
            var $response = $('<div>').html(response);
            var $popupContent = $response.find('.menu_html').html();
            if ($popupContent) {
                $popup.html($popupContent);
            } else {
                $popup.html('<div class="error-message">No content found for this team member.</div>');
            }

        // Optional: open popup here (if not opened above)
            $.magnificPopup.open({
                items: { src: '#test-menu-cart' },
                type: 'inline'
            });
        },
        error: function(xhr, status, error) {
            $('#test-menu-cart').html(
                '<div class="error-message">' +
                '   <p>Error loading team member details.</p>' +
                '   <button class="retry-btn">Retry</button>' +
                '</div>'
                );

        // Add retry functionality
            $('.retry-btn').on('click', function() {
                $button.trigger('click');
            });
        }
    });
});
});