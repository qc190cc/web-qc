
#转换时间

new Date().toJSON() - 
2019-10-18T02:10:13.942Z

new Date().toString() - 
Fri Oct 18 2019 10:10:22 GMT+0800 (中国标准时间)

new Date().toISOString() - 
2019-10-18T02:10:35.998Z

new Date().toUTCString() - 
Fri, 18 Oct 2019 02:10:55 GMT

new Date().toLocaleString() - 
2019/10/18 上午10:11:06

new Date().toLocaleDateString() -
2019/10/18 (不建议使用,在不同的浏览器上返回的格式不一致)

----------
# 批量引入文件夹下的所有文件,并生成对象
	// 引入modules(路径, 是否循环子文件夹, 后缀)
	const modules = require.context('./views', true, /\.vue$/);
	// 生成对象函数
	const modulesFiles = (files) => {
    	return files.keys().reduce((modules, modulePath) => {
	        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	        const value = files(modulePath); // 对象
	        if (value.default) { // 非自己
	            modules[moduleName] = value.default
	        }
	        return modules
    }, {});
	modulesFiles(modules);

----------

#验证银行卡
###接口: 
https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?\_input\_charset=utf-8&cardNo=6214832018989180&cardBinCheck=true
####参数说明
\_input\_charset:通道; 
cardNo:卡号; 
cardBinCheck:卡本; 
####返回参数说明
cardType：卡类型,DC为储蓄卡，CC为信用卡。  
bank：所属行简称，CMB 为招商银行。  
key：银行卡号。
messages：银行卡信息。  
validated：是否正确有效。  
stat：银行卡状态。
![](https://i.imgur.com/uZn7LJ8.jpg)

----------

#js自定义事件监听
###使用CustomEvent构造器来定义一个名字为testEvent的事件
    //使用CustomEvent构造器来定义一个名字为testEvent的事件
	//也可以在click事件里通过let来创建,挂在window是为了不重复创建 
    window.testEvent = new CustomEvent('testEvent', {
        detail:{
            // 将需要传递的数据写在detail中，以便在EventListener中获取
            // 数据将会在event.detail中得到
            title: '这是testEvent的title'
        },
    });
###监听该事件,假设listener注册在window对象上
    // 监听该事件,假设listener注册在window对象上
    window.addEventListener('testEvent',() =>{
        console.log(event.detail);
    })
###可以在其他地方触发事件
    click() {
        window.testEvent.detail.content = '这是内容';
        window.dispatchEvent(window.testEvent);
    },

----------


#VUE自定义指令
	/*
	声明自定义指令的文件
	 */
	import Vue from "vue";
	// 双击事件
	/*
	<div v-touch='testFn'>点击或双击</div>
	<div v-touch:testFn='[id, index]'>点击或双击</div> (需要携带参数)
	*/ 
	Vue.directive('dblclick', {
	    // 指令第一次绑定到元素时调用。 只调用一次，在这里可以进行一次性的初始化设置
	    bind: function (el, binding, vNode) {
	        // 上一次点击的时间
	        let lastClickTime = 0;
	        let clickTimer; //定时器
	        // 点击
	        const click = (event) => {
	            const nowTime = new Date().getTime(); //当期时间
	            
	            // 点击间隔小于400毫秒
	            if(nowTime - lastClickTime < 400) {
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
	                    params:'', 
	                    event, 
	                    vNode
	                })
	            }
	            // 传给指令的参数为函数
	            // 执行方法(传入type\value\touchEvent\节点)
	            if (typeof vNode.context[binding.arg] == 'function') {
	                vNode.context[binding.arg]({
	                    type, 
	                    params:binding.value, 
	                    event, 
	                    vNode
	                })
	            }
	        }
	        // 添加事件监听器
	        el.addEventListener("click", click);
	    },
	    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	    inserted: function() {},
	    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
	    update: function() {},
	    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
	    componentUpdated: function() {},
	    // 指令与元素解绑时调用,只调用一次
	    unbind: function () {}
	});
	//长按短按指令
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
	Vue.directive('touch', {
	    // 指令第一次绑定到元素时调用。 只调用一次，在这里可以进行一次性的初始化设置
	    bind: function (el, binding, vNode) {
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
	        if (typeof binding.value !== 'function') {
	            // 获取组件名称
	            const compName = vNode.context.name;
	            // 将警告传递给控制台
	            let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;
	            
	            if (compName) { warn += `Found in component '${compName}' `}
	            console.warn(warn);
	        }
	
	        // 定义变量，计时器清空
	        let pressTimer = null;
	
	        // 定义函数处理程序start
	        // 创建计时器（ 1秒后执行函数 ）
	        let start = (touchEvent) => {
	            //判断事件是否为click，e.button=0，则为左键，如果是click事件，或者不是按的左键（右键有默认行为），则直接return
	            if (touchEvent.type === 'click' && touchEvent.button !== 0) {
	                return;
	            }
	            //判断计时器是否为空
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
	        let cancel = (touchEvent) => {
	            // 检查计时器是否有值
	            if (pressTimer !== null) {
	                clearTimeout(pressTimer);
	                pressTimer = null;
	                // 短按
	                if(touchEvent.type != 'touchmove') {
	                    handler('click', touchEvent);
	                }
	            }
	        }
	
	        // 运行函数
	        const handler = (type, touchEvent) => {
	            if (typeof binding.value == 'function') {
	                binding.value({
	                    type, 
	                    params:'', 
	                    touchEvent, 
	                    vNode
	                })
	            }
	            // 执行传递给指令的方法;传入事件的type\value\touchEvent\节点
	            if (typeof vNode.context[binding.arg] == 'function') {
	                vNode.context[binding.arg]({
	                    type, 
	                    params:binding.value, 
	                    touchEvent, 
	                    vNode
	                })
	            }
	        }
	
	        // 添加事件监听器
	        el.addEventListener("touchstart", start);
	        el.addEventListener("mousedown", start);
	        el.addEventListener("touchstart", start);
	        // 取消计时器
	        el.addEventListener("click", cancel);
	        el.addEventListener("mouseout", cancel);
	        el.addEventListener("touchend", cancel);
	        el.addEventListener("touchmove", cancel);
	        el.addEventListener("touchcancel", cancel);
	    },
	    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	    inserted: function() {},
	    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
	    update: function() {},
	    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
	    componentUpdated: function() {},
	    // 指令与元素解绑时调用,只调用一次
	    unbind: function () {}
	})

----------
# 下载文件
	// 有下载链接
	const a = document.createElement('a'); // 创建a标签
    a.setAttribute('download', '');// download属性
    a.setAttribute('href', url);// href链接
    a.click();// 自执行点击事件
	
	// 根据内容创建blob链接(可隐藏链接)
    const data = new Blob(['hello ajanuw'], { // 创建blob对象
      type: 'application/text'
    })
    const src = window.URL.createObjectURL(data); // 创建blob链接
    const dl = document.createElement('a'); // 创建节点
    dl.href = src; // 设置链接
    dl.download = 'hello.txt'; // 设置下载文件名
    dl.click();
    window.URL.revokeObjectURL(src); // 释放链接
  
    // blob链接切片下载
    const data = new Blob(['hello ajanuwsdfdsgsgs zxx'], { // 创建blob对象
      type: 'application/text'
    })
    const dl = document.createElement('a');
    const slices = 3; // 切片量
    const sliceSize = data.size / slices; // 每片大小
    for (let i = 0; i < slices; i++) {
      const newData = data.slice(sliceSize * i, sliceSize * (i + 1), data.type); // 生成新的切片blob对象
      const newUrl = window.URL.createObjectURL(newData); // 创建blob链接
      dl.href = newUrl; // 设置链接
      dl.download = `test(${i + 1}).txt`; // 设置下载文件名
      dl.click();
      window.URL.revokeObjectURL(newUrl); // 释放链接
    }
----------
