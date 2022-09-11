import ResizeObserver from 'resize-observer-polyfill';

// 如果不是页面应用,就没必要监听窗口变化
const isServer = typeof window === 'undefined';

// 当监听到元素Size变化后,执行的方法
/* istanbul ignore next */
function resizeHandler(entries: any[]) {
  // 循环匹配的元素
  for (const entry of entries) {
    // 将元素的__resizeListeners__字段下的方法都执行一遍
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn();
      });
    }
  }
}

// 添加元素Size变化后的监听方法
/* istanbul ignore next */
export function addResizeListener(element: any, fn: () => any) {
  // 如果不是页面应用就返回
  if (isServer) return;
  // 如果元素的__resizeListeners__字段不存在,就说明还没有注册resize-observer-polyfill
  if (!element.__resizeListeners__) {
    // 设置该字段
    element.__resizeListeners__ = [];
    // 在元素的__ro__字段上创建一个resize-observer-polyfill
    element.__ro__ = new ResizeObserver(resizeHandler);
    // 并启动元素的__ro__监听
    element.__ro__.observe(element);
  }
  // 将监听事件方法添加到元素的__resizeListeners__字段下
  element.__resizeListeners__.push(fn);
}

// 删除监听方法
/* istanbul ignore next */
export function removeResizeListener(element: any, fn: () => any) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
}

// 手动触发window的resize事件
export function triggerWindowResize() {
  // 因为这个resize事件只有window的大小改变了才会触发,所以这里手动触发
  // 这个在折叠组件中有使用
  // 创建一个事件,参数表示事件类型
  const event = document.createEvent('HTMLEvents');

  // 定义事件名为'resize'.
  // 第二个参数:是Boolean决定该事件是否应该冒泡通过事件链与否。设置后，只读属性Event.bubbles 将提供其值。
  // 第三个参数:是Boolean定义该事件是否可以取消。设置后，只读属性Event.cancelable将提供其值。
  event.initEvent('resize', true, true);
  (event as any).eventType = 'message';
  // 让window触发这个事件
  window.dispatchEvent(event);
}
