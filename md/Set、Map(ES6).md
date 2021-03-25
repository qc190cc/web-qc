# Set
 - **ES6**新增的数据结构，类似于数组，但是数据都是唯一的，不存在重复的值，主要用来给数组剔重，内容是数组
 - **Set里虽然只看到值，但其实是键值对，只是属性名和属性值一样**
 - **new Set();** ```let s=new Set([1,2,3,4,]); console.log(s)```输出 Set{1,2,3,4,}
 - 属性
 	- **size**```let s=new Set([1,2,3,4,5])
console.log(s.size)```输出 5
 - 方法
 	1. **add()**：添加数据，并返回新的Set结构
	 ```let s=new Set([1,2,3])console.log(s.add(6))```输出 Set { 1, 2, 3, 6 }

 	2. **delete()**:删除数据，返回布尔值表示是否成功
 	```let s=new Set([1,2,3])
console.log(s.delete(3))``` 输出 true

 	3. **has()**：查看是否存在某条数据，返回布尔值
 	```let s=new Set([1,2,3])
console.log(s.has(3))``` 输出 true

 	4. **clear()**:清除所有数据，没有返回值
 	```let s=new Set([1,2,3])
s.clear()
console.log(s)``` 输出 Set{}
 	5. **for(of)**:遍历，有三种遍历器和一种遍历方法

			let s=[1,2,3,4]
			for(let i of s){
			    console.log(i)
			} //输出 1 2 3 4

	 	- **for(of keys())**:遍历键名
		 	
				let s=new Set([1,2,3,9])
				for(let i of s.keys()){
				    console.log(i)
				} //输出 1 2 3 9
		 		
	 	- **for(of values())**:遍历值
	 
				let s=new Set([1,2,3,9])
				for(let i of s.keys()){
				    console.log(i)
				} //输出 1 2 3 9

	 	- **for(of entries())**:遍历键值对

				let s=new Set([1,2,3,9])
				for(let item of s.entries()){
				    console.log(item)
				} //输出[ 1, 1 ][ 2, 2 ][ 3, 3 ][ 9, 9 ]

	 	- **forEach(function(){})**遍历方法

				let s=new Set([1,2,3,9])
				s.forEach(function(i){
				    console.log(i)
				}) //输出 1 2 3 9

 - 给数组剔重
 		```let arr=[1,1,2,2,3,3];
	console.log(arr=[...new Set(arr)])``` 输出[ 1, 2, 3 ]
	
# Map
 - 类似于对象，对象的属性名是字符串，Map可以用任意数据类型作属性名，内容是二维数组，小数组里是键值对
 - 属性
 	- **size**：长度

			let m=new Map([['name','zhangshan'],[true,'yes']])
			console.log(m.size) //2

 - 方法
   1. **set()**:添加或修改数据，并返回新的数据结构

			let m=new Map([['name','zhangshan'],[true,'yes']])
			console.log(m.set('name','lisi'))
			//Map { 'name' => 'lisi', true => 'yes' }
   2. **get()**:获取数据，搜索键返回值，没有就返回undefined
   
			let m=new Map([['name','zhangshan'],[true,'yes']])
			console.log(m.get("name")) // zhangshan
   3. **has()**:查找数据，输入键，返回布尔值
		   
			let m=new Map([['name','zhangshan'],[true,'yes']])
		    console.log(m.has("name")) //true

   4. **delete()**:删除，返回布尔值
	
			   let m=new Map([['name','zhangshan'],[true,'yes']])
			   console.log(m.delete("name"))//true

   5. **clear**：清除，没有返回值
   	
			let m=new Map([['name','zhangshan'],[true,'yes']])
			m.clear()
			console.log(m) // Map {}

 - 遍历
	 -	**for(of){}**
			 	
			let m=new Map([['name','lisi'],[true,'yes']])
			for(let [k,v] of m){  //用解构
			    console.log(k,v)
			}  // name lisi true 'yes'


	
		 - **for(of keys())**:遍历键名
		 	
				let m=new Map([['name','lisi'],[true,'yes']])
				for(let i of m.keys()){
				    console.log(i)
				} //输出 name true
		 		
	 	- **for(of values())**:遍历值
	 
				let m=new Map([['name','lisi'],[true,'yes']])
				for(let i of m.values()){
				    console.log(i)
				} // lisi yes

	 	- **for(of entries())**:遍历键值对
			
				let m=new Map([['name','lisi'],[true,'yes']])
				for(let item of m.entries()){
				    co	nsole.log(item)
				} //[ 'name', 'lisi' ][ true, 'yes' ]
			

	 	- **forEach(function(){})**遍历方法
	 
				let m=new Map([['name','lisi'],[true,'yes']])
				m.forEach(function(i){
				    console.log(i)
				})


- Map转对象
 
		 
		let m=new Map([['name','lisi'],[true,'yes']])
		function mapToObj(map){
		    let obj={}
		    for(let [k,v] of map){
		        obj[k]=v   //K是不断变化的变量，要加[]
		    }
		    return obj;
		}
		console.log(mapToObj(m))//{name:'lisi',true: 'yes'}	

- 对象转Map


		let obj={name:"lisi", age:"20"}
		function objToMap(obj){
		        let map=new Map()
		        for(let i in obj){
		           map.set(i,obj[i])
		        }
		        return map
		}
		console.log(objToMap(obj))
		//Map { 'name' => 'lisi', 'age' => '20' }

#Symbol
 - 用来表示独一无二的值
 		
		let s1=Symbol("num1") //括号里num1只是作为标记，没有实际意义
		let s2=Symbol("num2")
		console.log(s1==s2) //flase

 - **Symbol.for()**:创建相同的Symbol值
 		
		let s1=Symbol.for("num1")
		let s2=Symbol.for("num1")
		console.log(s1==s2)  //true
	
 - **Symbol.keyfor()**:用来返回通过Symbol.for()创建的序号	
  
		let s1=Symbol.for("num1")
		let s2=Symbol.for("num1")
		console.log(Symbol.keyFor(s1))//num1

 - **Reflect.ownKeys()**:遍历

		let  person={
		    [Symbol()]:'zhangsan',
		    [Symbol()]:123456,
		    age:20
		}
		console.log(Reflect.ownKeys(person))
		//输出 [ 'age', Symbol(), Symbol() ]
	拿到具体值
		
		let  person={
		    [Symbol()]:'zhangsan',
		    [Symbol()]:123456,
		    age:20
		}
		let keyArr=Reflect.ownKeys(person)
		for(let i=0; i<keyArr.length;i++){
		    console.log(person[keyArr[i]])
		} // 20 zhangsan 123456
		
		
