$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
    var categoryId = urlParams.get('catId');   

    var currentCategory = Categories.find(c => c.categoryId === parseInt(categoryId));

    console.log(currentCategory.productIds);

    if (currentCategory !== undefined) {
        document.title = SiteName + " - " + currentCategory.name;
        $("#active-breadcrumb").text(currentCategory.name);
        $("#category-title").text(currentCategory.name);

        $.ajax({
            url: 'category-item.html',
            type: 'GET',
            async: true,
            contentType: "text/html",
            success: function(result) {
                var productItem = "";
                var productListView = $("#product-list-view");

                $.each(currentCategory.productIds, function(idx, id) {
                    var product = Products.find(p => p.productId === id);
                    
                    if (product !== undefined) {
                        productItem = result.replace("${{ProductImage}}", product.thumbnail).replace("${{ProductName}}", product.name).replace("${{ProductSubTitle}}", product.subTitle).replaceAll("${{ProductPrice}}", product.price.toFixed(2)).replaceAll("${{ProductId}}", product.productId.toString());
                        productListView.append(productItem);
                    }                    
                });

                InitializeAddToCartButton();
            }
        });
    }

    
});