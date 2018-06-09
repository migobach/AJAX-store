
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

  // original up above

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
    })
  })

  //1: get item information from the server @ id
      //2: populate the form from the server item 
      //3: @ submit adjust POST method with a PUT statement use a ternary
      //4: refresh the data in the list

  // original down below

  $('#submit_button').on('click', function() {
    editId
    var name = $('#name').val()
    var base_price = $('#price').val()
    var description = $('#desc').val()
    var urlVal = ( editId == null ) ? 'http://json-server.devpointlabs.com/api/v1/products' : 'http://json-server.devpointlabs.com/api/v1/products' + editId
    var typeVal = ( editId == null ) ? 'POST' : 'PUT'
    var prodVal = (editId == null ) ? { product: {name: name, base_price: base_price, description: description } } : { product: {id: prodId, name: name, base_price: base_price, description: description } } 
    debugger

    $.ajax({
          url: urlVal, 
          type: typeVal,
          datatype: 'JSON',
          data: prodVal 
        })


    // AJAX REQUEST POSTING TO SERVER 
    // if (editId = null ) {
    //   debugger
    //   $.ajax({
    //     url: 'http://json-server.devpointlabs.com/api/v1/products',
    //     type: 'POST',
    //     datatype: 'JSON',
    //     data: prod 
    //   })
    // }
    // else
    //   $.ajax({
    //     url: 'http://json-server.devpointlabs.com/api/v1/products' + prodId, 
    //     type: 'PUT',
    //     datatype: 'JSON',
    //     data: prod
    //   })
  
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

  //  here is how I am supposed to be able to edit EDIT FUNCTION

    

    //   debugger
    //   $('#name') = prod.name
    // $('#price') = prod.base_price
    // $('#description') = prod.description
  



    // // setting the valus in the form to the selected product values
    //   var name = $('#name').val()
    //   var base_price = $('#price').val()
    //   var description = $('#desc').val()
    //   var id = prod.id
    //   debugger
    //   var prodNew = { product: { id: id, name: name, base_price: base_price, description: description } }
    // $.ajax({
    //   url: 'http://json-server.devpointlabs.com/api/v1/products/' + prod.id,
    //   type: 'POST',
    //   dataType: 'JSON',
    //   data: prodNew


      //make a cancel button and have that be the else
    // }).done(function (prodNew) {
    //   var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '<br>' + '</li>'
    //   $('#product-list').append(li)
    //   $('#name').val('')
    //   $('#base_price').val('')
    //   $('#description').val('')
    // }).fail( function(err) {
    //   alert(err.responseJSON.errors)
    // })

  // DELETE function

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


      //1: get item information from the server @ id
      //2: populate the form from the server item 
      //3: @ submit adjust POST method with a PUT statement use a ternary
      //4: refresh the data in the list
    })
  })
})

