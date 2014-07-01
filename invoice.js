var previous_product    = undefined;
var previous_units      = undefined;
var prevoius_quantity   = undefined;
var previous_price      = undefined;

function verify_inputs(){
    cancel_previous_editable_row();
    var error = false;
    take_off_errors_signs_from_inputs();
    var product_name = $('#product-name').val();
    if (product_name.length < 3){
        $('#product-name').addClass('error');
        $('#product-name').focus();
        error = true;
    }
    var quantity = parseFloat($('#quantity').val());
    if (isNaN(quantity)){
        $('#quantity').addClass('error');
        $('#quantity').focus();
        error = true;
    }
    var price = parseFloat($('#price').val());
    if (isNaN(price)){
        $('#price').addClass('error');
        $('#price').focus();
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
    $('#product-name').focus();
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
    take_off_errors_signs_from_inputs();
    clear_inputs();
    cancel_previous_editable_row();
    
    var button = $(event.target);
    var row = button.parent().parent();
    row.addClass('editable-row');
    var all_cells = row.children().toArray();
    for (var i = 0; i < all_cells.length; i++){
        $(all_cells[i]).addClass('editable-cell');
    }
    
    var product_cell = row.children('.product').first();
    var product_input = jQuery('<input/>', {type: 'text', class: 'edit-input wide-edit'});
    previous_product = product_cell.text();
    product_input.val(previous_product);
    product_cell.text('');
    product_cell.append(product_input);
    product_input.keyup(accept_edit_on_enter);
    
    var units_cell = row.children('.units').first();
    var units_select = jQuery('<select/>', {size: '1', class: 'edit-input narrow-edit'});
    var unit_options = $('#units option').clone();
    units_select.append(unit_options);
    previous_units = units_cell.text();
    units_select.val(previous_units);
    units_cell.text('');
    units_cell.append(units_select);
    
    var quantity_cell = row.children('.quantity').first();
    var quantity_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    prevoius_quantity = quantity_cell.text();
    quantity_input.val(prevoius_quantity);
    quantity_cell.text('');
    quantity_cell.append(quantity_input);
    quantity_input.keyup(accept_edit_on_enter);
    
    var price_cell = row.children('.price').first();
    var price_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    previous_price = price_cell.text();
    price_input.val(previous_price);
    price_cell.text('');
    price_cell.append(price_input);
    price_input.keyup(accept_edit_on_enter);
    
    var actions_cell = row.children('.actions').first();
    actions_cell.html('');
    var accept_button   = jQuery('<img/>', {src: 'images/accept.png', class: 'action-button'});
    var cancel_button   = jQuery('<img/>', {src: 'images/cancel.png', class: 'action-button'});
    actions_cell.append(accept_button, cancel_button);
    accept_button.click(verify_edit_inputs);
    cancel_button.click(cancel_edit_row);
    
    product_input.focus();
}

function cancel_previous_editable_row(){
    var row = $('.editable-row');
    if (row.length === 1){
        make_row_readonly(row);
    }
}

function verify_edit_inputs(event){
    take_off_errors_signs_from_inputs();
    clear_inputs();
    
    var button = $(event.target);
    var row = button.parent().parent();
    var error = false;
    
    var product_cell = row.children('.product').first();
    var product_input = product_cell.children('input').first();
    product_input.removeClass('error');
    if (product_input.val().length < 3){
        product_input.addClass('error');
        product_input.focus();
        error = true;
    }
    
    var quantity_cell = row.children('.quantity').first();
    var quantity_input = quantity_cell.children('input').first();
    quantity_input.removeClass('error');
    if (isNaN(parseFloat(quantity_input.val()))){
        quantity_input.addClass('error');
        quantity_input.focus();
        error = true;
    }
    
    var price_cell = row.children('.price').first();
    var price_input = price_cell.children('input').first();
    price_input.removeClass('error');
    if (isNaN(parseFloat(price_input.val()))){
        price_input.addClass('error');
        price_input.focus();
        error = true;
    }
    
    if (!error){
        accept_edit_row(event);
    }
}

function accept_edit_on_enter(event){
    var keyCode = (typeof event.which === 'number')? event.which: event.keyCode;
    if (keyCode === 13){
        verify_edit_inputs(event);
    }
    if (keyCode === 27){ //Esc key pressed
        cancel_edit_row(event);
    }
}

function accept_edit_row(event){
    var button = $(event.target);
    var row = button.parent().parent();
    row.removeClass('editable-row');
    var all_cells = row.children().toArray();
    for (var i = 0; i < all_cells.length; i++){
        $(all_cells[i]).removeClass('editable-cell');
    }
    
    var product_cell = row.children('.product').first();
    var product_input = product_cell.children('input').first();
    var product = product_input.val();
    product_cell.html('');
    product_cell.text(product);
    
    var units_cell = row.children('.units').first();
    var units_select = units_cell.children('select').first();
    var units = units_select.val();
    units_cell.html('');
    units_cell.text(units);
    
    var quantity_cell = row.children('.quantity').first();
    var quantity_input = quantity_cell.children('input').first();
    var quantity = parseFloat(quantity_input.val());
    quantity_cell.html('');
    quantity_cell.text(quantity);
    
    var price_cell = row.children('.price').first();
    var price_input = price_cell.children('input').first();
    var price = parseFloat(price_input.val());
    price_cell.html('');
    price_cell.text(price);
    
    var total_cell = row.children('.total').first();
    total_cell.text(quantity * price);
    
    var actions_cell = row.children('.actions').first();
    actions_cell.html('');
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    edit_button.click(make_row_editable);
    delete_button.click(delete_product_row);
    
    previous_product    = undefined;
    previous_units      = undefined;
    prevoius_quantity   = undefined;
    previous_price      = undefined;
    
    calculate_total_price();
}

function cancel_edit_row(event){
    take_off_errors_signs_from_inputs();
    clear_inputs();
    
    var button = $(event.target);
    var row = button.parent().parent();
    make_row_readonly(row);
}

function make_row_readonly(row){
    row.removeClass('editable-row');
    var all_cells = row.children().toArray();
    for (var i = 0; i < all_cells.length; i++){
        $(all_cells[i]).removeClass('editable-cell');
    }
    
    var product_cell = row.children('.product').first();
    product_cell.html('');
    product_cell.text(previous_product);
    
    var units_cell = row.children('.units').first();
    units_cell.html('');
    units_cell.text(previous_units);
    
    var quantity_cell = row.children('.quantity').first();
    quantity_cell.html('');
    quantity_cell.text(prevoius_quantity);
    
    var price_cell = row.children('.price').first();
    price_cell.html('');
    price_cell.text(previous_price);
    
    var actions_cell = row.children('.actions').first();
    actions_cell.html('');
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    edit_button.click(make_row_editable);
    delete_button.click(delete_product_row);
    
    previous_product    = undefined;
    previous_units      = undefined;
    prevoius_quantity   = undefined;
    previous_price      = undefined;
}

function delete_product_row(event){
    take_off_errors_signs_from_inputs();
    clear_inputs();
    cancel_previous_editable_row();
    
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
