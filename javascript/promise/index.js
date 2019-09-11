function PolyfillPromise(fn) {
    const self = this;
    self.status = 'pending';
    self.onFulFilled = [];
    self.onRejected = [];
    self.value = null;
    self.reason = null;

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'fulfilled';
            self.value = value;
            self.onFulFilled.forEach(function (callback) {
                callback();
            })
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejected.forEach(function (callback) {
                callback();
            })
        }
    }

    try {
        fn(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

PolyfillPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value; };
    onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason; };

    let promise = new PolyfillPromise((resolve, reject) => {
        if (self.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let data = onFulfilled(self.value);
                    handlePromise(promise, data, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        } else if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let data = onRejected(self.reason);
                    handlePromise(promise, data, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        } else if (self.status === 'pending') {
            self.onFulFilled.push(() => {
                setTimeout(() => {
                    try {
                        let data = onFulfilled(self.value);
                        handlePromise(promise, data, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            });

            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let data = onRejected(self.reason);
                        handlePromise(promise, data, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            })
        }
    });

    return promise;
};

PolyfillPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

function handlePromise(promise, data, resolve, reject) {
    resolve(data);
}

let promise1 = new PolyfillPromise(function (resolve, reject) {
    resolve('t1')
});

promise1.then(function (value) {
    console.log(value);
}, function (err) {
    console.log('err:' + err)
})

let promise2 = new PolyfillPromise(function (resolve, reject) {
    reject('t2')
});

promise2.then(function (value) {
    console.log(value);
}, function (err) {
    console.log('err:' + err)
    return 111;
}).then(function (value) {
    throw new Error('inner error:' + value)
}).catch(function (err) {
    console.log('err chain:' + err)
})