var CartItems = [];
var Categories = [];
var Products = [];
var CategoryProducts = [];
const ShoppingCartName = "KawaiiShoppingCart";
const SiteName = "Kanto Kawaii";
var SidebarCartItemTemplate = "";

$.ajax({
    url: 'data/products.json',
    type: 'GET',
    async: false,
    contentType: "application/json",
    dataType: 'json',
    success: function(data) {                
        if (data.length > 0) {
            $.each(data, function(_idx, item) {
                Products.push(item);                        
            });                    
        }
    }
});

$.ajax({
    url: 'data/categories.json',            
    type: 'GET',
    async: false,
    contentType: "application/json",
    dataType: 'json',
    success: function(data) {
        if (data.length > 0) {
            $.each(data, function(_idx, item) {
                // var categoryProducts = CategoryProducts.filter(c => c.categoryId === item.categoryId);
                // if (categoryProducts.length > 0) {
                //     $.each(categoryProducts, function(_pIdx, cp) {
                //         var product = Products.find(p => p.productId === cp.productId);
                //         if (product !== undefined) {
                //             item.products.push(product);
                //         }
                //     });                    
                // }
                Categories.push(item);            
            });
        }                
    }
});

