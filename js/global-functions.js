

function LoadCategories() {
    var categorySlider = $("#category-slider-items");
    // if (Categories.length == 0) {
    //     $.ajax({
    //         url: 'data/categories.json',            
    //         type: 'GET',
    //         async: true,
    //         contentType: "application/json",
    //         dataType: 'json',
    //         success: function(data) {
    //             $.each(data, function(_idx, item) {
    //                 Categories.push(item);
    //                 $("#modal-category").append("<li><a href='category.html?catId=" + item.categoryId + "' class='single-cat-item'><div class='icon'><img src='images/category/" + item.categoryId + ".svg' alt=''></div><div class='text'>" + item.name + "</div></a></li>");

    //                 if (categorySlider.length > 0) {
    //                     categorySlider.append("<div class='item'><a href='category.html?catId=" + item.categoryId + "' class='category-item'><div class='cate-img'><img src='images/category/" + item.categoryId + ".png'></div><h4>" + item.name + "</h4></a></div>");
    //                 }
    //             });
                
    //             if (categorySlider.length > 0) {
    //                 InitializeCategorySlider();
    //             }
    //         }
    //     });
    // }
    $.each(Categories, function(_idx, item) {
        $("#modal-category").append("<li><a href='category.html?catId=" + item.categoryId + "' class='single-cat-item'><div class='icon'><img src='images/category/" + item.categoryId + ".svg' alt=''></div><div class='text'>" + item.name + "</div></a></li>");

        if (categorySlider.length > 0) {
            categorySlider.append("<div class='item'><a href='category.html?catId=" + item.categoryId + "' class='category-item'><div class='cate-img'><img src='images/category/" + item.categoryId + ".png'></div><h4>" + item.name + "</h4></a></div>");
        }
    });
    
    if (categorySlider.length > 0) {
        $("#category-slider-section").removeClass("invisible");
        InitializeCategorySlider();
    }    
}

function LoadProducts() {
    var featuredProducts = $("#featured-products-slider");

    if (featuredProducts.length) {
        LoadFeaturedProducts();                    
    }

    // if (Products.length == 0) {
    //     $.ajax({
    //         url: 'data/products.json',
    //         type: 'GET',
    //         async: true,
    //         contentType: "application/json",
    //         dataType: 'json',
    //         success: function(data) {                
    //             if (data.length > 0) {
    //                 $.each(data, function(_idx, item) {
    //                     Products.push(item);                        
    //                 });                    
    //             }

    //             if (featuredProducts.length) {
    //                 LoadFeaturedProducts();                    
    //             }
    //         }
    //     });
    // }    
}

function LoadFeaturedProducts() {
    var featuredProductsSlider = $("#featured-products-slider");

    $.get("featured-item.html", function(data) {
        var featuredProducts = Products.filter(p => p.isFeatured === true);
        
        $.each(featuredProducts, function(_idx, item) {
            var featuredItemTemplate = data.replace("${{ProductImage}}", item.thumbnail).replace("${{ProductName}}", item.name).replace("${{ProductSubTitle}}", item.subTitle).replaceAll("${{ProductPrice}}", item.price.toFixed(2)).replaceAll("${{ProductId}}", item.productId.toString());            

            featuredProductsSlider.append(featuredItemTemplate);
        });

        $("#featured-products-section").removeClass("invisible");
        InitializeFeaturedSlider();
    });

}

function LoadSiteComponents() {    
    $("footer[class='footer']").load("page-footer.html");
    //$("header[class='header clearfix']").load("page-header.html");
    $.ajax({
        url: 'page-header.html',
        type: 'GET',
        async: true,
        contentType: "text/html",
        success: function(result) {
            $("header[class='header clearfix']").html(result);
            $.getScript('js/night-mode.min.js');

            var currentPage = window.location.pathname.replace("/", "");
            if (currentPage === "")
                currentPage = "index.html";

            $("a[class='nav-link'][href='" + currentPage + "']").addClass("active");
            InitializeShoppingCart();
        }
    });

    $.ajax({
        url: 'cart-sidebar.html',
        type: 'GET',
        async: true,
        contentType: "text/html",
        success: function(result) {
            $("#offcanvasRight").html(result);
            InitializeSidebarCart();
        }
    });

    //$("#offcanvasRight").load("cart-sidebar.html");
}

function InitializeCategorySlider() {    
	$('.cate-slider').owlCarousel({
		loop:true,
		margin:15,
		nav:true,
		dots:false,
		navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
		responsive:{
			0:{
				items:2
			},
			600:{
				items:2
			},
			1000:{
				items:4
			},
			1200:{
				items:6
			},
			1400:{
				items:6
			}
		}
	})
}

function InitializeFeaturedSlider() {
    $('.featured-slider').owlCarousel({
        items: 8,
        loop:true,
        margin:15,
        nav:true,
        dots:false,
        navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            },
            1200:{
                items:4
            },
            1400:{
                items:5
            }
        }
    })

    InitializeAddToCartButton();
}

function InitializeModalCategory() {
    for (var i=0; i<Categories.length; i++) {
        $("#modal-category").append("<li><a href='#' class='single-cat-item'><div class='icon'><img src='images/category/" + Categories[i].categoryId + ".svg' alt=''></div><div class='text'>" + Categories[i].name + "</div></a></li>");
    }
}

