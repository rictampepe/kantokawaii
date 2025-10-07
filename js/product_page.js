$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    var categoryId = urlParams.get('catId');

    var productInfo = Products.find(p => p.productId === parseInt(productId));
    var categoryInfo = Categories.find(c => c.categoryId === parseInt(categoryId));

    if (categoryInfo !== undefined) {
        $("#category-breadcrumb")
            .text(categoryInfo.name)
            .attr("href", "category.html?catId=" + categoryId);        
    } else {
        $("#category-breadcrumb").closest("li").remove();
    }

    
    if (productInfo !== undefined) {
        document.title = SiteName + " - " + productInfo.name;        
        $("#active-breadcrumb").text(productInfo.name);
        $("#product-info").removeClass("invisible");
        $("#product-title").text(productInfo.name);
        $("#product-subTitle").text(productInfo.subTitle);
        $("#product-price span").text("₱" + productInfo.price.toFixed(2));
        
        $("#product-image").append("<img src='images/product/" + productInfo.image + "'>");
        $("#product-details p").text(productInfo.details);
        
        InitializeAddToCartButton();
    } else {
        $("#active-breadcrumb").text("Product Not Found");
        $("#product-info").remove();
        $("#no-product").removeClass("invisible");
    }

    
});