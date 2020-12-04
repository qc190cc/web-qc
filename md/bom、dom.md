#BOM(browser object model)

###浏览器引入js代码的方式
1. ```<script src="test.js"></script>```
2. 如果没有引用src可以写在body里面```<body><script>console.log("hellw")</script></body>```
3. ```<a href="jacascript:console.log('hellw world')">点击</a>```

###一、window 对象
- 打开浏览器机会生成window对象
- window属性可以不写window.
- **window对象是最大的对象，navigator、screen、history、location都属于window对象**
- 全局属性和window属性区别
	- 全局属性和window属性在90%的情况下相同
	- 定义在全局的属性（var）不能被删除，window对象的属性（window.)可以删除
	- let创建的全局变量不会成为window对象的属性
- 属性
 	- **screenX**:返回当前窗口相对于屏幕的X坐标
	- **screenY**:返回当前窗口相对于屏幕的Y坐标
	- **innerHeight**:返回当前窗口的文档显示区的高度```let g=innerHeight```
	- **innerWidth**:返回当前窗口的文档显示区的宽度
	- **outerHeight**:获取当前窗口的外部高度（包含工具条、滚动条）
	- **outerWidth**:获取当前窗口的外部宽度（包含工具条、滚动条）
- 方法
	
	- **alert()**:显示一段带有内容的提示窗```alert("你好")```
	- **confirm()**:显示带有一段消息以及确认按钮和取消按钮的对话框，确认返回true。
	- **prompt()**:	显示可提示用户输入的对话框。
	- **open(URL,name,specs,replace)**:打开一个窗口，name为打开方式，specs为窗口的值，replace为浏览历史方式。
			
			open("div.html","_blank","height=100,width=100")
	
	- **resizeTo()**	调整用open打开的窗口大小
	- **moveTo()**:当前窗口相对屏幕左上角移动到指定的像素```moveTo(100, 100)```
	- **moveBy()**:当前窗口相对自身位置移动到指定的像素```moveBy(100, 100)```
	- **close()**:关闭浏览器窗口
			

			<input type="button" value="关闭"  
			 onclick="myWindow.close()">
			<script>
			    let myWindow=open("index.html")
			</script> //点关闭按钮会关掉index.html

	- **setInterval()**：按照指定的周期（以毫秒计）来调用函数或计算表达式。
	
	
			 setInterval(function(){
			    moveBy(50,50)
			},1000) //每秒向右下移动50px

	- **clearInterval()**：取消由 setInterval()设置timeout。

			let i = 1;
			let m = setInterval(function () {
			    moveBy(100,100)
			    i++
			    if (i == 5) {
			        clearInterval(m)
			    }
			},1000) //每秒移动1次，5次后停止 

 	- **setTimeout()**：在指定的毫秒数后调用函数或计算表达式。
		
		 	 setTimeout(function(){
	     	      alert("是否保存密码")
	      	 },2000) //两秒后弹出提示窗
		
	- **clearTimeout()**：取消由setTimeout()方法设置的timeout。
	
###二、navigator 对象
- 属性
	- **appCodeName**:返回浏览器的代码名
	- **appName**:返回浏览器的名称
	- **appVersion**:返回浏览器的平台和版本信息
	- **cookieEnabled**:返回指明浏览器中是否启用 cookie 的布尔值
	- **platform**:返回运行浏览器的操作系统平台
	- **userAgent**:返回由客户机发送服务器的user-agent 头部的值```console.log(navigator.userAgent)```

###三、screen 对象
- 属性
	- **availHeight**:返回**屏幕**的高度（不包括Windows任务栏）
	- **availWidth**:返回**屏幕**的宽度（不包括Windows任务栏）
	- **height**:返回**屏幕**的总高度
	- **width**:返回**屏幕**的总宽度```screen.width```
###四、history 对象
- 属性
	- **length**:返回当前页面在历史列表中的网址数```history.length```
