# Redux #

## 前言 ##

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。有两个方面，它没涉及。

	代码结构
	组件之间的通信

对于大型的复杂应用来说，这两方面恰恰是最关键的。因此，只用 React 没法写大型应用。

为了解决这个问题，2014年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。
2015年，Redux 出现，将 Flux 与函数式编程结合一起，很短时间内就成为了最热门的前端架构。

## 序 ##

首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。
曾经有人说过这样一句话。

	"如果你不知道是否需要 Redux，那就是不需要它。"

Redux 的创造者 Dan Abramov 又补充了一句。

	"只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

上面这些情况，都不需要使用 Redux。

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

上面这些情况才是 Redux 的适用场景：多交互、多数据源。



## 设计思想 ##

Redux 的设计思想很简单，就两句话。

- （1）Web 应用是一个状态机，视图与状态是一一对应的。
- （2）所有的状态，保存在一个对象里面。


## 下载及安装 ##

	npm install redux --save
	npm install --save react-redux


## 概念及API ##

**Store**

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
Redux 提供createStore这个函数，用来生成 Store。

	import { createStore } from 'redux';
	const store = createStore(fn);

上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。

	//示例
	var defaultNum = 1;
	
	const store = createStore(function(state = defaultNum, action){
	    return defaultNum;
	});
	
	console.log(store.getState());


**Action**

State 的变化，会导致 View 的变化。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

> Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置（参数）
	
	//示例
	const action = {
	  type: 'ADD_TODO',
	  val: 5
	};

**store.dispatch()**

> store.dispatch()是 View 发出 Action 的唯一方法。

	import { createStore } from 'redux';
	const store = createStore(fn);
	
	store.dispatch({
	  type: 'ADD_TODO',
	  val: 5
	});

----------

	//示例
	var defaultNum = 1;
	
	const store = createStore(function(state = defaultNum, action){
	    switch(action.type){
	        case 'ADD_NUM':
	            return state + action.val;
	        default:
	            return state;
	    }
	});
	
	const addNum = {
	    type: 'ADD_NUM',
	    val: 5
	}
	store.dispatch(addNum);
	
	console.log(store.getState());



**Action Creator**

> View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

	const ADD_NUM = 'ADD_NUM';
	
	function addNum(val) {
	  return {
	    type: ADD_NUM,
	    val
	  }
	}
	
	const action = addNum(10);

上面代码中，addTodo函数就是一个 Action Creator。


**Reducer**

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。


	const reducer = function (state, action) {
	  // ...
	  return new_state;
	};

createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

	const store = createStore(function(state = 1, action){
	    switch(action.type){
	        case 'ADD_NUM':
	            return state + action.val;
	        default:
	            return state;
	    }
	});


**Reducer 的拆分**

Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

*Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。*

	import {combineReducers} from "redux";
	
	function tNum(state = 1, action){
	    switch(action.type){
	        case 'ADD_NUM':
	            return state + action.val;
	        default:
	            return state;
	    }
	}
	
	function tLabel(state = '红标签', action){
	    switch(action.type){
	        case 'CHANGE_LABEL':
	            return state == '红标签' ? '绿标签' : '红标签';
	        default:
	            return state;
	    }
	}
	
	export default combineReducers({
		tNum,
	    tLabel
	})



## React中使用Redux ##

> //准备

- 创建store
- 创建actions
- 创建reducers

> //使用
	
	//引入store
	import store from "./todolist/store/store";

	//引入Provider，可以让组件拿到state状态
	import { Provider } from "react-redux";
	//例：套在App容器外，App内就能拿到state的状态
	<Provider store={store}><App></Provider>


	//在子组件中 引入connect
	import { connect } from "react-redux";	


	//在导出前使用connect连接，注入数据
	export default connect(filter)(CenterElt);
	//
	所有过滤后的数据使用this.props可正常获取

#### 在redux里return 两个相同的对象地址，由于对象是址出传递，系统会认为没有改变，就不会刷新页面，解决办法是每次return都新new一个对象，或者用扩展符展开再包起来rturn

** todoList需求改造 **