function UpdateCartItemCount() {
    var cartItemsCountLink = document.querySelector('a[data-bs-target="#offcanvasRight"]');
    var cartItemsCountSpan = document.querySelector('span[data-source="cart-items-count"]');

    if (CartItems.length > 0) {
        if ($(cartItemsCountSpan).length) {
            $(cartItemsCountSpan).text(CartItems.length);        
        }
        else {
            $(cartItemsCountLink).append("<span data-source='cart-items-count' class='noti_count1'>" + CartItems.length + "</span>");
        }
        return;
    }
    
    $(cartItemsCountSpan).remove();    
}

function InitializeShoppingCart() {
    if (('localStorage' in window)) {        
        var storedCartItems = localStorage.getItem(ShoppingCartName);
        if (storedCartItems) {
            CartItems = JSON.parse(storedCartItems);            
        }

        if (CartItems.length > 0) {
            UpdateCartItemCount();
        }
    }    
}

function InitializeAddToCartButton() {
    $('button.add-cart-btn-sm').on('click', function (e) {
        e.preventDefault();
        var productId = $(this).attr('data-bs-product-id');
        var price = $(this).attr('data-bs-product-price');
        var productQty = $(this).closest("div.qty-cart").find(".qty");
        
        AddItemToCart(productId, price, productQty.val());	
    });
}

function InitializeSidebarCart() {
    var cartBodyItems = document.querySelector("#sidebarCartItems");

    if (CartItems.length > 0) {
        var cartLabel = document.querySelector("#offcanvasRightLabel span");
        cartLabel.innerHTML = "(" + CartItems.length + " Items)";        

        $.get("cart-sidebar-item.html", function(data) {
            SidebarCartItemTemplate = data;

            $.each(CartItems, function(_idx, item) {
                var productInfo = Products.find(p => p.productId === item.productId);
                var cartItemTemplate = SidebarCartItemTemplate.replace("${{ProductImage}}", productInfo.thumbnail).replace("${{ProductName}}", productInfo.name).replace("${{ProductPrice}}", productInfo.price.toFixed(2)).replace("${{CartQty}}", item.qty.toString()).replaceAll("${{ProductId}}", item.productId.toString());

                $(cartBodyItems).append(cartItemTemplate);
            });            
        });

    } else {
        $("#offcanvasRight div.offcanvas-footer").hide();
        $("#offcanvasRight div.offcanvass-footer div.main-total-cart").remove();
        $(cartBodyItems).append("<div class='no-cart-item'><p>There are no items in your shopping cart</p></div>");
    }

    UpdateSidebarCartTotal();
}

function UpdateSidebarCartTotal() {
    var total = 0;
    if (CartItems.length > 0) {
        document.querySelector("#offcanvasRightLabel span").innerHTML = "(" + CartItems.length + " Items)";

        total = CartItems.reduce(function(subTotal, item) {
            return subTotal + (item.price * item.qty);
        }, 0);        
    }
    document.querySelector("#sidebarCartTotal span").innerHTML = "&#8369; " + total.toFixed(2);
    
}

function AddItemToSidebarCart(productId, price, qty) {
    $("#sidebarCartItems .no-cart-item").remove();
    $("#sidebarCartItems").show();
    $("#offcanvasRight div.offcanvas-footer").show();    

    var cartBodyItems = document.querySelector("#sidebarCartItems");
    var productInfo = Products.find(p => p.productId === parseInt(productId));
    var cartItemTemplate = "";

    if (SidebarCartItemTemplate.length) {
        cartItemTemplate = SidebarCartItemTemplate.replace("${{ProductImage}}", productInfo.thumbnail).replace("${{ProductName}}", productInfo.name).replace("${{ProductPrice}}", price.toFixed(2)).replace("${{CartQty}}", qty).replaceAll("${{ProductId}}", productId.toString());
        $(cartBodyItems).append(cartItemTemplate);
        
    } else {
        $.get("cart-sidebar-item.html", function(data) {
            SidebarCartItemTemplate = data;
            cartItemTemplate = SidebarCartItemTemplate.replace("${{ProductImage}}", productInfo.thumbnail).replace("${{ProductName}}", productInfo.name).replace("${{ProductPrice}}", price.toFixed(2)).replace("${{CartQty}}", qty).replaceAll("${{ProductId}}", productId.toString());

            $(cartBodyItems).append(cartItemTemplate);    
        });
    }    
}

function UpdateSidebarCartItem(productId) {
    var cartItem = CartItems.find(i => i.productId == productId);

    $("#sidebarCartItems div[data-bs-product-id='" + productId +"'] .cart-text .qty-group .quantity .qty").val(cartItem.qty);
}

function AddItemToCart(productId, price, qty) {
    var itemExists = false;

    $.each(CartItems, function(_i, item) {
        if (item.productId == productId) {
            item.qty = item.qty + parseInt(qty);
            itemExists = true;
            return false;
        }            
    });

    if (!itemExists) {
        CartItems.push({ "productId": parseInt(productId), "price": parseFloat(price), "qty": parseInt(qty) });
    }

    if (('localStorage' in window)) {
        localStorage.setItem(ShoppingCartName, JSON.stringify(CartItems));
    }

    UpdateCartItemCount();
    if (itemExists) {
        UpdateSidebarCartItem(parseInt(productId));
    } else {
        AddItemToSidebarCart(productId, parseFloat(price), qty);
    }
    
    UpdateSidebarCartTotal();

    $.toast({
        heading: 'Success',
        text: itemExists ? 'Item quantity in cart has been updated!' : 'Item has been added to cart!',
        showHideTransition: 'fade',
        icon: 'success',
        hideAfter: 2000,
        position: 'top-right'
    });
}