var currentProduct = {};

function listProducts() {

}

$(document).ready( function() {
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',
    method: 'GET',
    dataType: 'JSON'
  }).done( function(products) {
    debugger
      products.forEach( function(prod) {
        // if (prod.base_price == null ? 0 : false) 
        var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '</li>'
        $('#product-list').append(li)
      })
  })
})
 

// characters.forEach( function(char) {
//   var li = '<li data-character-id="' + char.id + '">' + char.name + '-' + char.power + '</li>'
//   list.append(li)
