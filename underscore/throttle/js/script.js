// const container = document.getElementById('container');

var count = 1;

function getUserAction() {
    container.innerHTML = count++;
}
// 节流持续触发事件，每隔一段时间，只执行一次事件
// 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同
// 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次
// 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器

// 使用时间戳
// 第一版
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        context = this;
        var now = +new Date();
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 使用定时器
// 当触发事件时，设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，知道定时器执行，然后执行函数
// 清空定时器，这样就可以去设置下一个定时器
// 第二版
function throttle(func, wait) {
    var timeout;
    var previous = 0;
    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait)
        }
    }
}

// 时间戳和定时器两种方法的不同在于时间戳会立即执行，定时器会在n秒后执行，时间戳停止触发后没有办法再执行事件，定时器停止触发后依然会再执行一次事件


// 现在我想要结合时间戳和定时器两种方法优点的节流函数
// 第三版
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
        // 下次触发func剩余时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间或者修改了系统时间
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

// 加入option，能够有头无尾，无头有尾
// 第四版
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;

    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

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
    return throttled;
}

// 第五版，添加取消方法，用法和debounce一样
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
}

var setUserAction = throttle(getUserAction, 10000);

container.onmousemove = setUserAction;

document.getElementById('button').addEventListener('click', function() {
    setUserAction.cancel();
});

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

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

    throttle.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;

}