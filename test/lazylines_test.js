var util = require('util');
var events = require('events');

var expect = require('expect.js');

var ll = require("../lazylines");

describe('LineReadStream', function(){
    it("should split lines properly", function (done) {
        var reader = new StringReadStream();
        var inp = new ll.LineReadStream(reader);

        var collected = "";
        inp.on("line", function (line) {
            collected += line + "#";
        });
        inp.on("end", function () {
            expect(collected).to.be("first\n#second\n#third\n#\n#last#");
            done();
        });

        reader.feed(5, "first\nsecond\nthird\n\nlast"
        );
    });
});
describe('chomp', function(){
    it("should work with any EOL", function () {
        expect(ll.chomp("line\n")).to.be("line");
        expect(ll.chomp("line\r\n")).to.be("line");
    });
    it("should work with no EOL", function () {
        expect(ll.chomp("line")).to.be("line");
    });
});

//----------------- Helpers

function StringReadStream() {
}
util.inherits(StringReadStream, events.EventEmitter);

StringReadStream.prototype.feed = function (limit, buffer) {
    var that = this;
    function feedNext() {
        // Write chunks that are as long as limit
        if (buffer.length >= limit) {
            that.emit("data", buffer.slice(0, limit));
            buffer = buffer.slice(limit);
            process.nextTick(feedNext);
        } else if (buffer.length > 0) {
            that.emit("data", buffer);
            buffer = "";
            process.nextTick(feedNext);
        } else {
            that.emit("end");
        }
    }
    process.nextTick(feedNext);
};
