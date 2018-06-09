


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
      var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '<br>' + '</li>'
      $('#product-list').append(li)
     
    // CLEARING INPUT VALUES 
      $('#name').val('')
      $('#base_price').val('')
      $('#description').val('')
    })
  })

  // here is how I am supposed to be able to edit EDIT FUNCTION

  $(document).on('click', '.edit', function(prod) {
    editId = $(this).parentNode.dataset.prodId
    debugger
    $('#name') = prod.name
    $('#price') = prod.base_price
    $('#description') = prod.description
    debugger
    // setting the valus in the form to the selected product values
      var name = $('#name').val()
      var base_price = $('#price').val()
      var description = $('#desc').val()
      var id = prod.id
      debugger
      var prodNew = { product: { id: id, name: name, base_price: base_price, description: description } }
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + prod.id,
      type: 'POST',
      dataType: 'JSON',
      data: prodNew
//make a cancel button and have that be the else

    }).done(function (prodNew) {
      var li = '<li data-prod-id="'+ prod.id +'" class="collection-item">' + prod.name +  '<br>' + '$' + prod.base_price + '<br>'  + prod.description + '<br>' + 'Quantity: ' + prod.quantity_on_hand + '<br>' + '</li>'
      $('#product-list').append(li)
      $('#name').val('')
      $('#base_price').val('')
      $('#description').val('')
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    });
  })
      // debugger 


//   editingGame = $(this).siblings('.game-item').data().id
//   toggleForm();
// });
// $(document).on('submit', '#game-form form', function(e) {
//   e.preventDefault(); //stops from going to server
//   var data = $(this).serializeArray();
//   var url = '/games';
//   var method = 'POST'
//   if (editingGame) {
//     url = url + '/' + editingGame;
//     method = 'PUT'
//     debugger
  // _ajax_request(url, data, callback, method) {
  //   return jQuery.ajax({
  //       url: url,
  //       type: method,
  //       data: data,
  //       success: callback
  //   });
})


// $(document).on('click', '.game-item', function() {
//   currentGame.id = this.dataset.id
//   currentGame.name = this.dataset.name
//   $.ajax({
//     url: '/games/' + currentGame.id + '/characters',
//     method: 'GET',
//     dataType: 'JSON'
//   }).done( function(characters) {
//     $('#game').text('Characters in ' + currentGame.name);
//     var list = $('#characters');
//     list.empty();
//     characters.forEach( function(char) {
//       var li = '<li data-character-id="' + char.id + '">' + char.name + '-' + char.power + '</li>'
//       list.append(li)
//     });
//   });
// });

