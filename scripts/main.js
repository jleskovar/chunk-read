(function($) {
    $(function() {
        $('#csvfile').chunked({
            'maxchunksize': 20000000

        }).done(function(ev) {
            console.log(this);
            console.log(ev.target.result);
        });
    });
}(jQuery));
