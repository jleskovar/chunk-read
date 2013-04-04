(function($) {
    $(function() {
        $('#csvfile').chunked({
            'maxchunksize': 1000000
        }).done(function(content) {
            //
        }).progress(function(perc, read, chunk){
            $('#progress').text(perc);
        });
    });
}(jQuery));
