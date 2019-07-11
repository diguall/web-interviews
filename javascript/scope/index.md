# 作用域

context 定义：反映当前时间点，程序运行状态下的所有语境信息，包括环境变量、全局变量、局部变量、其它实例状态信息等

作用域定义：当前执行过程中的 context，每个作用域都关联父级作用域

类别：
* Global Scope 在所有作用域可见
* Module Scope 只有被 export 的对象才可用
* Function Scope 只在方法内可见
* Block Scope 只在花括号内可见，仅针对 let、const 进行的声明
```
(function run(n){
    // block scope for each iteration
    for (let i = 0; i < n; i++) {
        setTimeout(function log(){
            console.log(i);
        }, 100)
    }
    // ReferenceError: i is not defined
    console.log(`The value of i:${i}`)
    console.log(`The value of n:${n}`)
})(5);
```
* Lexical Scope 内部方法可以访问被定义时所处的外部作用域（作用域在定义的时候决定，而不是执行的时候）
```
(function autorun(){
    let x = 1;
    function log(){
        console.log(x);
    }

    function run(fn){
        let x = 100;
        fn();
    }

    run(log); // 1
})();
```

作用域提升：
* var 关键字在任意地方进行变量声明等价于在顶部进行声明
```
console.log(bla); // undefined
bla = 2;
var bla;
console.log(bla); // 2

// is equivalent to:

var bla;
console.log(bla); // undefined
bla = 2;
console.log(bla); // 2

---    
var x = y, y = 'A';
console.log(x + y); // undefinedA

// is equivalent to:

var x, y;
x = y;
y = 'A';
console.log(x + y); // undefinedA

---
var myvar = 'my value';
(function(){
    console.log(myvar); // undefined
    var myvar = 'local value';
})();

// is equivalent to:

var myvar = 'my value';
(function(){
    var myvar;
    console.log(myvar); // undefined
    myvar = 'local value';
})();
```

* function 声明也会提升到顶部
```
foo(); // "bar"
function foo(){
    console.log("bar");
}
```

闭包：

定义：函数 + 函数被定义时的词法环境

场景：模拟私有方法

缺点：性能损耗、内存消耗