- 方法
	- **back()**:加载 history列表中的前一个URL(相当于后退键）
```<input type="button" value="houtui" onclick="back()">```
	- **forward()**:加载 history列表中的下一个URL（前进键）
```<input type="button" value="houtui" onclick="forward()">```
 	- **history.go(number)**:跳转到指定页面，括号里写数字，0为当前页面，1为前进1个，-1为后退一个
###五、location 对象
- 属性
	- **hash**：返回一个URL的锚部分
	- **host**：返回一个URL的主机名和端口
	- **hostname**：返回URL的主机名
	- **href**：返回完整的URL```console.log(location.href)```
	- **pathname**：返回的URL路径名。
	- **port**：返回一个URL服务器使用的端口号
	- **protocol**：返回一个URL协议
	- **search**	：返回一个URL的查询部分(问号后面部分)


#DOM(document object model)
- 用来操作html文档
##节点(node)
###节点属性
- **nodeName**:获取节点名字```x.nodeName```
- **nodeType**:获取节点种类，返回数字(元素为1，属性为2，文本为3)
- **nodeValue**:获取节点的具体内容，元素节点为null
###节点分类
#####1.文档节点 document
#####2.元素节点

- 获取（查找）节点
	- **document.getElementById("")**：通过ID查找，只会获取第一个

			<h1 id="i1" class="c1" name="n1">hello</h1>
			<p id="i2" class="c1" name="n1">world</p>
			<script>
			  document.getElementById("i1")    
			</script> //找到h1

	- **document.getElementsByClassName("")**：通过类查找全部	```document.getElementsByClassName("c1")```
	

	- **document.getElementsByName("")**：通过name查找全部
		```document.getElementsByName("n1")```

	
	- **document.getElementsByTagName("")**：通过标签查找全部	```document.getElementsByTagName("p")```

	- **document.querySelector("")**：html5新增的，通过标签查找第一个
		```document.querySelector("p")```

	- **document.querySelectorAll("")**：html5新增的，通过标签查找全部
		```document.querySelectorAll("p")```
   	- 关系查找节点(**缺点**会查找到空格、换行）
		- **parentNode**:获取父节点 ```x.parentNode```
		- **firstChild**：获取第一个子节点
		- **lastChild**：获取最后一个子节点
		- **childNodes**：获取所有子节点
		- **previousSibling**:获取前一个兄弟节点
		- **nextSibling**:获取后一个兄弟节点 
	- 关系查找元素（不会查找到空格换行，但是没找到相关规范）
		- **parentElement**:获取父元素 ```x.parentElement```
		- **firstElementChild**:获取第一个子元素
		- **lastElementChild**:获取最后一个子元素
		- **children**:获取所有子元素
		- **previousElementSibling**:获取前一个兄弟元素
		- **nextElementSibling**:获取后一个兄弟元素

#####3.文本节点
#####4.属性节点
####操作节点
- 创建节点
	1. 创建元素节点```document.createElement("a")```
	2. 创建文本节点```document.createTextNode("hello")```
	3. 创建属性节点```document.createAttribute("href")```
- 添加方式
	1. **appendChild()**作为最后一个子节点添加
	 
		    <h1 id="i1" class="c1" name="n1">hello<span></span></h1>
		    <p id="i2" class="c1" name="n1">world</p>
		    <script>
		        let x=document.getElementById("i1")
		        let y=document.createElement("a") //创建a标签
		        x.appendChild(y) 	//会在x里最后面添加一个a标签
		    </script>
	2. **insertBefore(新节点，已有节点）**在已有的某个子节点之前添加
			
			<h1 id="i1" class="c1" name="n1">hello<span></span><span></span></h1>
			<p id="i2" class="c1" name="n1">world</p>
			<script>
			    let x=document.getElementById("i1")
			    let spanNode=document.querySelectorAll("#i1>span")[0]  
			    let newNode=document.createElement("a")
			    x.insertBefore(newNode,spanNode) //会在x下第一个span前添加一个a标签
			</script>
	
- 删除节点
	- **removeChild(需要删除的节点)**：```x.removeChild(spanNode)```
- 替换节点
	- **replaceChild(新节点,旧节点)**:```x.replaceChild(newNode,spanNode)```
- 克隆节点
	- **cloneNode()**:克隆，括号里写布尔值，flase克隆自己，true会克隆子元素

			let x=document.getElementById("i1")
		 	let spanNode=document.querySelectorAll("#i1>span")[0]  
			x.spanNode.cloneNode(true)
###文本内容的操作
- 获取
	- **nodeValue**:太麻烦，因为元素节点的nodeValue为null
	- **innerText**:特点是获取不到display为none的内容```x.innerText```
	- **textContent**:可以获取到隐藏的内容```x.textContent```
	- **innerHTML**：可以把内部所有东西（包括标签和隐藏内容）获取出来
- 替换
	- **innerText=""**:替换掉标签下的所有内容，引号内为纯文本内容，即使是标签也会作为普通字符输出```x.innerText="nihao"```
	- **innerHTML=""**:引号内会识别标签```x.innerHTML ="<p>nihao</p>"```

###属性的操作
- **getAttribute("属性名")**:获取属性值```x.getAttribute("class")```
- **setAttribute("属性名"，"属性值")**:设置或添加属性,也可以添加自定义属性，但是要加data前缀
	x.setAttribute("data-abc","new")
- **removeAttribute("属性名")**:删除属性```x.removeAttribute("id")```
- **hasAttribute("属性名")**:是否含有该属性,返回布尔值```console.log(x.hasAttribute("id"))```
- **.**点运算符操作属性,可以获取、设置或添加属性
	 ```x.id;```
	- **在js里面class有特殊含义，如果要通过点运算符去操作class属性，要写成className**
	 ```x.className="new";```
	- **操作自定义属性要用dataset,因为自定义属性有-，js识别不了**
	 ```x.dataset.abc="new";```	

###CSS样式操作
1. 操作内联样式
	- **style.属性名=""**：获取和操作单个属性
	``` x.style.backgroundColor="yellow";```  
	 	- js无法识别-，所以background-color这类单词要写成backgroundColor
	- **style.cssText=""**：设置多个属性，有个缺点，会整个替换掉内联样式表

			<div id="box1" style="background-color:red;"></div>
			<script>
			    let x=document.getElementById("box1")
			    x.style.cssText="border:1px solid red; box-shadow:10px 10px 10px black"
			</script> //会删掉backgroud-color
	- **解决style.cssText替换掉整个style的方法**：

			<div id="box1" style="background-color:red;"></div>
			<script>
			    let x=document.getElementById("box1")
			    Object.assign(x.style,{
			        border:"1px solid red",
			        boxShadow:"10px 10px 10px black"
			    })

2. 获取最终样式（包含外部样式）
	- **getComputedStyle(标签).属性名**
		
		    let x=document.getElementById("box1")uu
    		getComputedStyle(x).width

3. 获取元素的尺寸
	- **clientWidth**：获取内容盒加padding；```x.clientWidth,x.clientHeight```
	- **offsetWidth**:获取内容盒加padding加border；```x.offsetWidth,x.offsetHeight```
	- **offsetLeft**:获取在文档显	示区的坐标;```x.offsetLeft,x.offsetTop```


