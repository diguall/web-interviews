// https://developer.ibm.com/tutorials/learn-nodejs-the-event-loop/
// https://www.ibm.com/developerworks/library/wa-node-single-threaded-event-loop/index.html
// https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/
'use strict'

const fs = require('fs');

const logger = {
    info: function (message, source) {
        console.log(`${Date.now()}:${source}:${message}`)
    }
};

process.currentTickId = 0;

const onTick = () => {
    process.currentTickId++;
    setTimeout(()=>{
        process.nextTick(onTick);
    }, 0)
};

process.nextTick(onTick);

// Max number of iterations to perform
const ITERATIONS_MAX = 3;

// Iteration counter
let iteration = 0;

logger.info('START tick:' + process.currentTickId, 'MAINLINE');

const timeout = setInterval(() => {
    logger.info('START iteration ' + iteration + ': setInterval tick:' + process.currentTickId, 'TIMERS PHASE');

    if (iteration < ITERATIONS_MAX) {
        setTimeout((iteration) => {
            logger.info('TIMER EXPIRED (from iteration ' + iteration + '): setInterval.setTimeout tick:' + process.currentTickId, 'TIMERS PHASE');
        }, 0, iteration);
        fs.readdir('../javascript', (err, files) => {
            logger.info('fs.readdir() callback: Directory contains: ' + files.length + ' files iteration:' + iteration + ' tick:' + process.currentTickId, 'POLL PHASE');
        });
        setImmediate(() => {
            logger.info('setInterval.setImmediate iteration:' + iteration + ' tick:' + process.currentTickId, 'CHECK PHASE');
        });
    } else {
        logger.info('Max interval count exceeded. Goodbye. tick:' + process.currentTickId, 'TIMERS PHASE');
        // Kill the interval timer
        clearInterval(timeout);
    }
    logger.info('END iteration ' + iteration + ': setInterval tick:' + process.currentTickId, 'TIMERS PHASE');

    iteration++;
}, 0);

logger.info('END tick:' + process.currentTickId, 'MAINLINE');