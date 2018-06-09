var currentProduct = {};

function listProducts() {

}

$(document).ready( function() {

  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',
    method: 'GET',
    dataType: 'JSON'
  }).done( function(products) {
      products.forEach( function(prod) {
        // if (prod.base_price == null ? 0 : false) 
        var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '</li>'
        $('#product-list').append(li)
      })
  })


  $('#submit_button').on('click', function() {
    var name = $('#name').val()
    var base_price = $('#price').val()
    var description = $('#desc').val()
    var prod = { product: {name: name, base_price: base_price, description: description } }
   
    // AJAX REQUEST POSTING TO SERVER 
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'POST',
      datatype: 'JSON',
      data: prod 
    })
  
    // FAKING THE USER TO BELIEVE THE PAGE UPDATED
    .done( function(prod) {
      var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '</li>'
      $('#product-list').append(li)
     
    // CLEARING INPUT VALUES 
      $('#name').val('')
      $('#base_price').val('')
      $('#description').val('')
    })
  })
})
