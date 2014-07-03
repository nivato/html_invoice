function ProductRow(){
    this.row_element = undefined;
    this.quantity = undefined;
    this.price = undefined;
    this.total = undefined;
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
    var edit_button     = jQuery('<img/>', {src: 'images/pencil.png', class: 'action-button'});
    var delete_button   = jQuery('<img/>', {src: 'images/trash.png', class: 'action-button'});
    actions_cell.append(edit_button, delete_button);
    this.row_element.append(number_cell, product_cell, units_cell, quantity_cell, price_cell, total_cell, actions_cell);
    return this;
};

ProductRow.prototype.element = function(){
    return this.row_element;
};

ProductRow.prototype.set_product_name = function(value){
    this._product_cell().text(value);
};

ProductRow.prototype.set_units = function(value){
    this._units_cell().text(value);
};

ProductRow.prototype.set_quantity = function(value){
    this.quantity = value;
    this._quantity_cell().text(value);
};

ProductRow.prototype.set_price = function(value){
    this.price = value;
    this._price_cell().text(value);
};

ProductRow.prototype.set_total = function(value){
    this.total = value;
    this._total_cell().text(value);
};

ProductRow.prototype.calculate_total = function(){
    this.set_total(this.quantity * this.price);
};

ProductRow.prototype.edit_button = function(){
    return this._actions_cell().children('img[src$="pencil.png"]').first();
};

ProductRow.prototype.delete_button = function(){
    return this._actions_cell().children('img[src$="trash.png"]').first();
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
