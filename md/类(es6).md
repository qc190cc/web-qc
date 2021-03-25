
# 类（ES6）
 - es6新增的，相当于构造函数的和原型混合模式

		class Persion{
		    constructor(name,age){
		          this.name=name;
		          this.age=age;  
		    }
		    sayName(){
		        console.log("我叫"+this.name)
		    }
		}
		let p=new Persion('zhangsan',20)
		console.log(p) //Persion{name:'zhangsan',age:20}
		p.sayName()    //我叫zhangsan

### ES6实现继承的方式
- 继承方式extend、super()
  
		class Father {
		    constructor() {
		        this.name = "zhangsan";
		    }
		    sayName() {
		        console.log("我叫" + this.name)
		    }
		}
		class Son extends Father {
		    constructor() {
		        super();
		    }
		}
		let p = new Son()
		console.log(p)   //输出 Son { name: 'zhangsan' }
		p.sayName()	     //输出 我叫zhangsan

- 子继承父时也可继承参数以及添加自己的属性

		class Father {
		    constructor(name) {
		        this.name = name;
		    }
		    sayName() {
		        console.log("我叫" + this.name)
		    }
		}
		class Son extends Father {
		    constructor(name) {
		        super(name);
		        this.age=20;
		    }
		    sayHi(){
		        console.log("Hi")
		    }
		}
		let p = new Son("zhangsan")
		console.log(p) //输出 Son{name:'zhangsan',age:20}
		p.sayName()    //输出 我叫zhangsan
		p.sayHi()	   //输出 Hi
