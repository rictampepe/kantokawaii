$(document).ready(function() {
    'use strict';
    
	var urlParams = new URLSearchParams(window.location.search);
    var categoryId = urlParams.get('catId');   

    var currentCategory = KantoCommon.Categories.find(c => c.categoryId === parseInt(categoryId));

    if (currentCategory !== undefined) {
        document.title = KantoCommon.SiteName + " - " + currentCategory.name;
        $("#active-breadcrumb").text(currentCategory.name);
        $("#category-title").text(currentCategory.name);

        $.getJSON("data/products.json", function(data) {
            if (data.length > 0) {            
                $.each(currentCategory.productIds, function(i, id) {
                    var product = data.find(p => p.productId === id);
                    if (product !== undefined) {
                        var productLink = '<a href="product.html?id=' + id + '&catId=' + categoryId + '" class="product-img">';
                        productLink += '<img src="images/product/' + id + '_th.png" alt=""></a>';

                        var productInfo = '<div class="product-text-dt">';
                        productInfo += '<div class="product-price">&#8369;' + product.price.toFixed(2) + '</div>';
                        productInfo += '<h4>' + product.name + '</h4>';
                        productInfo += '<p>' + product.subTitle + '</p>';
                        productInfo += '<div class="qty-cart" data-bs-product-id="' + id + '">';
                        productInfo += KantoCommon.GetAddToCartButtonTemplate(id, product.name, product.price);
                        productInfo += '</div></div>';

                        $("#product-list-view").append('<div class="col-lg-3 col-md-6"><div class="product-item mb-30">' + productLink + productInfo + '</div></div>');
                    }
                });

                KantoCommon.InitializeAddToCartButtonTrigger();
            }
        });
    }    
});