
#Json对象
 - 一组数据的无序集合
##一、创建对象
1. 字面量方式 ```let obj={}```
2. 构造函数方式```let obj2=new Object()```
##二、属性
- 每条数据由属性名和属性值组成```let obj3={ username:'zhangsan',}```
- 数据也叫键值对，属性名是键，属性值是值
- **属性名是字符串格式，只是不用写引号**
- **属性和属性名相同的情况下可以只写一个**```let obj={name:name}```可改为```let obj={name}```

##三、操作数据
 - 调用
	```let obj={pwd:123456,name:'zhangsan'};console.log(obj.pwd)```
	输出为123456  
	```console.log(user["name"]);```输出为zhangsan
 - 修改 ```obj.name="lisi";```
 - 增加 ```obj.money=1000;```
 - 删除 ```delete obj.money;```
 - 变量可以直接放进对象
 
		let a="zhangsan"
		let obj={
		    pwd:123456,
		    name:a
		 }
		 console.log(obj.name) //输出为zhangsan
##方法
 -  格式```sayName: function(){console.log("我的名字是。。。")}```
 -  调用```obj.sayName()；``` 
 -  如果要在方法里使用同一个对象内的属性，可以用**this**```sayName: function(){console.log(this.name)}```
##遍历
 - **for(let i in obj){}**	系统会自动遍历obj，i代表属性，会不断变化，类似i++
 
 		let a="name";
		let obj={
			a:567,
		    pwd:123456,
		    name:'zhangsan',
		    sayName: function (){
		        console.log(this.name)
		    },
		}
		 for(let i in obj){
   	 		console.log(i)
		} 	
**上面代码只输出属性名,因为遍历的时候i是不断变化的属性名，输出为 a pwd name sayName**

		 for(let i in obj){
   	 		console.log(obj[i])
		} 	
**加中括号输出 567 123456 zhangsan [Function: sayName]；因为如果写obj.i，那就是obj下面的i属性，实际上obj下面并没有i这个属性，i是从name到sayName的变量，所以当属性名写的是一个不断变化的变量的时候，要加[]**  

**如果[]里不加"",就表示输出的是变量，加""就输出的是该名字的属性,例:**  

	for(let i in obj){
	 		console.log(obj[a])
	} //a的值为"name"，就会去找name的属性，
	会输出 zhangsan zhangsan zhangsan zhangsan

     for(let i in obj){
	 		console.log(obj["a"]) //相当于obj.a
	}	//就会输出a：567这个属性，结果为 567 567 567 567


 - **Object.keys**输出的为数组 ```let arr=Object.keys	(user);console.log(arr);```输出为[ 'pwd', 'name', 	'sayName' ]
 - **Object.getOwnPropertyNames**  ```let 	arr1=Object.getOwnPropertyNames(obj);
	console.log(arr1)``` 输出为[ 'pwd', 'name', 'sayName' ]

 - **JSON.stringify()**：转换为json字符串  
 ```let str=JSON.stringify(person) //转换为字符串给str```
 - **JSON.parse()**:转换为json对象
 ```let newPerson=JSON.parse(str)  //把str转换为对象给新对象```