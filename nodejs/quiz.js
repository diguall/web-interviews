const fs = require('fs');

(function mainline() {
    process.nextTick(() => {
        console.log('A');
    });
    console.log('B');
    // delay 0 or 3 or 10 ?
    setTimeout(() => {
        console.log('C');
    }, 3);
    setImmediate(() => {
        console.log('D');
    });
    fs.readdir('./', 'utf8', (err, files) => {
        console.log('E');
        setTimeout(() => {
            console.log('F');
        }, 0);
        setImmediate(() => {
            console.log('G');
        });
        process.nextTick(() => {
            console.log('H');
        });
        Promise.resolve(1).then(()=>{
            console.log("K");
        });
    });
    Promise.resolve(1).then(()=>{
        console.log("J");
    });
    console.log('I');
})();