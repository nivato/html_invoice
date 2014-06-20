function verify_inputs(){
    var error = false;
    take_off_errors_signs_from_inputs();
    var product_name = $('#product-name').val();
    if (product_name.length < 3){
        $('#product-name').attr('class', 'input-field error');
        error = true;
    }
    var quantity = parseFloat($('#quantity').val());
    if (isNaN(quantity)){
        $('#quantity').attr('class', 'input-field error');
        error = true;
    }
    var price = parseFloat($('#price').val());
    if (isNaN(price)){
        $('#price').attr('class', 'input-field error');
        error = true;
    }
    if (error){
        return;
    } else {
        add_product_row(product_name, quantity, price);
    }
}

function take_off_errors_signs_from_inputs(){
    $('#product-name').attr('class', 'input-field');
    $('#quantity').attr('class', 'input-field');
    $('#price').attr('class', 'input-field');
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
    number_cell.text($('.rows-wrapper').children().length + 1);
    product_cell.text(product_name);
    units_cell.text($('#units option:selected').text());
    quantity_cell.text(quantity);
    price_cell.text(price);
    total_cell.text(quantity * price);
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    $('.rows-wrapper').append(row);
    
    calculate_total_price();
    clear_inputs();
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
