function ProductRow(row_element){
    if (row_element === undefined){
        this.create();
    } else {
        this.row_element = row_element;
    }
}

ProductRow.prototype.create = function(){
    this.row_element    = jQuery('<div/>', {class: 'table-row'});
    var number_cell     = jQuery('<div/>', {class: 'tr-cell number'});
    var product_cell    = jQuery('<div/>', {class: 'tr-cell product'});
    var units_cell      = jQuery('<div/>', {class: 'tr-cell units'});
    var quantity_cell   = jQuery('<div/>', {class: 'tr-cell quantity'});
    var price_cell      = jQuery('<div/>', {class: 'tr-cell price'});
    var total_cell      = jQuery('<div/>', {class: 'tr-cell total'});
    var actions_cell    = jQuery('<div/>', {class: 'tr-cell actions'});
    this.row_element.append(number_cell, product_cell, units_cell, quantity_cell, price_cell, total_cell, actions_cell);
    this._activate_edit_delete_buttons();
};

ProductRow.prototype.make_editable = function(){
    this.row_element.addClass('editable-row');
    this.row_element.children().addClass('editable-cell');
    
    var product_cell = this._product_cell();
    var product_input = jQuery('<input/>', {type: 'text', class: 'edit-input wide-edit'});
    product_input.val(product_cell.text());
    product_cell.html(product_input);
    
    var units_cell = this._units_cell();
    var units_options = ['pcs', 'kg', 'l', 'm', 'm&sup2;'];
    var units_select = jQuery('<select/>', {size: '1', class: 'edit-input narrow-edit'});
    for (var i=0; i<units_options.length; i++){
        var option = jQuery('<option/>');
        option.html(units_options[i]);
        units_select.append(option);
    }
    units_select.val(units_cell.text());
    units_cell.html(units_select);
    
    var quantity_cell = this._quantity_cell();
    var quantity_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    quantity_input.val(quantity_cell.text());
    quantity_cell.html(quantity_input);
    
    var price_cell = this._price_cell();
    var price_input = jQuery('<input/>', {type: 'text', class: 'edit-input narrow-edit'});
    price_input.val(price_cell.text());
    price_cell.html(price_input);
    
    this._activate_accept_cancel_buttons();
};

ProductRow.prototype.inputs_verified = function(){
    var error = false;
    var product_input = this.product_input();
    product_input.removeClass('error');
    if (product_input.val().length < 3){
        product_input.addClass('error');
        product_input.focus();
        error = true;
    }
    var quantity_input = this.quantity_input();
    quantity_input.removeClass('error');
    if (isNaN(parseFloat(quantity_input.val()))){
        quantity_input.addClass('error');
        quantity_input.focus();
        error = true;
    }
    var price_input = this.price_input();
    price_input.removeClass('error');
    if (isNaN(parseFloat(price_input.val()))){
        price_input.addClass('error');
        price_input.focus();
        error = true;
    }
    return !error;
};

ProductRow.prototype.accept_edit = function(){
    this.row_element.removeClass('editable-row');
    this.row_element.children().removeClass('editable-cell');
    
    this.set_product_name(this.product_input().val());
    this.set_units(this.units_select().val());
    this.set_quantity(this.quantity_input().val());
    this.set_price(this.price_input().val());
    this.calculate_total();
    
    this._activate_edit_delete_buttons();
};

ProductRow.prototype.element = function(){
    return this.row_element;
};

ProductRow.prototype.set_product_name = function(value){
    this._product_cell().html('');
    this._product_cell().text(value);
};

ProductRow.prototype.set_units = function(value){
    this._units_cell().html('');
    this._units_cell().text(value);
};

ProductRow.prototype.set_quantity = function(value){
    this._quantity_cell().html('');
    this._quantity_cell().text(value);
};

ProductRow.prototype.set_price = function(value){
    this._price_cell().html('');
    this._price_cell().text(value);
};

ProductRow.prototype.set_total = function(value){
    this._total_cell().html('');
    this._total_cell().text(value);
};

ProductRow.prototype.calculate_total = function(){
    this.set_total(this.get_quantity() * this.get_price());
};

ProductRow.prototype.get_product_name = function(){
    return this._product_cell().text();
};

ProductRow.prototype.get_units = function(){
    return this._units_cell().text();
};

ProductRow.prototype.get_quantity = function(){
    return parseFloat(this._quantity_cell().text());
};

ProductRow.prototype.get_price = function(){
    return parseFloat(this._price_cell().text());
};

ProductRow.prototype.get_total = function(){
    return parseFloat(this._total_cell().text());
};

ProductRow.prototype.product_input = function(){
    return this._product_cell().children('input').first();
};

ProductRow.prototype.units_select = function(){
    return this._units_cell().children('select').first();
};

ProductRow.prototype.quantity_input = function(){
    return this._quantity_cell().children('input').first();
};

ProductRow.prototype.price_input = function(){
    return this._price_cell().children('input').first();
};

ProductRow.prototype.edit_button = function(){
    return this._actions_cell().children('img[src$="pencil.png"]').first();
};

ProductRow.prototype.delete_button = function(){
    return this._actions_cell().children('img[src$="trash.png"]').first();
};

ProductRow.prototype.accept_button = function(){
    return this._actions_cell().children('img[src$="accept.png"]').first();
};

ProductRow.prototype.cancel_button = function(){
    return this._actions_cell().children('img[src$="cancel.png"]').first();
};

ProductRow.prototype._activate_edit_delete_buttons = function(){
    var actions_cell = this._actions_cell();
    actions_cell.html('');
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
};

ProductRow.prototype._activate_accept_cancel_buttons = function(){
    var actions_cell = this._actions_cell();
    actions_cell.html('');
    var accept_button   = jQuery('<img/>', {src: 'images/accept.png', class: 'action-button'});
    var cancel_button   = jQuery('<img/>', {src: 'images/cancel.png', class: 'action-button'});
    actions_cell.append(accept_button, cancel_button);
};

ProductRow.prototype._number_cell = function(){
    return this.row_element.children('.number').first();
};

ProductRow.prototype._product_cell = function(){
    return this.row_element.children('.product').first();
};

ProductRow.prototype._units_cell = function(){
    return this.row_element.children('.units').first();
};

ProductRow.prototype._quantity_cell = function(){
    return this.row_element.children('.quantity').first();
};

ProductRow.prototype._price_cell = function(){
    return this.row_element.children('.price').first();
};

ProductRow.prototype._total_cell = function(){
    return this.row_element.children('.total').first();
};

ProductRow.prototype._actions_cell = function(){
    return this.row_element.children('.actions').first();
};
