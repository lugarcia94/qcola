import './style.styl';
import Inputmask from 'inputmask';

function buttonMoreLess() {
    const quantity = $('#quant');

    if(quantity) {
        const more = $('<button type="button" class="button button--more">+</button>');
        const less = $('<button type="button" class="button button--less">-</button>');

        quantity.closest('label').addClass('quantity-more-less');

        quantity
            .before(less)
            .after(more);

        more.click(() => {
            let value = parseInt(quantity.val());

            if(value) {
                quantity.val(++value);
            }
        });

        less.click(() => {
            let value = parseInt(quantity.val());

            if(value && (value - 1) > 0) {
                quantity.val(--value);
            }
        });
    }
}

buttonMoreLess();

$(document).on('TRAY:VARIANT_FORM', function(){
    buttonMoreLess();
});
// Mask Input 
const calculatorForm = $('#calculator');
const calculatorWidth = document.querySelector('#calculator__width');
const calculatorHeight = document.querySelector('#calculator__height');
const optionsInputMask = {
    alias: 'decimal',
    rightAlign: false,
    allowMinus: false, 
    radixPoint: ',', 
    digits: 2,
    placeholder: '0',
    numericInput: true
};

if(calculatorWidth)     Inputmask(optionsInputMask).mask(calculatorWidth)
if(calculatorHeight)    Inputmask(optionsInputMask).mask(calculatorHeight);

function validate() {
    const eWidth = $('#calculator__width');
    const eHeight = $('#calculator__height');
    const cWidth = $.trim(eWidth.val());
    const cHeight = $.trim(eHeight.val());
    let valid = true;

    if( !cWidth ) {
        valid = false;
        eWidth.addClass('error');
    } else { eWidth.removeClass('error') }

    if( !cHeight ) {
        valid = false;
        eHeight.addClass('error');
    } else { eHeight.removeClass('error'); }
        
    return valid;
}

calculatorForm.submit(function(evt){
    evt.preventDefault();
    if(validate()) {
        const cWidth = parseFloat($('#calculator__width').val().replace(',', '.'));
        const cHeight = parseFloat($('#calculator__height').val().replace(',', '.'));
        const resultHTML = $('#calculator__result');

        const result = Math.ceil((cWidth) / .60);
        const HTML = `<div class="suss">Você irá precisar <strong>${result}</strong> <span class="n">rolo(s)</span></div>`;

        if( cHeight < 4 ) {
            resultHTML.html(HTML);
        } else {
            const err = '<div class="err"> Cada rolo mede <strong>3m de largura</strong>, para larguras maiores entre em  <a href="/contato">contato</a>.</div>';
            resultHTML.html(err);
        }

        $('.calculator__result').attr('aria-hidden', 'false');
        // $('.calculator__form').attr('aria-hidden', 'true');
    } else {
        $('#calculator__width, #calculator__height').on('input', () => { validate() });
    }
});

$('.calculator__back').click(() => {
    $('.calculator__result').attr('aria-hidden', 'true');
    // $('.calculator__form').attr('aria-hidden', 'false');
    $('#calculator__width').val('');
    $('#calculator__height').val('');
});

