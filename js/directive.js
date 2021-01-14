/*
声明自定义指令的文件
 */
import Vue from 'vue';

// 双击事件
Vue.directive('dblclick', {
  /*
    <div v-dblclick='testFn'>点击或双击</div>
    <div v-dblclick:testFn='[id, index]'>点击或双击</div> (需要携带参数)
    */
  // 指令第一次绑定到元素时调用。 只调用一次，在这里可以进行一次性的初始化设置
  bind: function(el, binding, vNode) {
    // 上一次点击的时间
    let lastClickTime = 0;
    let clickTimer; // 定时器
    // 点击
    const click = (event) => {
      const nowTime = new Date().getTime(); // 当期时间

      // 点击间隔小于400毫秒
      if (nowTime - lastClickTime < 400) {
        clickTimer && clearTimeout(clickTimer);
        handler('dblclick', event);
      } else {
        lastClickTime = nowTime;
        clickTimer = setTimeout(() => {
          handler('click', event);
        }, 410);
      }
    }
    // 运行函数
    const handler = (type, event) => {
      // 指令绑定值为函数
      if (typeof binding.value == 'function') {
        binding.value({
          type,
          params: '',
          event,
          vNode
        })
      }
      // 传给指令的参数为函数
      // 执行方法(传入type\value\touchEvent\节点)
      if (typeof vNode.context[binding.arg] == 'function') {
        vNode.context[binding.arg]({
          type,
          params: binding.value,
          event,
          vNode
        })
      }
    }
    // 添加事件监听器
    el.addEventListener('click', click);
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted: function() {},
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  update: function() {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function() {},
  // 指令与元素解绑时调用,只调用一次
  unbind: function() {}
});

// 长按短按指令
Vue.directive('touch', {
  // 移动端 使用 阻止默认事件 冒泡 需自己写
  /*
        使用方法
        html:
            <div v-touch='testFn'>点击或长按我</div>
            <div v-touch:testFn='[id, index]'>点击或长按我</div> (需要携带参数)
        js:
            testFn(e) {
                const { type, params, touchEvent, vNode} = e;
                console.log('type',type); //click或longpress
                console.log('params', params); //携带的参数([id, index])
                console.log('touchEnvet', touchEnvet); //touch对象
                console.log('vNode', vNode); //虚拟节点对象
            }
    */
  // 指令第一次绑定到元素时调用。 只调用一次，在这里可以进行一次性的初始化设置
  bind: function(el, binding, vNode) {
    /*
        指令钩子函数会被传入以下参数：
        1、el：指令所绑定的元素，可以用来直接操作 DOM 。
        2、binding：一个对象，包含以下属性：
            2-1、name：指令名，不包括 v- 前缀。
            2-2、value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
            2-3、oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
            2-4、expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
            2-5、arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
            2-6、modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
        3、vnode：Vue 编译生成的虚拟节点。
        4、oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
        */
    // 确保提供的表达式是函数，如果不是，将警告传给控制台
    // if (typeof binding.value !== 'function') {
    //     // 获取组件名称
    //     const compName = vNode.context.name;
    //     // 将警告传递给控制台
    //     let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;

    //     if (compName) { warn += `Found in component '${compName}' `}
    //     console.warn(warn);
    // }

    // 定义变量，计时器清空
    let pressTimer = null;

    // 定义函数处理程序start
    // 创建计时器（ 1秒后执行函数 ）
    const start = (touchEvent) => {
      // 判断事件是否为click，e.button=0，则为左键，如果是click事件，或者不是按的左键（右键有默认行为），则直接return
      if (touchEvent.type === 'click' && touchEvent.button !== 0) {
        return;
      }
      // 判断计时器是否为空
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 长按,执行事件处理函数,清除定时器
          handler('longpress', touchEvent);
          clearTimeout(pressTimer);
          pressTimer = null;
        }, 500)
      }
    }

    // 取消计时器
    const cancel = (touchEvent) => {
      // 检查计时器是否有值
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
        // 短按
        if (touchEvent.type != 'touchmove') {
          handler('click', touchEvent);
        }
      }
    }

    // 运行函数
    const handler = (type, touchEvent) => {
      // 指令绑定值为函数
      if (typeof binding.value == 'function') {
        binding.value({
          type,
          params: '',
          touchEvent,
          vNode
        })
      }
      // 传给指令的参数为函数则执行方法;传入事件的type\value\touchEvent\节点
      if (typeof vNode.context[binding.arg] == 'function') {
        vNode.context[binding.arg]({
          type,
          params: binding.value,
          touchEvent,
          vNode
        })
      }
    }

    // 添加事件监听器
    el.addEventListener('touchstart', start);
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    // 取消计时器
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchmove', cancel);
    el.addEventListener('touchcancel', cancel);
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted: function() {},
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  update: function() {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function() {},
  // 指令与元素解绑时调用,只调用一次
  unbind: function() {}
});

// 是否在元素外点击 Justin
Vue.directive('clickoutside', {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
  update() {}
})

// 拖选事件
Vue.directive('pullSelect', {
  // 指令第一次绑定到元素时调用。 只调用一次，在这里可以进行一次性的初始化设置
  bind: function(el, binding, vNode) {
    // 初次按下时的节点
    let firstDom = null;

    // 按下
    const down = (event) => {
      firstDom = event.srcElement;
      handler('down', event);
    }
    // 抬起
    const up = (event) => {
      firstDom = null;
      handler('up', event);
      if (firstDom == event.srcElement) {
        handler('click', event);
      }
    }
    // 移动
    const move = (event) => {
      if (firstDom) {
        handler('move', event);
      }
    }

    // 运行函数
    const handler = (type, event) => {
      // 指令绑定值为函数
      if (typeof binding.value == 'function') {
        binding.value({
          type,
          event
        })
      }
      // 传给指令的参数为函数
      if (typeof vNode.context[binding.arg] == 'function') {
        vNode.context[binding.arg]({
          type,
          event
        })
      }
    }
    // 添加事件监听器
    el.addEventListener('mousedown', down); // 按下
    el.addEventListener('mouseup', up); // 松开
    el.addEventListener('mousemove', move); // 移动
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted: function() {},
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  update: function() {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function() {},
  // 指令与元素解绑时调用,只调用一次
  unbind: function() {}
});
