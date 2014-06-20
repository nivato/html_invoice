function add_product_row(){
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
    product_cell.text($('#product-name').val());
    units_cell.text($('#units option:selected').text());
    quantity_cell.text($('#quantity').val());
    price_cell.text($('#price').val());
    total_cell.text('total');
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    $('.rows-wrapper').append(row);
}

function add_product_row_on_enter(event){
    var keyCode = (typeof event.which === 'number')? event.which: event.keyCode;
    if (keyCode === 13){
        product_row();
    }
}

function start(){
    $('#add-button').click(add_product_row);
    //$('#input-field').keyup(add_number_on_enter);
}

$(document).ready(start);
