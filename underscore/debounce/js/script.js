// const container = document.getElementById('container');

// let count = 1;

// 这么做会导致连续触发事件延迟、卡顿等问题，因此需要防抖
function getUserAction() {
    console.log(e);
    container.innerHTML = count++;
};

// 为了解决这个问题，一般有两个解决方案
// 1. debounce防抖
// 2. throttle节流


/**
 * 防抖的原理就是触发事件触发n秒之后才执行，如果一个事件触发的n秒内又触发了这个事件
 * 那么就以新的事件事件为准，n秒才执行
 * 总之，就是说要等你触发n秒内不再触发事件，才执行
 */

// 第一版
function debounce(func, wait) {
    var timeout;
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}

// 改进，第一版中在getUserAction中this指向 <div id="container"></div>, 但是到了debounce中this指向window
// 第二版
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context);
        }, wait);
    }
}

// 改进，JS在事件处理函数中会提供事件对象event
// 第三版
function debounce(func, wait) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}

// 这时候以及很完备了，但是增加一个需求，我们希望能够立即执行函数，然后停顿n秒就行
// 添加一个immediate参数判断是否立即执行

// 第四版
function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
    }
}

// 改进，由于getUserAction()可能有返回值，所以debounce()也需要一个返回
// 但是当immediate为false时，因为使用了setTimeout，我们将func.apply(context,args)的返回值
// 给变量，最后return的时候，值将会一直是undefined，所以我们只需要在immediate为true时返回即可


// 第五版
function debounce(func, wait, immediate) {
    var timeout, result;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
        // 如果执行过了就不再执行
        var callNow = !timeout;
        timeout = setTimeout(function() {
            timeout = null;
        }, wait);
        if (callNow) result = func.apply(context, args);
    } else {
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
    return result;
}

// 最后，再添加一个需求，要求能够取消debounce函数，点击按钮就能马上又能立即执行这个函数
// 第六版
function debounce(func, wait, immediate) {
    var result, timeout;
    var args = arguments;

    var debounced = function() {
        var context = this;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果执行了就不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                timeout = func.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}


var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    container.innerHTML = count++;
};

var setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function() {
    setUseAction.cancel();
})