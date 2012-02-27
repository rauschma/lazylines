lazylines – read a text stream, line by line
============================================

This module allows you to read a text stream, one line at a time, lazily.

Example:

    var ll = require("../lazylines.js");

    process.stdin.resume();
    var inp = new ll.LineReadStream(process.stdin);
    var count = 1;
    inp.on("line", function (line) {
        console.log(count+": "+ll.chomp(line));
        count++;
    });

Installation:

    npm install lazylines

Tests
-----

- Run the tests via [Mocha](http://visionmedia.github.com/mocha/).
- Assertion API: [expect.js](https://github.com/LearnBoost/expect.js).
