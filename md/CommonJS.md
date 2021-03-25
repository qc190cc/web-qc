# CommonJS规范
- 每个文件都一个独立的模块，有自己的作用域，每个文件在里面都是私有的，对其他文件不可见
- CommonJs 加载模块是同步的，只有加载完成才能执行后面的操作
- 每个模块内部有一个module对象，指向该模块，module有一个exports属性，是对外的接口，绑定该属性的内容都会变为公有。
	 	
		var name="zhangsan"
	    module.exports.name=name;-
	


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