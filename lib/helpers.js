exports.formSetup = function() {
    const json = require('./template.json');

    var i = j = 0;
    var html = ' ';
    var date = new Date();
    var y = date.getFullYear();

    while (i < json.length) {

        var labelTag = '<div class="form-group col-md-6 col-sm-12"><label class="control-label" for="' + json[i].name + '">' + json[i].label + '<\/label>';
        var inputTag ='<input class="form-control" type="' + json[i].type + '" name="' + json[i].name + '" placeholder="' + json[i].placeholder;

        if (j == 0) {
            html += '<div class="row">';
        }

        j++;
        switch (json[i].name) {
            case 'fname':
            case 'lname':
                html += labelTag + inputTag + '" pattern="^[a-zA-Z _]+$" required></div>';
                break;
            case 'brand':
                html += labelTag + inputTag + '" pattern="^[a-zA-Z _]+$" required></div>';
                break;
            case 'model':
                html += labelTag + inputTag + '" pattern="^[a-zA-Z0-9 _]*$" required></div>';
                break;
            case 'releaseDate':
                html += labelTag + inputTag + '" min="1885" max="'+y+'" required></div>';
                break;
            case 'phone':
                html += labelTag + inputTag + '" pattern="^[0-9]+$" required></div>';
                break;
            case 'date':
                html += labelTag + inputTag + '" min="'+date+'" required></div>';
                break;
            case 'enginePower':
                html += labelTag + '<span class="engine P">' + inputTag + '" min="1" required></span></div>';
                break;
            case 'engineType':
                html += labelTag + '<span class="engine T">' + inputTag + '" min="1" required></span></div>';
                break;
            default :
                html += labelTag + inputTag + '" required></div>';
        }

        if (j == 2 || (i - 1) == json.length) {
            html += '</div>';
            j = 0;
        }

        i++;
    }

    return html;
};

exports.alert = function(alertMessage) {
    var html = '';
    if (alertMessage) {
        html += '<div class="row">';
        if (alertMessage === 'success') {
            html += '<div class="alert alert-success alert-dismissible fade in" role="alert">Reservation request sent!</div>'
        } else if (alertMessage === 'failed') {
            html += '<div class="alert hide alert-danger alert-dismissible fade in" role="alert">There is some problems with our system, try again later!</div>'
        }
        html += '</div>';
    }
    return html;
};
