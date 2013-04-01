(function($) {

    /******************************************
    Creating the jQuery plugin
    *******************************************/

    $.fn.chunked = function(options) {

        var settings = $.extend({
            'maxchunksize': 10000000
        }, options);

        var dfd = $.Deferred();

        this.change(function(evt) {

            var files = evt.target.files,
                file = files[0];

            var reader = new FileReader();

            reader.onerror = function(ex) {
                dfd.reject(ex);
            };

            reader.onload = function(ev) {
                if (ev.target.readyState == FileReader.DONE) {
                    dfd.resolveWith(file, [event]);
                }
            };

            reader.readAsText(file);
        });


        return dfd.promise();
    };

})(jQuery);
