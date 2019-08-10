var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var pos = 0;
var messenger = new EventEmitter();

messenger.on('message', function (msg) {
    console.log(++pos + " message:" + msg);
});

console.log(++pos + " first");

process.nextTick(function () {
    console.log(++pos + " nextTick");
});

Promise.resolve(1).then(function () {
    console.log(++pos + " promise");
});

messenger.emit('message', "hello!");
fs.stat(__filename, function () {
    console.log(++pos + " stat");
    setTimeout(function () {
        console.log(++pos + " another stat quick timer");
    });
    setImmediate(function () {
        console.log(++pos + " stat immediate");
    });
    process.nextTick(function () {
        console.log(++pos + " another stat nextTick");
    });
});

setTimeout(function () {
    console.log(++pos + " quick timer");
    process.nextTick(function () {
        console.log(++pos + " inner nextTick");
    });
    Promise.resolve(1).then(function () {
        console.log(++pos + " inner promise");
    });
}, 0);
setTimeout(function () {
    console.log(++pos + " another quick timer");
    process.nextTick(function () {
        console.log(++pos + " another inner nextTick");
    });
    Promise.resolve(1).then(function () {
        console.log(++pos + " another inner promise");
    });
}, 0);

setTimeout(function () {
    console.log(++pos + " long timer");
}, 30);

setImmediate(function () {
    console.log(++pos + " immediate");
});

console.log(++pos + " last");

/**
 * pos => 17
 */