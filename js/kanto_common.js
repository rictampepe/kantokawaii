'use strict';

var KantoCommon = {
    SiteName: "Kanto Kawaii",
    ShoppingCartName: "KawaiiShoppingCart",
    Categories: [],
    FeaturedItemsSliderLimit: 8,
    LoadingCategories: false,
    Products: [],
    CartItems: [],
    DeliveryCharge: 15,
    MainMenu: [
        { 
            "link": "index.html",
            "name": "Home"
        },
        { 
            "link": "new_products.html",
            "name": "New Products"
        },
        { 
            "link": "featured_products.html",
            "name": "Featured Products"
        },
        { 
            "link": "about_us.html",
            "name": "About Us"
        },
        { 
            "link": "contact_us.html",
            "name": "Contact Us"
        }
    ],
    SocialLinks: [
        "fab fa-facebook-f",
        "fab fa-twitter",
        "fab fa-google-plus-g",
        "fab fa-linkedin-in",
        "fab fa-instagram",
        "fab fa-pinterest-p"
    ],
    Branches: [
        {
            "city": "Pasay",
            "address": "Coral Way cor., J.W. Diokno Blvd. Mall of Asia Complex",
            "barangay": "Brgy. 076 Zone 10, CBP 1-A"
        },
        {
            "city": "Pasig",
            "address": "Eulogio Rodriguez Jr. Ave. cor. Doña Julia Vargas Ave.",
            "barangay": "Frontera Verde, Ortigas Center, Ugong"
        },
        {
            "city": "Las Piñas",
            "address": "Alabang-Zapote Road",
            "barangay": "Brgy. Pamplona 2"
        },
        {
            "city": "Caloocan",
            "address": "Deparo Road",
            "barangay": "Barangay 171, Zone 15, District 1, Bagumbong 1421"
        },
        {
            "city": "Bacolod",
            "address": "Rizal Street, Reclamation Area",
            "barangay": ""
        },
        {
            "city": "Cebu",
            "address": "Juan Luna Ave. cor. Cabahug and Kaoshiung Streets",
            "barangay": "North Reclamation Area, Cebu Port Center, Mabolo"
        },
        {
            "city": "Davao",
            "address": "J.P. Laurel Ave.",
            "barangay": "Brgy. San Antonio, Agdao District"
        },
        {
            "city": "Cagayan De Oro",
            "address": "Fr. Masterson Avenue Cor. Gran Via St.",
            "barangay": "Pueblo de Oro Township, Uptown Carmen"
        }
    ],
    GetAddToCartButtonTemplate: function(productId, name, price) {
        var qtyButtons = '<div class="quantity buttons_added col-auto me-auto">';
        qtyButtons += '<input type="button" value="-" class="minus minus-btn">';
        qtyButtons += '<input type="number" step="1" name="quantity" value="1" class="input-text qty text">';
        qtyButtons += '<input type="button" value="+" class="plus plus-btn">';
        qtyButtons += '</div>';

        var addButton = '<div class="col-auto">';
        addButton += '<button type="button" class="add-cart-btn-sm hover-btn" data-bs-product-id="' + productId + '" data-bs-product-name="' + name + '" data-bs-product-price="' + price.toFixed(2) + '"><i class="uil uil-shopping-cart-alt"></i>Add To Cart</button>';
        addButton += '</div>';

        return qtyButtons + addButton;
    },
    BuildModalCategory: function() {        
        $.each(KantoCommon.Categories, function(i, item) {
            $("#modal-category").append("<li><a href='category.html?catId=" + item.categoryId + "' class='single-cat-item'><div class='icon'><img src='images/category/" + item.categoryId + ".svg' alt=''></div><div class='text'>" + item.name + "</div></a></li>");
            $("#footer-categories").append("<li><a href='category.html?catId=" + item.categoryId + "'>" + item.name + "</a></li>");
        });        
    },
    LoadFooterData: function() {
        $.each(KantoCommon.SocialLinks, function(i, item) {
            $(".social-links-footer ul").append('<li><a href="#"><i class="' + item + '"></i></a></li>');
        });

        $.each(KantoCommon.MainMenu, function(i, item) {
            $("#footer-links").append('<li><a href="' + item.link + '">' + item.name + '</a></li>');
        });

        $.each(KantoCommon.Branches, function(i, item) {
            $("#footer-cities").append('<li><a href="#">' + item.city + '</a></li>');
        });
    },
    ShowOfferSlider: function() {
        $("#offer-slider-items").removeClass("invisible");
        $('.offers-banner').owlCarousel({
            stagePadding: 50,
            loop:true,
            margin:15,
            nav:false,
            dots:false,
            autoplay:true,
            autoplayTimeout: 3000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                },
                1200:{
                    items:3
                },
                1400:{
                    items:3
                }
            }
        })
    },
    CreateProductItem: function(item) {
        if (item == undefined) return "";

        var productLink = '<a href="product.html?id=' + item.productId + '" class="product-img">';
        productLink += '<img src="images/product/' + item.productId + '_th.png" alt=""></a>';

        var productText = '<div class="product-text-dt">';
        productText += '<div class="product-price">&#8369;' + item.price.toFixed(2) + '</div>';
        productText += '<h4>' + item.name + '</h4>';
        productText += '<p>' + item.subTitle + '</p>';
        productText += '<div class="qty-cart" data-bs-product-id="' + item.productId + '">';
        productText += KantoCommon.GetAddToCartButtonTemplate(item.productId, item.name, item.price);
        productText += '</div>';

        var productItem = '<div class="item"><div class="product-item">';
        productItem += productLink + productText;
        productItem += '</div></div>';

        return productItem;
    },
    ShowCategorySlider: function() {
        $.each(KantoCommon.Categories, function(i, item) {
            $("#category-slider-items").append("<div class='item'><a href='category.html?catId=" + item.categoryId + "' class='category-item'><div class='cate-img'><img src='images/category/" + item.categoryId + ".png'></div><h4>" + item.name + "</h4></a></div>");
        });

        $("#category-slider-loader").remove();
        $("#category-slider-items").removeClass("invisible");

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
    },
    ShowFeaturedSlider: function() {
        $.getJSON("data/products.json", function(data) {
            if (data.length > 0) {
                var featuredItems = data.filter(i => i.isFeatured === true);
                var itemCount = 0;
                $.each(featuredItems, function(i, item) {
                    if (itemCount >= KantoCommon.FeaturedItemsSliderLimit) return false;
                    $("#featured-slider-items").append(KantoCommon.CreateProductItem(item));
                    itemCount++;
                });

                $("#featured-slider-loader").remove();
                $("#featured-slider-items").removeClass("invisible");                

                KantoCommon.InitializeFeatureSliderCarousel("#featured-slider-items");
                KantoCommon.InitializeAddToCartButtonTrigger();
            }
        });
    },
    ShowFeaturedCategorySlider: function() {
        var randomIndex = Math.floor(Math.random() * KantoCommon.Categories.length);
        var category = KantoCommon.Categories[randomIndex];

        if(category) {            
            $("#featured-category .main-title-left h2").text(category.name);
            $("#featured-category a").attr("href", "category.html?catId=" + category.categoryId);
            
            $.getJSON("data/products.json", function(data) {
                if (data.length > 0) {
                    var itemCount = 0;
                    $.each(category.productIds, function(i, id) {
                        if (itemCount >= KantoCommon.FeaturedItemsSliderLimit) return false;

                        var product = data.find(p => p.productId === id);
                        
                        if (product !== undefined) {                            
                            $("#featured-category-slider-items").append(KantoCommon.CreateProductItem(product));
                            itemCount++;
                        }
                    });

                    $("#featured-category-slider-loader").remove();
                    $("#featured-category-slider-items").removeClass("invisible");                    
                    
                    KantoCommon.InitializeFeatureSliderCarousel("#featured-category-slider-items");
                    KantoCommon.InitializeAddToCartButtonTrigger();
                }
            });
        }

    },
    ShowNewProductsSlider: function() {
        $.getJSON("data/products.json", function(data) {
            if (data.length > 0) {
                var newItems = data.filter(i => i.isNew === true);
                var itemCount = 0;
                $.each(newItems, function(i, item) {
                    if (itemCount >= KantoCommon.FeaturedItemsSliderLimit) return false;
                    $("#new-products-slider-items").append(KantoCommon.CreateProductItem(item));
                    itemCount++;
                });

                $("#new-products-slider-loader").remove();
                $("#new-products-slider-items").removeClass("invisible");                

                KantoCommon.InitializeFeatureSliderCarousel("#new-products-slider-items");
                KantoCommon.InitializeAddToCartButtonTrigger();
            }
        });
    },
    InitializeAddToCartButtonTrigger: function() {
        $('button.add-cart-btn-sm').off('click');
        $('button.add-cart-btn-sm').on('click', function (e) {
            e.preventDefault();
            var productId = $(this).attr('data-bs-product-id');
            var name = $(this).attr('data-bs-product-name');
            var price = $(this).attr('data-bs-product-price');
            var productQty = $(this).closest("div.qty-cart").find(".qty");
            
            KantoCommon.AddItemToCart(productId, name, price, productQty.val());            
        });
    },
    InitializeFeatureSliderCarousel: function(target) {
        $(target).owlCarousel({
            items: KantoCommon.FeaturedItemsSliderLimit,
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
    },
    BuildPageHeader: function() {
        var mainLogo = '<div class="main_logo" id="logo">';
        mainLogo += '<a href="index.html"><img src="images/logo.png" alt=""></a>';
        mainLogo += '<a href="index.html"><img class="logo-inverse" src="images/dark-logo.png" alt=""></a>';
        mainLogo += '</div>';

        var headerRight = '<div class="header_right">';
        headerRight += '<ul>';
        headerRight += '<li><a href="#" class="offer-link"><i class="uil uil-phone-alt"></i>(63)2-1234-5678</a></li>';
        headerRight += '<li><a href="faq.html" class="offer-link"><i class="uil uil-question-circle"></i>Help</a></li>';
        headerRight += '<li><a href="#" class="option_links" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-bs-title="Cart"><i class="uil uil-shopping-cart-alt"></i></a></li>';
        headerRight += '</ul></div>';

        var topHeaderGroup = '<div class="top-header-group"><div class="top-header">' + mainLogo + headerRight + '</div></div>';

        var navbarToggle = '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">';
        navbarToggle += '<span class="navbar-toggler-icon"><i class="uil uil-bars"></i></span></button>';

        var offcanvasHeader = '<div class="offcanvas-header">';
        offcanvasHeader += '<div class="offcanvas-logo" id="offcanvasNavbarLabel"><img src="images/dark-logo-1.png" alt=""></div>';
        offcanvasHeader += '<button type="button" class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><i class="uil uil-multiply"></i></button></div>';
        
        var offcanvasCategory = '<div class="offcanvas-category mb-4 d-block d-lg-none">';
        offcanvasCategory += '<div class="offcanvas-search position-relative">';
        offcanvasCategory += '<input class="canvas_search" type="text" name="search_product" placeholder="Search for products..">';
        offcanvasCategory += '<i class="uil uil-search hover-btn canvas-icon"></i>';
        offcanvasCategory += '</div><button class="category_drop_canvas hover-btn mt-4" data-bs-toggle="modal" data-bs-target="#category_model" title="Categories"><i class="uil uil-apps"></i><span class="cate__icon">Select Category</span></button>';
        offcanvasCategory += '</div>';

        var offcanvasBody = '<div class="offcanvas-body">';
        offcanvasBody += offcanvasCategory;

        var navbarItems = '';
        $.each(KantoCommon.MainMenu, function(i, item) {
            navbarItems += '<li class="nav-item"><a class="nav-link" href="' + item.link + '">' + item.name + '</a></li>';
        });

        offcanvasBody += '<ul class="navbar-nav justify-content-start flex-grow-1 pe_5">';
        offcanvasBody += navbarItems;
        offcanvasBody += '</ul>';
        offcanvasBody += '<div class="d-block d-lg-none">';
        offcanvasBody += '<ul class="offcanvas-help-links">';
        offcanvasBody += '<li><a href="#" class="offer-link"><i class="uil uil-phone-alt"></i>(63)2-1234-5678</a></li>';
        offcanvasBody += '<li><a href="faq.html" class="offer-link"><i class="uil uil-question-circle"></i>Help</a></li>';
        offcanvasBody += '</ul>';
        offcanvasBody += '<div class="offcanvas-copyright"><i class="uil uil-copyright"></i>Copyright 2025 <b>Kanto Kawaii</b>. All rights reserved</div>';
        offcanvasBody += '</div></div></div>';

        var navBar = '<nav class="navbar navbar-expand-lg bg-gambo kanto-head navbar justify-content-lg-start pt-0 pb-0">';
        navBar += navbarToggle;
        navBar += '<a href="#" class="category_drop hover-btn" data-bs-toggle="modal" data-bs-target="#category_model" title="Categories"><i class="uil uil-apps"></i><span class="cate__icon">Select Category</span></a>';
        navBar += '<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">';;
        navBar += offcanvasHeader + offcanvasBody;
        navBar += '<div class="sub_header_right"><div class="night_mode_switch__btn">';
        navBar += '<a href="#" id="night-mode" class="btn-night-mode"><i class="uil uil-moon"></i> Night mode<span class="btn-night-mode-switch"><span class="uk-switch-button"></span></span></a>';
        navBar += '</div></div></nav>';

        return topHeaderGroup + '<div class="sub-header-group"><div class="sub-header">' + navBar + '</div></div>';
    },
    InitializeNightModeSwitch: function() {
        var nightMode = document.querySelector('#night-mode');

        nightMode.addEventListener('click', function (event) {
            event.preventDefault();
            document.documentElement.classList.toggle('night-mode');
            if (document.documentElement.classList.contains('night-mode')) {
                localStorage.setItem('gmtNightMode', true);
                return;
            }
            localStorage.removeItem('gmtNightMode');
        }, false);
    },    
    InitializeOwlCarousel: function(target) {
        $(target).owlCarousel({
            loop:true,
            margin:20,
            nav:false,
            dots:false,
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
                    items:4
                }
            }
        })
    },
    BuildSidebarCart: function() {
        var offcanvasHeader = '<div class="offcanvas-header bs-canvas-header side-cart-header p-3">';
        offcanvasHeader += '<div class="d-inline-block main-cart-title" id="offcanvasRightLabel">My Cart <span></span></div>';
        offcanvasHeader += '<button type="button" class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><i class="uil uil-multiply"></i></button>';
        offcanvasHeader += '</div>';
        var offcanvasBody = '<div class="offcanvas-body p-0" id="sidebarCartBody"></div>';

        var offcanvasFooter = '<div class="offcanvas-footer" id="sidebarCartFooter"></div>';
        return offcanvasHeader + offcanvasBody + offcanvasFooter;
    },
    SidebarCartItemDisplay: function(item) {
        var cartImg = '<div class="cart-product-img"><img src="images/product/' + item.productId + '_th.png" alt=""></div>';
        var cartText = '<div class="cart-text">';
        cartText += '<h4>' + item.name + '</h4>';
        cartText += '<div class="qty-group">';
        cartText += '<div class="quantity buttons_added"><input type="button" value="-" class="minus minus-btn">';
        cartText += '<input type="number" step="1" name="quantity" value="' + item.qty + '" class="input-text qty text">';
        cartText += '<input type="button" value="+" class="plus plus-btn"></div>';
        cartText += '<div class="cart-item-price">&#8369;' + item.price.toFixed(2) + '</div>';
        cartText += '</div>';
        cartText += '<button type="button" class="cart-close-btn" data-bs-product-id="' + item.productId + '"><i class="uil uil-multiply"></i></button>';
        cartText += '</div>';
        return '<div class="cart-item" data-bs-product-id="' + item.productId + '">' + cartImg + cartText + '</div>';
    },
    AddSidebarCartHeaderSection: function() {
        document.querySelector("#offcanvasRightLabel span").innerHTML = "(" + KantoCommon.CartItems.length + " Items)";

        $("#sidebarCartBody")
            .empty()
            .append('<div class="cart-top-total p-4"><div class="cart-total-dil"><h4>Delivery Charge</h4><span>&#8369;' + KantoCommon.DeliveryCharge.toFixed(2) + '</span></div></div>')
            .append('<div class="side-cart-items" id="sidebarCartItems"></div>');
    },
    AddSidebarCartFooterSection: function() {
        $("#offcanvasRight div.offcanvas-footer").show();

        $("#sidebarCartFooter")
            .append('<div class="cart-total-dil px-4 py-2"><h4>Item Total</h4><span></span></div>')
            .append('<div class="main-total-cart" id="sidebarCartTotal"><h2>Order Total</h2><span></span></div>')
            .append('<div class="checkout-cart"><a href="#" class="promo-code">Have a promocode?</a><a href="checkout.html" class="cart-checkout-btn hover-btn">Proceed to Checkout</a></div>');
    },
    CalculateSidebarCartOrder: function() {
        var itemTotal = 0;
        $.each(KantoCommon.CartItems, function(i, item) {            
            itemTotal += item.qty * item.price;
        });
        document.querySelector("#sidebarCartFooter div.cart-total-dil span").innerHTML = '&#8369;' + itemTotal.toFixed(2);
        document.querySelector("#sidebarCartTotal span").innerHTML = '&#8369;' + (itemTotal + KantoCommon.DeliveryCharge).toFixed(2);
    },
    InitializeSidebarCart: function() {
        if (KantoCommon.CartItems.length == 0) {
            KantoCommon.CartEmpty();
            return;
        }

        KantoCommon.AddSidebarCartHeaderSection();

        var itemTotal = 0;
        $.each(KantoCommon.CartItems, function(i, item) {            
            $("#sidebarCartItems").append(KantoCommon.SidebarCartItemDisplay(item));

            itemTotal += item.qty * item.price;
        });

        KantoCommon.AddSidebarCartFooterSection();
        KantoCommon.CalculateSidebarCartOrder();
        KantoCommon.UpdateCartItemCount();
    },
    CartEmpty: function() {
        $("#sidebarCartBody")
            .empty()
            .append('<div class="side-cart-items" id="sidebarCartItems"></div>');
        //$("#sidebarCartBody").append('<div class="side-cart-items" id="sidebarCartItems"></div>');
        //$("#sidebarCartBody div.cart-top-total").remove();
        //$("#sidebarCartItems").empty();
        $("#sidebarCartItems").append("<div class='no-cart-item'><p>There are no items in your shopping cart</p></div>");
        // $("#offcanvasRight div.offcanvas-footer").hide();
        // $("#offcanvasRight div.offcanvass-footer div.main-total-dil").hide();
        // $("#offcanvasRight div.offcanvass-footer div.main-total-cart").hide();

        $("#offcanvasRight div.offcanvas-footer").empty();

        KantoCommon.UpdateCartItemCount();
    },
    UpdateCartItemCount: function() {
        var cartLabel = document.querySelector("#offcanvasRightLabel span");
        var cartItemsCountLink = document.querySelector('a[data-bs-target="#offcanvasRight"]');
        var cartItemsCountSpan = document.querySelector('span[data-source="cart-items-count"]');        

        if (KantoCommon.CartItems.length > 0) {
            if ($(cartItemsCountSpan).length) {
                $(cartItemsCountSpan).text(KantoCommon.CartItems.length);
                cartLabel.innerHTML = "(" + KantoCommon.CartItems.length + " Items)";
            }
            else {
                $(cartItemsCountLink).append("<span data-source='cart-items-count' class='noti_count1'>" + KantoCommon.CartItems.length + "</span>");
            }
            return;
        }
        
        cartLabel.innerHTML = '';
        $(cartItemsCountSpan).remove();
    },
    ShowToastMessage: function(message) {
        $.toast({
            heading: 'Success',
            text: message,
            showHideTransition: 'fade',
            icon: 'success',
            hideAfter: 2000,
            position: 'top-right'
        });
    },
    AddItemToCart: function(productId, name, price, qty) {
        var itemExists = false;
        var newQty = 0;
        $.each(KantoCommon.CartItems, function(i, item) {
            if (item.productId == productId) {
                item.qty = newQty = item.qty + parseInt(qty);
                itemExists = true;
                return false;
            }            
        });

        var showCartSections = false;
        var noItem = document.querySelector("#sidebarCartItems div.no-cart-item");
        if ($(noItem).length) showCartSections = true;
    
        if (!itemExists) {
            var newItem = { "productId": parseInt(productId), "name": name, "price": parseFloat(price), "qty": parseInt(qty) };
            KantoCommon.CartItems.push(newItem);
            
            if (showCartSections) {
                $("#sidebarCartItems div.no-cart-item").remove();
                KantoCommon.AddSidebarCartHeaderSection();
            }

            $("#sidebarCartItems").append(KantoCommon.SidebarCartItemDisplay(newItem));

            if (showCartSections) {
                KantoCommon.AddSidebarCartFooterSection();
            }
        } else {
            $('#sidebarCartItems div[data-bs-product-id="' + productId + '"]').find('input[name="quantity"]').val(newQty);
        }
    
        if (('localStorage' in window)) {
            localStorage.setItem(KantoCommon.ShoppingCartName, JSON.stringify(KantoCommon.CartItems));
        }
        KantoCommon.CalculateSidebarCartOrder();
        KantoCommon.UpdateCartItemCount();
        KantoCommon.ShowToastMessage(itemExists ? 'Item quantity in cart has been updated!' : 'Item has been added to cart!');
    },
    ShowContactUsBranches: function() {
        $.each(KantoCommon.Branches, function(i, branch) {
            var heading = '<div class="panel-heading" id="branch-head-' + i + '">';
            heading += '<div class="panel-title">';
            heading += '<a class="collapsed" data-bs-toggle="collapse" data-bs-target="#branch-' + i + '" href="#" aria-expanded="false" aria-controls="branch-' + i + '">';
            heading += '<i class="uil uil-location-point chck_icon"></i>' + branch.city;
            heading += '</a></div></div>';

            var tabPanel = '<div id="branch-' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + branch.city + '" data-bs-parent="#branches">';
            tabPanel += '<div class="panel-body">';
            tabPanel += branch.city + ' City Branch <br />';            
            tabPanel += branch.address + '<br />';
            tabPanel += branch.barangay + '<br />';
            $("#branches").append('<div class="panel panel-default">' + heading + tabPanel + '</div>');
        });
    }
};

if ('localStorage' in window) {
    var storedCartItems = localStorage.getItem(KantoCommon.ShoppingCartName);
    if (storedCartItems) {
        KantoCommon.CartItems = JSON.parse(storedCartItems);            
    }

    var categoryStore = localStorage.getItem('ShopCategories');
    if (!categoryStore) {
            $.ajax({
            url: 'data/categories.json',
            type: 'GET',
            async: false,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {                
                if (data.length > 0) {
                    $.each(data, function(_idx, item) {
                        KantoCommon.Categories.push(item);                        
                    });

                    localStorage.setItem('ShopCategories', JSON.stringify(KantoCommon.Categories));
                }
            }
        });
    } else {
        KantoCommon.Categories = JSON.parse(categoryStore);
    }
}
