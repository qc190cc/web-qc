/** 
 *  核心:  函数中的this总指向调用它的对象
 **/
var obj = {
    a: 1,
     fire: function () {
          console.log(this.a)
       }
}
obj.fire(); // 输出1

/** 
 *  默认绑定:  当一个函数没有明确的调用对象的时候，也就是单纯作为独立函数调用的时候，将对函数的this使用默认绑定：绑定到全局的window对象(凡是函数作为独立函数调用，无论它的位置在哪里，它的行为表现，都和直接在全局环境中调用无异)
 **/
function fire () {
    console.log(this === window)
}
fire(); // 输出true

function fire () {
        // 我是被定义在函数内部！
       function innerFire() {
            console.log(this === window)
        }
       innerFire(); // 独立函数调用
  }
  fire(); // 输出true

/** 
 *  隐式绑定:  当函数被一个对象“包含”的时候，我们称函数的this被隐式绑定到这个对象里面了，这时候，通过this可以直接访问所绑定的对象里面的其他属性
 **/
var obj = {
    a: 1,
     fire: function () {
          console.log(this.a)
       }
}
obj.fire(); // 输出1
// 在隐式绑定中，如果函数调用位置是在一串对象属性链中，this绑定的是最内层的对象。
var obj = {
    a: 1,
    obj2: {
         a: 2,
         obj3: {
              a:3,
              getA: function () {
                  console.log(this.a)   
               }
         }
     }
}
obj.obj2.obj3.getA();  // 输出3

/** 
 *  动态绑定: 1.  this是动态绑定的，或者说是在代码运行期绑定而不是在书写期 2.  函数于对象的独立性， this的传递丢失问题
 **/
// 我是第一段代码
function fire () {
    console.log(this.a)
}
var obj = {
    a: 1,
    fire: fire
}
obj.fire(); // 输出1 

// 我是第二段代码
var obj = {
      a: 1,
      fire: function () {
           console.log(this.a)
       }
}
obj.fire(); // 输出1  
// 函数虽然被定义在对象的内部中，但它和“在对象外部声明函数，然后在对象内部通过属性名称的方式取得函数的引用” 这两种方式在性质上是等价的（而不仅仅是效果上）
// 定义在对象内部的函数只是“恰好可以被这个对象调用”而已，而不是“生来就是为这个对象所调用的”

/** 
 *  显式绑定：(call和bind方法)
 **/

// call的基本使用方式：fn.call(object)
// fn是你调用的函数，object参数是你希望函数的this所绑定的对象。
// fn.call(object)的作用：
// 1.即刻调用这个函数（fn）
// 2.调用这个函数的时候函数的this指向object对象  
var obj = {
    a: 1,    // a是定义在对象obj中的属性
    fire: function () {
       console.log(this.a)
    }
}

var a = 2;  // a是定义在全局环境中的变量  
var fireInGrobal = obj.fire;
fireInGrobal();   // 输出2
fireInGrobal.call(obj); // 输出1

// 但是，我们其实不太喜欢这种每次调用都要依赖call的方式，
// 我们更希望：能够一次性 返回一个this被永久绑定到obj的fireInGrobal函数，这样我们就不必每次调用fireInGrobal都要在尾巴上加上call那么麻烦了。
// 在fireInGrobal.call(obj)外面包装一个函数就可以了！
var obj = {
      a: 1,    // a是定义在对象obj中的属性
      fire: function () {
        console.log(this.a)
      }
}

var a = 2;  // a是定义在全局环境中的变量  
var fn = obj.fire;
var fireInGrobal = function () {
    fn.call(obj)   //硬绑定
}

fireInGrobal(); // 输出1
// 如果使用bind的话会更加简单
var fireInGrobal = function () {
    fn.call(obj)   //硬绑定
}
// 可以简化为：
var fireInGrobal = fn.bind(obj);
// call和bind的区别是：在绑定this到对象参数的同时：
// 1.call将立即执行该函数
// 2.bind不执行函数，只返回一个可供执行的函数


/** 
 *  显式绑定和隐式绑定下，函数和“包含”函数的对象间的关系比作买房和租房的区别
 *  在隐式绑定下：函数和只是暂时住在“包含对象“的旅馆里面，可能过几天就又到另一家旅馆住了
 *  在显式绑定下：函数将取得在“包含对象“里的永久居住权，一直都会”住在这里“
 **/

 
 /** 
 *  new绑定: 执行new操作的时候，将创建一个新的对象，并且将构造函数的this指向所创建的新对象
 **/
function foo (a) {
    this.a = a;
}

var a1  = new foo (1);
var a2  = new foo (2);
var a3  = new foo (3);
var a4  = new foo (4);

console.log(a1.a); // 输出1
console.log(a2.a); // 输出2
console.log(a3.a); // 输出3
console.log(a4.a); // 输出4