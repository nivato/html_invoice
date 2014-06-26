function verify_inputs(){
    var error = false;
    take_off_errors_signs_from_inputs();
    var product_name = $('#product-name').val();
    if (product_name.length < 3){
        $('#product-name').addClass('error');
        error = true;
    }
    var quantity = parseFloat($('#quantity').val());
    if (isNaN(quantity)){
        $('#quantity').addClass('error');
        error = true;
    }
    var price = parseFloat($('#price').val());
    if (isNaN(price)){
        $('#price').addClass('error');
        error = true;
    }
    if (error){
        return;
    } else {
        add_product_row(product_name, quantity, price);
    }
}

function take_off_errors_signs_from_inputs(){
    $('#product-name').removeClass('error');
    $('#quantity').removeClass('error');
    $('#price').removeClass('error');
}

function clear_inputs(){
    $('#product-name').val('');
    $('#units').val('pcs');
    $('#quantity').val('');
    $('#price').val('');
}

function add_product_row(product_name, quantity, price){
    var row = jQuery('<div/>', {class: 'table-row'});
    var number_cell     = jQuery('<div/>', {class: 'tr-cell number'});
    var product_cell    = jQuery('<div/>', {class: 'tr-cell product'});
    var units_cell      = jQuery('<div/>', {class: 'tr-cell units'});
    var quantity_cell   = jQuery('<div/>', {class: 'tr-cell quantity'});
    var price_cell      = jQuery('<div/>', {class: 'tr-cell price'});
    var total_cell      = jQuery('<div/>', {class: 'tr-cell total'});
    var actions_cell    = jQuery('<div/>', {class: 'tr-cell actions'});
    row.append(number_cell, product_cell, units_cell, quantity_cell, price_cell, total_cell, actions_cell);
    product_cell.text(product_name);
    units_cell.text($('#units option:selected').text());
    quantity_cell.text(quantity);
    price_cell.text(price);
    total_cell.text(quantity * price);
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    edit_button.click(make_row_editable);
    delete_button.click(delete_product_row);
    $('.rows-wrapper').append(row);
    make_rows_ordering();
    calculate_total_price();
    clear_inputs();
}

function make_row_editable(event){
    var button = $(event.target);
    var row = button.parent().parent();
    row.addClass('editable-row');
    var all_cells = row.children().toArray();
    for (var i = 0; i < all_cells.length; i++){
        $(all_cells[i]).addClass('editable-cell');
    }
    
    var product_cell = row.children('.product').first();
    var product_input = jQuery('<input/>', {type: 'text', class: 'edit-input wide-edit'});
    product_input.val(product_cell.text());
    product_cell.text('');
    product_cell.append(product_input);
    
    var quantity_cell = row.children('.quantity').first();
    var quantity_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    quantity_input.val(quantity_cell.text());
    quantity_cell.text('');
    quantity_cell.append(quantity_input);
    
    var price_cell = row.children('.price').first();
    var price_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    price_input.val(price_cell.text());
    price_cell.text('');
    price_cell.append(price_input);
}

function delete_product_row(event){
    var button = $(event.target);
    var row = button.parent().parent();
    row.remove();
    make_rows_ordering();
    calculate_total_price();
}

function make_rows_ordering(){
    var all_number_cells = $('.tr-cell.number').toArray();
    for (var i = 0; i < all_number_cells.length; i++){
        $(all_number_cells[i]).text(i + 1);
    }
}

function calculate_total_price(){
    var all_total_cells = $('.tr-cell.total').toArray();
    var total_price = 0;
    for (var i = 0; i < all_total_cells.length; i++){
        total_price += parseFloat($(all_total_cells[i]).text());
    }
    $('#total-price').text(total_price);
}

function add_product_row_on_enter(event){
    var keyCode = (typeof event.which === 'number')? event.which: event.keyCode;
    if (keyCode === 13){
        verify_inputs();
    }
}

function start(){
    $('#add-button').click(verify_inputs);
    $('#product-name').keyup(add_product_row_on_enter);
    $('#quantity').keyup(add_product_row_on_enter);
    $('#price').keyup(add_product_row_on_enter);
}

$(document).ready(start);
