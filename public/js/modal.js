var this_location;

function setLocation(_location) {
    this_location = _location;
}

$(document).on('click', 'tr a', function(e) {
    // e.preventDefault();
    var id = $(this).attr('data-target');
    var $modal = $('.modal' + id);
    if(this_location === 'requests'){
      $modal.find('a').attr('href', 'mailto:' + $modal.find('span#email').text());
    }
    console.log('Triggered', id);

    $.get('/approvalList', function(data) {
        // Pushing only reservation dates in the list for further use in calendar
        var list = [];

        $.each(data, function(i, item) {
            list.push(item.date);
        });

        $modal.find('button.selectedDate').pignoseCalendar({
            theme: 'light',
            modal: true,
            buttons: true,
            // to show from the day the user wanted to reserve
            date: moment($modal.find('span.selectedDate').text()),
            apply: function(date) {
                // Sets the value of the input with name calendar to the selected date of 'pignoseCalendar'
                $modal.find('span.selectedDate').text(date);
            },
            disabledDates: list,
            minDate: new Date().toISOString().split('T')[0]
        });
    });

    $modal.find('a:not(#cancel)').on('click', function(e) {
        console.log("in click");
        // e.preventDefault();
        var func = $(this).attr('id')
        $.post('/' + this_location, {
            'function': func,
            'id': id.replace('#', ''),
            'date': $modal.find('span.selectedDate').text()
        }).always(function() {
            location.reload(true);
        });
    });
});
