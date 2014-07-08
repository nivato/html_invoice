var previous_product    = undefined;
var previous_units      = undefined;
var prevoius_quantity   = undefined;
var previous_price      = undefined;

var add_panel = new AddPanel();

function add_product_row(){
    cancel_previous_editable_row();
    if (!add_panel.inputs_verified()){
        return;
    }
    var row = new ProductRow();
    row.set_product_name(add_panel.get_product_name());
    row.set_units(add_panel.get_units());
    row.set_quantity(add_panel.get_quantity());
    row.set_price(add_panel.get_price());
    row.calculate_total();
    row.edit_button().click(make_row_editable);
    row.delete_button().click(delete_product_row);
    $('.rows-wrapper').append(row.element());
    make_rows_ordering();
    calculate_total_price();
    add_panel.clear_inputs();
}

function make_row_editable(event){
    add_panel.clear_inputs();
    cancel_previous_editable_row();
    
    var row_element = $(event.target).parent().parent();
    var row = new ProductRow(row_element);
    
    previous_product    = row.get_product_name();
    previous_units      = row.get_units();
    prevoius_quantity   = row.get_quantity();
    previous_price      = row.get_price();
    
    row.make_editable();
    row.product_input().keyup(accept_edit_on_enter);
    row.quantity_input().keyup(accept_edit_on_enter);
    row.price_input().keyup(accept_edit_on_enter);
    
    row.accept_button().click(verify_edit_inputs);
    row.cancel_button().click(cancel_edit_row);
    
    row.product_input().focus();
}

function cancel_previous_editable_row(){
    var row = $('.editable-row');
    if (row.length === 1){
        make_row_readonly(row);
    }
}

function verify_edit_inputs(event){
    add_panel.clear_inputs();
    var row_element = $(event.target).parent().parent();
    var row = new ProductRow(row_element);
    if (row.inputs_verified()){
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
    var row_element = $(event.target).parent().parent();
    var row = new ProductRow(row_element);
    
    row.accept_edit();
    row.edit_button().click(make_row_editable);
    row.delete_button().click(delete_product_row);
    
    previous_product    = undefined;
    previous_units      = undefined;
    prevoius_quantity   = undefined;
    previous_price      = undefined;
    
    calculate_total_price();
}

function cancel_edit_row(event){
    add_panel.clear_inputs();
    var button = $(event.target);
    var row = button.parent().parent();
    make_row_readonly(row);
}

function make_row_readonly(row){
    row.removeClass('editable-row');
    row.children().removeClass('editable-cell');
    
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
    add_panel.clear_inputs();
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
        add_product_row();
    }
}

function start(){
    $('#add-button').click(add_product_row);
    $('#product-name').keyup(add_product_row_on_enter);
    $('#quantity').keyup(add_product_row_on_enter);
    $('#price').keyup(add_product_row_on_enter);
}

$(document).ready(start);
