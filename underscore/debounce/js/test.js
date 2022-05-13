const container = document.getElementById('container');
let count = 1;

function getUserAction(e) {
    container.innerHTML = count++;
}

function debounce(func, wait, immediate) {
    var timeout, result;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    var debounced = function() {
        if (immediate) {
            // 如果执行过了则不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(func, args);
        } else {
            timeout = setTimeout(function() {
                timeout = setTimeout(function() {
                    timeout = func.apply(func, args);
                }, wait)
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

var setUserAction = debounce(getUserAction, 10000, true);
container.onmousemove = setUserAction;
document.getElementById('button').addEventListener('click', function() {
    setUserAction.cancel();
})