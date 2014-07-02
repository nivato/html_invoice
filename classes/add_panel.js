function AddPanel(){}
    
AddPanel.prototype.inputs_verified = function(){
    this.take_off_errors_signs();
    var error = false;
    if (this.get_product_name().length < 3){
        this._product_input().addClass('error');
        this._product_input().focus();
        error = true;
    }
    if (isNaN(this.get_quantity())){
        this._quantity_input().addClass('error');
        this._quantity_input().focus();
        error = true;
    }
    if (isNaN(this.get_price())){
        this._price_input().addClass('error');
        this._price_input().focus();
        error = true;
    }
    return !error;
};

AddPanel.prototype.take_off_errors_signs = function(){
    this._product_input().removeClass('error');
    this._quantity_input().removeClass('error');
    this._price_input().removeClass('error');
};

AddPanel.prototype.clear_inputs = function(){
    this._product_input().val('');
    this._units_select().val('pcs');
    this._quantity_input().val('');
    this._price_input().val('');
    this._product_input().focus();
    this.take_off_errors_signs();
};

AddPanel.prototype.get_product_name = function(){
    return this._product_input().val();
};

AddPanel.prototype.get_units = function(){
    return $('#units option:selected').text();
};

AddPanel.prototype.get_quantity = function(){
    return parseFloat(this._quantity_input().val());
};

AddPanel.prototype.get_price = function(){
    return parseFloat(this._price_input().val());
};

AddPanel.prototype._product_input = function(){
    return $('#product-name');
};

AddPanel.prototype._units_select = function(){
    return $('#units');
};

AddPanel.prototype._quantity_input = function(){
    return $('#quantity');
};

AddPanel.prototype._price_input = function(){
    return $('#price');
};
