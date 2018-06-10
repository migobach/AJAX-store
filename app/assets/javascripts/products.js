
  var editId;


$(document).ready( function() {

  
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',
    method: 'GET',
    dataType: 'JSON'
  }).done( function(products) {
    products.forEach( function(prod) {
      // if (prod.base_price == null ? 0 : false) 
      var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '<br>' + '<button class="edit" class="waves-effect waves-light btn-small">' + 'Edit' + '</button>' + '    ' + '<button class="delete" class="waves-effect waves-light btn-small">' + 'Delete' + '</button>' + '</li>'
      $('#product-list').append(li)
      // debugger
    })
  })


  $(document).on('click', '.edit', function(prod) {
    editId = this.parentNode.dataset.prodId
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + editId,
      method: 'GET',
      dataType: 'JSON'
    }).done( function(product){
      $('#name').val(`${product.name}`)
      $('#price').val(`${product.base_price}`)
      $('#desc').val(`${product.description}`)
      editId = product.id
      debugger
    })
  })


  $('#submit_button').on('click', function() {
    editId
    var name = $('#name').val()
    var base_price = $('#price').val()
    var description = $('#desc').val()
    var urlVal = ( editId == null ) ? 'http://json-server.devpointlabs.com/api/v1/products' : 'http://json-server.devpointlabs.com/api/v1/products/' + editId
    var typeVal = ( editId == null ) ? 'POST' : 'PUT'
    var prodVal = (editId == null ) ? { product: {name: name, base_price: base_price, description: description } } : { product: { base_price: base_price, color: null, description: description, id: editId, name: name, other_attributes: null, quantity_on_hand: 0, weight: null } } 

    $.ajax({
          url: urlVal, 
          type: typeVal,
          datatype: 'JSON',
          data: prodVal 
        })
      
  
    // FAKING THE USER TO BELIEVE THE PAGE UPDATED
    .done( function(prod) {
      var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '<br>' + '</li>'
      $('#product-list').append(li)
     
    // CLEARING INPUT VALUES 
      $('#name').val('')
      $('#base_price').val('')
      $('#description').val('')
    })
  })

    

  $(document).on('click', '.delete', function() {
    delId = this.parentNode.dataset.prodId
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + delId,
      method: 'DELETE'
    }).done( function(msg) {
      var row = $("[data-prod-id='" + delId + "'")
      // debugger
      row.remove('li');
      alert(msg.message)

    })
  })
})

