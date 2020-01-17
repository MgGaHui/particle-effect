/*防抖*/
export const debounce = (func, wait) => {
  let timeout = ''
  return function (...args) {
    const that = this
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      func.call(that, ...args)
    }, wait)
  }
}

/*动画帧*/
export const requestAnimationFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }
})()
