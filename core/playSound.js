'use strict';

var fs = require('fs');
var wav = require('wav');
var Speaker = require('speaker');

var isPlaying = {};

module.exports = function (sound) {
    if (isPlaying[sound]) {
        return;
    }

    var file = fs.createReadStream('core/sounds/' + sound + '.wav');
    var reader = new wav.Reader();

    // the "format" event gets emitted at the end of the WAVE header
    reader.on('format', function (format) {

        // the WAVE header is stripped from the output of the reader
        reader.pipe(new Speaker(format));
    });

    // pipe the WAVE file to the Reader instance
    file.pipe(reader);

    isPlaying[sound] = true;

    setTimeout(function () {
        isPlaying[sound] = false;
    }, 500);
};
