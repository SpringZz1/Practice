const container = document.getElementById('container');

var count = 1;

function getUserAction() {
    container.innerHTML = count++;
}

// debounce 完成基本任务版
function debounce(func, wait) {
    var timeout;
    var context, args;
    return function() {
        context = this;
        args = arguments;

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}

// 添加立即完成功能，添加一个参数immediate
function debounce(func, wait, immediate) {

    var timeout, result;

    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}

// 添加取消需求
function debounce(func, wait, immediate) {

    var timeout, result;

    function debounced() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            setTimeout(function() {
                timeout = null;
            }, wait);

            if (callNow) timeout = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            })
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// 使用时间戳节流
function throttle(func, wait) {
    var previous = 0;
    var timeout;
    return function() {
        var context, args;
        context = this;
        args = arguments;
        var now = +new Date();
        if (now - previous >= wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 使用定时器节流
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        var context, args;
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }

    }
}

// 双剑合璧
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
    };

    var throttled = function() {
        var now = +new Date();
        // 下次触发func剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者修改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}

// 添加能够自由选择是否双剑合璧的option
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = previous.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    }

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
        previous = 0;
    }
    return throttled;
}