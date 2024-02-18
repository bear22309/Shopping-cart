$(document).ready(function () {
  
  let totalPrice = 0;

  $('#add-item').on('click', function () {
      const newItemName = $('#new-item').val();
      const newItemPrice = parseFloat($('#new-item-price').val());

      if (newItemName && !isNaN(newItemPrice) && newItemPrice > 0) {
          addItem(newItemName, newItemPrice);
          updateTotal();
      }
  });

  $(document).on('click', '.delete-item', function () {
      const row = $(this).closest('tr');
      const subtotal = parseFloat(row.find('.subtotal').text());
      totalPrice -= subtotal;
      row.remove();
      updateTotal();
  });

  function addItem(name, price) {
      const quantity = 0; 
      const subtotal = quantity * price;

      // Append the item
      $('#cart-items').append(`
          <tr class="cart-item">
              <td>${name}</td>
              <td class="price">$${price.toFixed(2)}</td>
              <td><input type="number" class="quantity" value="${quantity}"></td>
              <td class="subtotal">$${subtotal.toFixed(2)}</td>
              <td><button class="btn btn-danger delete-item">Delete</button></td>
          </tr>
      `);

      // Update the quantity after appending the item
      $('.cart-item:last .quantity').on('change', function () {
          updateSubtotal($(this));
      });
  }

  function updateSubtotal(quantityInput) {
      const row = quantityInput.closest('tr');
      const quantity = parseInt(quantityInput.val());
      const price = parseFloat(row.find('.price').text().substring(1)); // Remove the dollar sign
      const subtotal = quantity * price;
      row.find('.subtotal').text('$' + subtotal.toFixed(2));
      updateTotal();
  }

  function updateTotal() {
    var total = 0;

    $('.cart-item').each(function () {
        var quantity = $(this).find('.quantity').val();
        var price = parseFloat($(this).find('.price').text().replace('$', '')); // Remove the dollar sign
        var subtotal = quantity * price;

        total += subtotal;
    });

    $('#total-price').text('' + total.toFixed(2));
}


  updateTotal();
});
