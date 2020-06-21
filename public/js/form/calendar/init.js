$('document').ready(function() {
    // Retrieves list of unavailable days for the calendar
    $.get('/approvalList', function(data) {
        // Pushing only reservation dates in the list for further use in calendar
        var list = [];
        $.each(data, function(i, item) {
            list.push(item.date);
        });
        // Calls the 'pignoseCalendar' on class 'modal'
        $('input[type="date"]').pignoseCalendar({
            theme: 'light',
            modal: true,
            buttons: true,
            apply: function(date) {
                // Sets the value of the input with name calendar to the selected date of 'pignoseCalendar'
                $('input[name=\'calendar\']').val(date);
            },
            disabledDates: list,
            minDate: new Date().toISOString().split('T')[0]
        });
        // try to rerun calendar again if received error response
    });
});
