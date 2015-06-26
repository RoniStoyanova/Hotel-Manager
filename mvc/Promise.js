/**
 * Simple promise https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * implementation
 * 
 * Usage - delayed executions in different scope
 * 
 * @param {function} successFn - function that will be executetd when promise is kept
 * @param {function} failFn -  - function that will be executetd when promise is kept
 * @returns {Promise}
 */
function Promise(successFn, failFn) {
    this.onSuccess = typeof successFn === 'function' ? successFn : function () {};
    this.onFail = typeof failFn === 'function' ? failFn :function() {};
};

/**
 * 
 * @param {function} fn
 * @returns {undefined}
 */
Promise.prototype.setOnSuccess = function (fn) {
    this.onSuccess = fn;
};
//
//Promise.prototype.addOnSuccess = function (fn) {
//    this.onSuccess.push(fn);
//    return this;
//}
/**
 * 
 * @param {type} fn
 * @returns {undefined}
 */
Promise.prototype.setOnFail = function (fn) {
    this.onFail = fn;
};

//Promise.prototype.addOnFail= function (fn) {
//    this.onFail.push(fn);
//    return this;
//}

/**
 * resolves the promise and onSuccess function is called
 * @returns {undefined}
 */
Promise.prototype.resolve = function () {
    this.onSuccess.apply(this, arguments);
};

/**
 * rejects the promise and onFail is called
 * @returns {undefined}
 */
Promise.prototype.reject = function () {
    this.onFail.apply(this, arguments);
};

