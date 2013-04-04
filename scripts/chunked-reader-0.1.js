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
                file = files[0],
                size = file.size,
                chunk_size = settings.maxchunksize,
                reader = new FileReader(),
                chunks = [],
                offset = 0,
                bytes = 0;

            reader.onerror = function(ex) {
                dfd.rejectWith(file, [ex]);
            };

            reader.onloadend = function(e) {
                if (e.target.readyState == FileReader.DONE) {
                    var chunk = e.target.result;
                    bytes += chunk.length;

                    chunks.push(chunk);

                    dfd.notifyWith(file, [100.0 * (bytes / size), bytes, chunk]);

                    if (offset < size) {
                        offset += chunk_size;
                        var blob = file.slice(offset, offset + chunk_size);
                        reader.readAsText(blob);
                    } else {
                        var content = chunks.join("");
                        dfd.resolveWith(file, [content]);
                    }
                }
            };

            var blob = file.slice(offset, offset + chunk_size);
            reader.readAsText(blob);
        });


        return dfd.promise();
    };

})(jQuery);