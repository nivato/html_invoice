var arrayOfDigits = [];

function add_number(){
    var input_field = $('#input-field');
    var enteredNumbers = input_field.val().split(' ');
    $('.error-message').text(' ');
    for (var i = 0; i < enteredNumbers.length; i++) {
        if (isNaN(parseInt(enteredNumbers[i]))){
            $('.error-message').text('Invalid number entered');
        } else {
            var digit_div = jQuery('<div/>', {class: 'digit'});
            digit_div.text(enteredNumbers[i]);
            $('.digit-wrapper').append(digit_div);
            arrayOfDigits.push(parseInt(enteredNumbers[i]));
        }
    }
    input_field.val('');
    if (arrayOfDigits.length > 0){
        var min = arrayOfDigits[0];
        var max = arrayOfDigits[0];
        var sum = 0;
        for (var i = 0; i < arrayOfDigits.length; i++) {
            if (arrayOfDigits[i] > max){
                max = arrayOfDigits[i];
            }
            if (arrayOfDigits[i] < min){
                min = arrayOfDigits[i];
            }
            sum += arrayOfDigits[i];
        }
        var avg = sum / arrayOfDigits.length;
        $('.min').text(min);
        $('.max').text(max);
        $('.avg').text(avg.toFixed(2));
    }
}

function add_number_on_enter(event){
    var keyCode = (typeof event.which === 'number')? event.which: event.keyCode;
    if (keyCode === 13){
        add_number();
    }
}

function start(){
    $('#add-button').click(add_number);
    $('#input-field').keyup(add_number_on_enter);
}

$(document).ready(start);
