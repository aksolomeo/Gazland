$('document').ready(function() {
    var selectors = 'input[name="enginePower"], input[name="engineType"]';

    $(selectors).on('focusout', function() {
        var text = $(this).val();
        if (text.length > 0) {
            $(this).attr('type', 'text');
            switch ($(this).attr('name')) {
                case 'enginePower':
                    $(this).val(text + ' kW');
                    break;
                case 'engineType':
                    $(this).val(text + ' cylinders')
                    break;
            }
        }
    });

    $(selectors).on('focusin', function() {
        var text = $(this).val();
        if (text.length > 0) {
            $(this).attr('type', 'number');
            $(this).val(text.split(/\s+/)[0]);
        }
    });

    $('textarea[name="comments"]').on('input', function () {
      var text = $(this).val();
      $('span#characterCount').text(text.length);
    });
});
