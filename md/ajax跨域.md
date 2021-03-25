# 什么是跨域？ #
跨域，指的是浏览器不能执行其他网站的脚本（不同域名之间相互访问）。它是由浏览器的同源策略造成的，是浏览器对JavaScript施加的安全限制。

所谓同源是指，域名，协议，端口均相同。

> 例：
> 
> http://www.123.com/index.html 调用 http://www.123.com/server.PHP （非跨域）
> 
> http://www.123.com/index.html 调用 http://www.456.com/server.php （主域名不同:123/456，跨域）
> 
> http://abc.123.com/index.html 调用 http://def.123.com/server.php （子域名不同:abc/def，跨域）
> 
> http://www.123.com:8080/index.html 调用 http://www.123.com:8081/server.php （端口不同:8080/8081，跨域）
> 
> http://www.123.com/index.html 调用 https://www.123.com/server.php （协议不同:http/https，跨域）
> 
> 请注意：localhost和127.0.0.1虽然都指向本机，但也属于跨域。


*浏览器执行javascript脚本时，会检查这个脚本属于哪个页面，如果不是同源页面，就不会被执行*


## JSONP ##

JSONP(JSON with Padding)是一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

**原理：利用 script 元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。用 JSONP 抓到的资料并不是 JSON，而是任意的JavaScript**

	//页面部分
	<script>
        function test(data){
            console.log(data);
        };
    </script>
    <script src="http://127.0.0.1:8080/jsonp?callback=test"></script>

	//服务器部分
	router.get('/jsonp',function(req,res,next){  #返回jsonp  
	   res.jsonp({status:'jsonp'});  //发送数据传递给callback指定的函数
	});  



*jsonp是一种非强制性协议，或者说它更像是一种方法，如同ajax一样，它也不一定非要用json格式来传递数据，只要返回是内容是可执行的js脚本就行了*



## 设置请求头（在被访问的服务器app里var app = express()后面加入） ##


	//允许所有js来进行访问
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");//或者 res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3333"); 就只允许 127.0.0.1:3333来访问
	    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
	    else  next();
	});



	//也可以这样，允许部分IP地址的端口来访问(白名单模式/多个名单)
	var allowCrossDomain = function(req, res, next) {
	    
	    if( req.headers.origin == 'http://127.0.0.1:3001' ||
	        req.headers.origin == 'http://127.0.0.1:3002'
	      ){
	        res.header('Access-Control-Allow-Origin', req.headers.origin);
	        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	        res.header('Access-Control-Allow-Headers', 'Content-Type');
	        res.header('Access-Control-Allow-Credentials','true');
	    }
	    next();
	};
	app.use(allowCrossDomain);



下面这一句就是告诉什么站点是被允许的
> Access-Control-Allow-Origin    允许的域

> res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
浏览器就会知道服务器是允许这个站点进行跨域访问的。其实，这就是一个白名单机制。