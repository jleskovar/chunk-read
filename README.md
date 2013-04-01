jQuery Chunked File Reader
============================

A plugin for jQuery which allows you to easily process the contents of a file in chunks. Uses the HTML5 File API.

## Example (proposed)

    $('#fileInputType').chunked({
        'maxchunksize' : 10000000
    }).progress(function(evt) {
        var perc = (evt.target.read / evt.target.size) * 100.0;
        $('#progress').progressbar({
            value: perc
        });
        console.log(evt.target.chunk);
    }).done(function(evt) {
        console.log(evt.target.text);
    });
