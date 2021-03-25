# JS模块化
- 模块化是一种处理复杂系统，把系统分解为代码结构更合理，可维护性更高的可管理的模块方式 
- 为了解决变量污染和分工问题

## ES6官方模块（浏览器端）
- 每一个文件是一个独立的模块，引入用import,导出用export
		
		//test.js
		let a=1;
		let b=2;
		export{a,b}
		
		//main.js
		import {a,b} from "./test.js" //必须用解构
		console.log(a)//输出1

- 可在export后加default来用对象的方式导出，避免变量名重复

		//test.js
		let a=1;
		let b=2;
		function con3(){
		    console.log(3)
		}
		
		//main.js
		import newObj from './test.js' //不需要解构
		console.log(newObj)//输出{a:1，b:2,con3: ƒ}

- 某些浏览器版本在引用接口js文件的时候需要加type=module

		<body>
   			 <script src="./main.js" type="module"></script>
		</body>

##CommonJS规范（服务器端的）
- 每个文件都一个独立的模块，有自己的作用域，每个文件在里面都是私有的，对其他文件不可见
- CommonJs 加载模块是同步的，只有加载完成才能执行后面的操作
- 每个模块内部有一个module对象，指向该模块，module有一个exports属性，是对外的接口，绑定该属性的内容都会变为公有。
	 	
		var name="zhangsan"
	    module.exports.name=name;
	


- **require方法用于加载其他模块，该方法会自动给加载的文件添加后缀。require一个模块其实就是require该模块的module.exports**
 
		let obj=require('./b')	
		console.log(obj.name)
	    //会输出b.js的module.exports.name

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果，想让模块再次运行，必须清楚缓存
- 模块加载的顺序，按照其在代码中出现的顺序
- 模块的安装分为局部和全局，全局要加-g，一般情况下使用局部安装	

- **route**：路由功能，主要用于监听	
		
		router.get('/log',function(req,res,netx){
				res.send('显示登录信息')
		});
- 获取监听数据
	- **body**：获取post方式提交的消息体

			router.post('/login',function(req,res,netx){
					console.log(req.body)//输出消息体
			});
			
	- **query**：获取get方式提交的查询体
		
			router.get('/login',function(req,res,netx){
					console.log(req.query)//输出查询体
			});
- 重定向:redirect
			
			router.post('/login',function(req,res,netx){
					res.redirect("index.html")
			});		


##AMD和RequeireJS
- Asynchronous Module Definition 的缩写AMD，即异步模块定义
- AMD规范只定义了一个函数"define",它是全局变量
- ReqeireJs是AMD规范的实现者，是一个**浏览器规范**

##CMD和SeaJS
- CMD也是一种规范，SeaJs是一个加载器，遵循CMD规范
- AMD和CMD的区别：
	- AMD是提前执行，依赖前置
	- CMD是延迟执行，依赖就近				
	