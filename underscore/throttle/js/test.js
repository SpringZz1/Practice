const container = document.getElementById('container');

var count = 1;

// 防抖方法之 debounce
// 基本完成版本
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

// 添加立即执行和取消
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function() {
        var context, args;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            context = this;
            args = arguments;
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                timeout = func.apply(container, args);
            }, wait)
        }
        return result;
    };
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}