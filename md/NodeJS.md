# NodeJS

## 1、简单介绍

定义：Node.js是一个基于V8 JavaScript 引擎的JavaScript运行时环境。

架构：

- 我们编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中
- **libuv**是使用C语言编写的库
- libuv内部提供了事件循环、文件系统读写、网络IO、线程池等内容

版本管理：（如果希望在不同版本的node中快速切换，可以借助以下工具）

- nvm：Node Version Manager
- n
- nvm-window：nvm和n是没有window版本的，此时可以下载这个来替代nvm （<a href="https://www.jianshu.com/p/1f8cb1e228fc">Windows 使用NVM</a>）

Node的REPL：

- REPL是 Read-Eval-Print-Loop的简称，翻译为“读取-求值-输出”循环；
- REPL是一个简单的、交互式的编程环境；



## 2、Node的输入输出

### 2.1、Node传递参数

- 正常情况下执行一个node程序，直接跟上对应的文件即可：

  ```js
  node index.js
  ```

- 但是在某些情况下执行node程序的过程中，我们可能希望给node传递一些参数：

  ```js
  ndoe index.js 张三
  ```

- 如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数：

  - 获取参数其实是在`process`的内置对象的`argv`数组中的；
  - 如果我们直接打印这个内置对象，它里面包含特别的信息；

- **argv**（argument vector）

  - vector ：矢量，在程序中表示一种数据结构；
  - 在c++、Java中都有这种数据结构，是一种数组结构；
  - 在JavaScript中也是一个数组，里面存储一些参数信息；



## 3、Node中的全局对象

### 3.1、特殊的全局对象

- 这些全局对象实际上是模块中的变量，只是每个模块都有，看起来像是全局变量
- 在命令行交互中是不可以使用的；
- 包括：`__dirname  `  、 `__filename`、 `exports`、 `module`、 `require()`

#### **__dirname**

- 获取当前文件坐在路径，不包括后面的文件名

#### **__fileName**

- 获取当前文件所在的路径和文件名称

![image-20230302201657630](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230302201657630.png)

### 3.2、常见的全局对象

#### **process**

- process 提供了**Node进程**中相关的信息：
  - 比如Node的运行环境、参数信息等；
- **console对象**：提供了简单的调试控制台；
- **定时器函数**：
  - **setTimeout**(callback, delay[, ...args])：callback在delay毫秒后**执行一次**；
  - **setInterval**(callback, delay[, ...args])：callback每delay毫秒**重复执行**；
  - **setImmediate**(callback, delay[, ...args])：callback **I / O 事件后**的回调的**立即执行**；
  - **process.nextTick**(callback,[, ...args])：添加到**下一次tick队列中**；

- **global对象**：
  - global 是一个全局对象，`process`、`console`、`setTimeout`等都有被放到global中;
  - 与window的不同：在顶层定义的变量并不会添加到 global 全局对象中;



## 4、JavaScript模块化

- 在早期`JavaScript`是没有属于自己的模块化的。

- 直到**ES6**（2015）才推出了自己的模块化方案；

- 在此之前，为了让JavaScript支持模块化，涌现出了很多不同的模块化规范：**AMD**、**CMD**、**CommonJS**等；

### 4.1、没有模块化带来的问题

没有模块化带来很多问题：比如命名冲突的问题。当然我们有办法解决这个问题：**立即函数调用表达式（IIFE）**

- IIFE(Immediately Invoked Function Expression)

但是又带来了新的问题：

- 第一，我们必须记得**每一个模块中返回的对象命名**，才能在其他模块使用过程中正确地使用；
- 第二，代码写起来混乱不堪，每个文件中的代码都**需要包裹在一个匿名函数中来编写**；
- 第三，在没有**合适的规范**情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；

### 4.2、CommonJS与Node

#### 4.2.1、CommonJS定义

- 我们需要知道`CommonJS`是**一个规范**，最初是在浏览器以外的地方使用，并且当时被命名为**ServerJS**，后来为了体现它的广泛性，修改为**CommonJS**，平时我们也会**简称CJS**。
  - Node是CommonJS在服务器端一个具有代表性的实现；
  - Browserify是CommonJS在浏览器中的一种实现；
  - webpack打包工具具备对CommonJS的支持和转换；

#### 4.2.2、Node中的CommonJS

- 所以，Node中对**CommonJs进行了支持和实现**，让我们在开发node的过程中可以方便的进行模块化的开发；
  - 在Node中**每一个js文件都是一个单独的模块**；
  - 这个模块中包括**CommonJS规范的核心变量**：`exports`、`module.exports`、`require`；
  - 我们可以使用这些变量来方便的进行模块化开发；

#### 4.2.3、CommonJS导入导出

- 前面我们提到模块化的核心是导出和导入，Node中对其进行了实现
  - `exports`和`module.exports`可以**负责对模块中的内容进行导出**；
  - `require`函数可以帮助我们**导入其他模块（自定义模块、系统模块、第三方库模块）中的内容**；

#### 4.2.4、exports

- **Node中CommonJS的本质就是对象的引用赋值**（浅拷贝）。

-  `exports` 是每个模块中都有的一个对象，默认为空；

- `require` 函数**返回当前引用的模块的`exports`对象**；

```js
/ bar.js
const name = "张三";
const age = 18;

function sayHello(name) {
  console.log('Hello' + name, 'barFunction');
};
exports.name = name;

exports.age = age;

exports.sayHello = sayHello;

setTimeout(() => {
  console.log(exports.name, 'bar'); // '王老五 bar'
}, 2000);


/ main.js
/**
 * main中的bar与bar中的exports指向的是同一个内存地址
 */
// bar = {age, name, sayHello};
const bar = require('./bar');

console.log(bar.name, 'main'); // '张三 main'
console.log(bar.age, 'main'); // '18 main'
bar.sayHello('李四')

// 在main中改变name的值，bar的exports对象的name也会随之改变
setTimeout(() => {
  bar.name = '王老五';
}, 1000);
```

#### 4.2.5、module.exports

规范解析

- `CommonJS`中是没有`module.exports` 的概念的
- 但是为了实现模块的导出，`Node`中使用的是`Module`的类，**每一个模块都是Module的一个实例**，也就是`module`对象；
- 所以在Node中真正用于导出的根本不是exports，而是module.exports；
- 因为module才是真正的导出者；

- **CommonJS导出本质上是靠 module.exports 来实现的**；

- 那么 module.exports 与 exports 是怎样的关系呢？

  ```js
  
  module.exports = exports;
  // 它的内部实现就是将exports的内存地址赋值给了 module.exports，所以看起来像是 exports 在导出；
  // module对象的exports属性是exports对象的一个引用
  ```

- 如果module.export自身在模块内被赋值，那么导出的将是 module.exports 所赋值的那个对象，此时exports对象将不再生效(引用拷贝)

  ```js
  / bar.js
  
  const name = '张三';
  const age = 18;
  exports.name = name;
  exports.age = age;
  
  module.exports = {
    name: '李四',
    age: 14  
  };
  
  / main.js
  const { age, name } = require('./bar.js');
  console.log(name); // 李四
  console.log(age); // 14
  ```

- **值拷贝和引用拷贝**

  - 引用拷贝

    ```js
    const obj = {};
    
    const obj1 = obj;  // 将obj的内存地址赋予obj1，本质上还是同一个对象
    ```

    

  - 值拷贝

    ```js
    const name = '张三';
    
    const name1 = name; // 将name的值赋予name1，即使name后续被改变了，name1的值依旧是 ’张三‘
    ```

#### 4.2.6、require查找规则细节

require常见查找规则：`require(X)`

- **情况一： X是一个核心模块，比如`path`、`http`**

  - 直接返回核心模块，并且停止查找；

- **情况二：X是./或../或/（根目录）开头的**

  - **第一步：将X当作一个文件在对应的目录下查找**；
    - 如果有后缀名，按照后缀名的格式查找对应的文件；
    - 如果没有后缀名，会按照如下顺序：
      1. 直接查找文件X
      2. 查找X.js文件
      3. 查找X.json文件
      4. 查找X.node文件
  - **第二步：没有找到对应的文件，将X当作一个目录**：
    - 查找目录下的index文件
      1. 查找index.js文件
      2. 查找index.json文件
      3. 查找index.node文件
  - 如果没有找到，报错：not found

- 情况三：直接是一个X（没有路径），并且X不是一个核心模块

  - 去 `node_modules` 中查找对应文件夹

  - 一直找到根目录下的 `node_modules `

  - 没有的话报 `undefined`

    ```js
    const zs = require('zs');
    
    //  会去 node_modules/zs/index.js 查找，如果找到根目录下还是没找到，报 not found
    ```

  ![image-20230305161828715](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230305161828715.png)

#### 4.2.7、模块的加载过程

- 模块被第一次引入时，模块中的js代码会被运行一次

- **模块的加载是同步的**，即引入模块未加载完成时，不会执行本模块中的代码

  ```js
  const fs = require('fs');
  
  console.log('本模块代码被执行');
  ```

- **模块被多次引入时，会缓存，最终只加载（运行）一次；**
  - 每个模块对象`module`都有一个属性：loaded
  - 为false表示还没有加载，为true表示已经加载
- 如果有循环引用，那么加载顺序是什么？
  - 循环引用最终会形成一种数据结构：图结构；
  - 图结构在遍历的过程中，有深度优先搜索（DFS depth first search）和广度优先搜（BFS breadth first search）；
  - Node采用的是深度优先算法

#### 4.2.8、CommonJS规范缺点

- `CommonJS`加载模块是同步的
  - 同步意味着只有等到对应的模块加载完成，当前模块的内容才能被执行；
  - 这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，记载速度非常快；
- 如果应用于浏览器呢？
  - 浏览器加载js文件需要先从服务器将文件下载下来，之后再加载运行；
  - 那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作；
- 所以在浏览器中，我们通常不使用`CommonJS`规范：
  - 当然在`webpack`中使用`CommonJS`是另一回事；
  - 因为它会将我们的代码转换成浏览器可以直接执行的代码；
- 在早期为了可以在浏览器中使用模块化，通常会采用`AMD`或者`CMD`：
  - 但是目前一方面现代的浏览器以及支持 `ES Modules` ，另一方面借助于`webpack`等工具可以实现对`CommonJS`或者 `ES Modules`代码的转换；
  - `AMD`和`CMD`已经使用非常少了

### 4.3、AMD规范

`AMD`主要是应用于浏览器的一种模块化规范：

- AMD：Asynchronous Module Definition （异步模块定义）；
- 它采用的是异步加载模块；
- 事实上AMD的规范要早于`CommonJS`，但是`CommonJS`目前仍在被使用，而`AMD`使用地较少了；

我们提到过，规范只是定义代码应该如何去编写，只有有了具体的实现才能被应用：

- `AMD`实现的比较常用的库是`require.js`和`curl.js`；
- <a href="https://requirejs.org/docs/release/2.3.6/comments/require.js">require.js Download</a>



### 4.4、CMD规范

`CMD`也是应用于浏览器的一种模块化规范：

- CMD：Common Module Definition（通用模块定义）；
- 它也采用了异步加载模块，但是它将`CommonJS`的优点吸收了过来；
- 但是目前CMD使用也非常少了

`CMD`也有自己比较优秀的实现方案：

- `SeaJS`



### 4.5、ES Module

`ES Module`和`CommonJS`的模块化的不同：

- 一方面它使用了 `import` 和` export` 关键字；
  - 注意：**`import` 和 `export` 是关键字而不是函数或者对象**，也就意味着在解析时，需要将这两个关键字交给js引擎去解析；
- 另一方面它采用编译期的静态分析，并且也加入了动态引用的方式；

`ES Module` 模块采用`export`和`import`关键字来实现模块化：

- `export`负责将模块内的内容导出；
- `import`负责从其他模块导入内容

了解：采用 `ES Module` 将自动采用严格模式：`use strict`；

#### 4.5.1、export 和 import 结合使用

```js
/ foo.js
export const name = '李银河';

/bar.js
export { name } from './foo.js';

/index.js
import { name } from './bar.js';
console.log(name); // 李银河
```

为什么要这样做呢？

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到同一个文件中；
- 这样方便指定统一的接口规范，也方便阅读；
- 这个时候，我们就可以使用export和import结合使用；

#### 4.5.2、default 用法

默认导出（default export）

- 默认导出export时可以不指定名字；
- 在导入时也不需要使用{}，并且可以自己指定名字；
- 也方便我们和现有的CommonJS等规范操作；

注意：在一个模块中只能有一个默认导出（default export）；

```js
/ bar.js
export default () => {
    console.log('默认导出了一个匿名函数');
}

/ foo.js
// 可以自己指定一个名字
import myFunction from './bar.js';
myFunction(); //  默认导出了一个匿名函数
```



#### 4.5.3、import 函数

解析阶段、运行阶段

通过import加载一个模块，是不可以将其放到逻辑代码中的，比如：

```js
if (true) {
    // 这种用法是错误的
  import foo from './foo.js';
}
```

为什么会出现这种情况呢？

- 这是因为**ES Module 在被`JS引擎解析时`，就必须知道它的依赖关系**；
- 由于这个时候js代码没有任何的运行，所以无法在进行类似if判断中根据代码的执行情况引入模块；

但是某些情况下，我们需要动态地加载一个模块：

- 这时候我们需要使用 **`import()` 函数来动态加载**；

- vue中的路由懒加载，webpack 在读到 import 函数时，会将当前引用文件单独打包；

  ```js
  / foo.js
  export const name = '李银河';
  
  / bar.js
  export const name = '王小波';
  
  / main.js
  if(true) {
      // 加载方式是异步的，并返回一个 Promise 实例
      import('./foo.js').then(res => {
          console.log(foo.name); // 李银河
      })
  } else {
      import('./bar.js').then(res => {
          console.log(res.name); // 王小波
      })
  }
  ```

#### 4.5.4、ES Module 加载过程

- **ES Module加载JS文件的过程是编译（解析）时加载的，并且是异步的**；

  - 编译（解析）时加载意味着`import`不能和运行时相关的内容放在一起使用；
  - 比如不能将`import`放到if语句等的代码块中；
  - 所以我们有时候也称 `ES Module` 是静态解析的，而不是动态或者运行时解析的；

- 异步的意味着：JS引擎在遇到`import`时会去获取这个js文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行；

  - 也就是说设置了 `type=module` 的代码，相当于在`script`标签上也加上了 `async` 属性；

  - 如果我们后面有普通的 `script` 标签以及对应的代码，那么`ES Module` 对应的js文件和代码不会阻塞它们的执行

    ```html
    <script src="main.js" type="module"></script>
    <!-- 这个js文件的代码不会阻塞执行 -->
    <script src="index.js" ></script>
    ```

#### **4.5.5、加载过程（重要）**

- **`ES Module`通过`export`导出的是变量本身的引用：**
  - `export` 在导出一个变量时，js‘引擎会解析这个语法，并且创建 **模块环境记录**（module environment record）；
  - **模块环境记录**会和变量进行绑定（binding），并且这个绑定是实时的；
- 所以，如果在**导出的模块中修改了变量**，那么**导入的地方可以实时获取最新的变量**；
- 注意：在**导入的地方不可以修改变量**，因为它只是被绑定到了**模块环境记录**中的这个变量上（其实是一个常量）；
- 如果导出的是一个对象，那么在导入的地方是可以修改它的，因为它们指向同一个内存地址；

#### 4.5.6、Node 对 ES Module 的支持

- 方式一：在package.json中配置 type: module；
- 方式二：文件以.mjs结尾

```js

```

#### 4.5.7、CommonJS 和  Module 交互

**通常情况下，CommonJS不能加载ES Module**

- 因为CommonJS是同步加载的，但是 ES Module 必须经过静态分析，无法在这个时候执行 JavaScript 代码；
- 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，也可能会支持；
- Node 中是不支持的

**多数情况下，ES Module 可以加载 CommnJS**

- ES Module在加载 CommonJS 时，会将其 module.exports 导出的内容作为default到处方式来使用；
- webpack 与 Node 都是支持的



## 5、常见内置模块

### 5.1、path

path 模块用于对路径和文件进行处理，提供了很多好用的方法；

并且我们知道在 Mac OS、Linux和Window上的路径是不一样的

- window上会使用 `\` 或者 `\\` 来作为文件路径的分隔符，当然目前也支持 `/`;
- 在Mac OS、Linux的Unix操作系统上使用 `/`· 来作为文件路径的分隔符；

那么如果我们在window上使用 \ 来作为分隔符开发了一个应用程序，要部署到 Linux 上应该怎么办呢？

- 显示路径会出现一些问题；
- 所以为了屏蔽它们之间的差异，在开发中对于路径的操作我们可以使用path模块；

可移植操作系统（POSIX：Portable Operating System Interface）

- Linux 和 Mac 都实现了 POSIX 接口；
- window 部分系统实现了 POSIX 接口；

#### 5.1.1、path常见API

**从路径中获取信息**：

- dirname：获取文件的父文件夹；
- basename：获取文件名；
- extname：获取文件扩展名；

**路径的拼接 (`jsoin()` )**：

- 如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符；
- 这个时候我们可以使用 `path.join` 函数；

**将文件和某个文件夹拼接（`resolve() `）**：

- 如果我们希望将某个文件和文件夹拼接，可以使用 `path.resolve`;

- resolve 函数会判断我们拼接的路径前面是否有 `/` 或 `../` 或 `./` ；

- 如果有表示是一个绝对路径，会返回对应的拼接路径；

  ```js
  const basepath = '/User/abc';
  // 1、以 / 开头的情况
  const filename = '/def/test.js';
  console.log(path.resolve(basepath, filename)); // /def/test.js
  
  // 2、以 ./ 开头的情况
  const filename2 = './def/test.js';
  console.log(path.resolve(basepath, filename)); // /User/abc/def/test.js
  
  // 3、以 ../ 开头的情况
  const filename3 = '../def/test.js';
  console.log(path.resolve(basepath, filename)); // /User/def/test.js
  ```

  

- 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接；

  ```js
  const basepath = '/User/abc';
  const filename = 'def/test.js';
  cosole.log(path.resolve(basepath, filename)); // /User/abc/def/test.js
  ```

  



### 5.2、fs

fs 是File System 的缩写，表示文件系统；

对于任何一个为服务器端服务的语言或框架来说，通常都会有自己的文件系统：

- 因为服务器需要将各种数据、文件等放置到不同的地方；
- 比如用户数据可能大多数是放到数据库中的；
- 比如某些配置文件或者用户资源都是以文件的形式存在于操作系统上的；

Node也有自己的文件系统操作模块，就是fs：

- 借助于Node帮我们封装的文件系统，我们可以在任何的操作系统上面直接去操作文件；
- 这也是Node可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因；

#### 5.2.1、fs常见API

**Node文件系统的API非常多，并且大多数都提供三种操作方式**：

- 方式一：**同步操作文件**：代码会被阻塞，不会继续执行；

  ```js
  
  ```

  

- 方式二：**异步回调函数操作文件**：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；

  ```js
  
  ```

  

- 方式三：**异步 Promise 操作文件**：代码不会被阻塞，通过 `fs.promise` 调用方法操作，会返回一个 `Promise` ，可以通过 `then`、`catch` 进行处理；

  ```js
  
  ```

#### 5.2.2、文件描述符

文件描述符（File descriptors）是什么呢？

- 在 POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格；
- 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符；
- 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件；
- Windows 系统使用了一个虽然不同但概念上类似的机制来跟踪资源；

为了简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符；

fs.open() 方法用于分配新的文件描述符。

- 一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息；

#### 5.2.3、文件的读写

如果我们希望对文件的内容进行操作，这个时候可以使用文件的读写：

- **`fs.readFile`(path,[, optios], callback)**：读取文件的内容；
- **`fs.writeFile`(path, data[, options], callback**)：在文件中写入内容；

**options** 参数：

- flag：写入的方式
  - w ：打开文件写入；
  
  - w+：打开文件进行读写，如果不存在则创建文件；
  
  - r+：打开文件进行读写，如果不存在那么抛出异常；
  
  - r：打开文件读取，读取时的默认值；
  
  - a：打开要写的文件，将流放在文件末尾，如果不存在则创建文件；
  
  - a+：打开文件进行读写，将流放在文件末尾，如果不存在则创建文件；
  
    ![image-20230422114928363](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230422114928363.png)
  
    ![image-20230422114942972](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230422114942972.png)
- encoding：字符的编码
  
  - 如果不填写encoding，默认 Buffer 编码格式；

```JS
const fs = require('fs');

// 写入文件
const content = '你好啊，李银河';
fs.writeFile('./abc.txt', content, {flag: 'a'} ,err => {
  console.log(err);
});


// 读取文件
fs.readFile('./abc.txt', {encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.log(err);
    return
  };
  console.log(data);
});
```

#### 5.2.4、文件夹操作

- 创建文件夹

  ```js
  const fs = require('fs');
  
  const dirname = './被创建的文件夹';
  // 先判断是否有这个文件夹
  if (!fs.existsSync(dirname)) {
    fs.mkdir(dirname, err => {
      console.log(err);
    });
  };
  ```

  

- 读取文件夹下所有文件

  - options：
    - withFileTypes：回调中获取文件的类型

  ```js
  // dirname：路径
  const readFile = (dirname) => {
    // withFileTypes 添加这个options 能获取到文件的类型
    fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
      files.forEach(file => {
        // 判断当前读取的是文件还是文件夹
        if (file.isDirectory()) {
          const filepath = path.resolve(dirname, file.name);
          readFile(filepath)
        } else {
          console.log(file);
        }
      })
    });
  }
  
  readFile(dirname);
  ```

  

- 文件夹重命名

  ```js
  fs.rename('./被创建的文件夹', './被重命名后的文件夹', (err) => {
    console.log(err); 
    // operation not permitted 可能是因为跨磁盘修改文件夹导致。即node和当前修改文件夹并不在同一磁盘
  });
  ```

  



### 5.3、events 模块

Node 中的核心API都是基于异步事件驱动的：

- 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
- 我们可以监听这个事件（监听器（Listeners）），并且传入回调函数，这个回调函数会在监听到事件时调用；

发出事件和监听对象都是通过EventEmitter类来完成的，它们都属于events对象。

- emitter.on(eventName, listener)：监听事件，也可以使用addListener；
- emitter.off(eventName, listener)：移除事件监听，也可以使用 removeListener；
- emitter.emit(eventName, [ , ...args:any[] ])：发出事件，可以携带一些参数；

#### 5.3.1、基本使用：

```js
const EventEmitter = require('events');

// 1、创建发射器
const emitter = new EventEmitter();

// 2、监听某一个事件
emitter.on('clickBtn', (args) => {
  console.log('监听到clickBtn事件1', args);
});
const listener2 = (args) => {
  console.log('监听到clickBtn事件2', args);
}
emitter.on('clickBtn', listener2);

// 3、发出事件
setTimeout(() => {
  emitter.emit('clickBtn', ['李四', '王老五']);
  // 移除 listener2 的 clickBtn 事件监听
  emitter.off('clickBtn', listener2);
  emitter.emit('clickBtn', ['王小波', '李银河']);
}, 2000);
```

#### 5.3.2、方法补充

- `emitter.once(eventName, listener)`：事件只监听一次；

- `emitter.prependListener()`：将监听事件添加到最前面；

- `emitter.prependOnceListener()`：将监听事件添加到最前面，但是只监听一次；

- `emitter.removeAllListeners()`：移除所有的监听器

  ```js
  const EventEmitter = require('events');
  
  const emitter = new EventEmitter();
  
  emitter.on('click1', (arg1, arg2, arg3) => {
    console.log(arg1, arg2, arg3);
  });
  
  emitter.on('scroll', (arg1, arg2, arg3) => {
    console.log('监听到scroll事件1');
  });
  
  / 将本次监听放在所有scroll事件监听中最前面执行
  emitter.prependListener('scroll', (arg1, arg2, arg3) => {
    console.log('监听到scroll事件2');
  });
  
  
  setTimeout(() => {
    / 移除监听，若不传递参数则移除所有监听
    emitter.removeAllListeners('click1');
    emitter.emit('click1', "张三", "李四", "王老五");
    emitter.emit('scroll', "张三", "李四", "王老五");
  }, 2000);
  ```



## 6、包管理工具npm

- Node Package Manager ，Node包管理器；
- 但是目前以及不仅仅是Node包管理器了，在前端项目中我们也在使用它来管理依赖的包；
- 比如 express、koa、react、react-dom、axios、webpack等；

### 6.1、项目配置文件（package.json）

我们每一个项目都会有一个对应的配置文件，无论是前端还是后端项目：

- 这个配置文件会记录着你项目的名称、版本号、项目描述等；
- 也会记录着你项目所依赖的其他库的信息和依赖库的版本号；

这个配置文件在Node环境下（无论是前端还是后端）就是package.json

#### 6.1.1、常见属性

**必须填写的属性**:

- `name` 是项目的名称
- `version` 是当前项目的版本
- `description` 是描述信息
- `author` 是作者相关信息（发布时用到）
- `license` 是开源协议（发布时用到）

##### **private属性**

- `private` 属性记录当前的项目是否是私有的；
- 当值为 true 时，npm 是不能发布它的，这是防止私有项目或模块被发布出去；

##### **scripts属性**

- `scripts`属性用于配置一些脚本命令，以键值对的形式存在；
- 配置后我们可以通过 `npm run` 命令的 key 来执行这个命令；
- `npm start` 和 `npm run start` 是等价的，对于常用的 `start`、`test`、`stop`、`restart`可以省略掉 run 直接通过 `npm start` 等方式执行；

##### **dependencies属性**

- `dependencies` 属性是指定无论开发环境还是生产环境都需要依赖的包；
- 通常是我们项目实际开发用到的一些库模块；
- 与之对应的是`devDependencies`；

##### **devDependencies属性**

- 一些包在生产环境是不需要的，比如 `webpack`、`babel`等；
- 这个时候我们会通过 `npm install webpack --save-dev`（安装某个单独的包），将它安装到`devDependencies`属性中；
- 在生产环境不想安装这种开发时依赖时，我们需要通过 `npm install --production` （安装所有生产依赖）来安装文件的依赖；

```json
{
  "name": "06_npm-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", // 对于前端项目来说这个入口是没意义的，因为整个项目交给webpack管理了；但当作为工具开源出去的时候，别人执行引入时就会来到这个入口，执行index.js
  "scripts": {
    "start" : "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

##### **engines 属性**

- `engines` 属性用于指定 `Node` 和 `NPM` 的版本号；
- 在安装的过程中，会先检查对应的引擎版本，如果不符合就会报错；
- 事实上也可以指定所在的操作系统 `"os": "["darwin", "linux"]"`，只是很少用到；

##### **browserslist 属性**

- 用于配置打包后的 `JavaScript` 浏览器的兼容情况；
- 否则我们需要手动添加 `polufills`（补丁） 来让浏览器支持某些语法；
- 也就是说它是为`webpack`等打包工具服务的一个属性；



#### 6.1.2、版本管理

- 依赖版本的 ^2.0.3 或 ~2.0.3 是什么意思呢？

- npm的包通常遵循semver版本规范
  - semver：https://semver.org/lang/zh-CN/
  - npm semver:https://docs.npmjs.com/misc/semver
- semver 版本规范是X.Y.Z：
  - **X 主版本号**（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）；
  - **Y 次版本号**（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）；
  - **Z 修订号**（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）；

##### ^ 和 ~ 的区别

- **^** X.Y.Z：表示 X (**主版本**)是**保持不变**的，y (**次版本**) 和 z (**修订版本**)永远**安装最新**的版本；
- **~** X.Y.Z：表示 x(**主版本**) 和 y (**次版本**)是**保持不变**的，z (**修订版本**)永远**安装最新**的版本；



### 6.2、npm install 命令

- 安装 npm 包分两种情况：

  - 全局安装（global install）；
  - 项目（局部）安装（local install）；

- **全局安装**

  - 全局安装是将某个包安装到全局；
  - 通常使用 npm 全局安装的包都是一些工具包：yarn、webpack等；
  - 并不是类似于 axios、express、koa等库文件；
  - 所以全局安装了之后也并不能让我们在所有的项目中使用axios等库；

- **局部安装**

  - 局部安装会在当前目录下产生一个 node_modules 文件夹；

  - 局部安装分为开发时依赖和生产时依赖

    ```js
    / 开发时依赖
    npm i webpack --save-dev;  或 npm i webpack -D;
    
    / 生产时依赖
    npm i axios // --save 可加可不加
    ```



#### 6.2.1、npm install 原理

- 原理流程图

  <img src="C:\Users\zdyang\Pictures\学习笔记\npm install 原理图.png" style="zoom:100%;" />

- **`npm install` 会检测是否有 package-lock.json 文件**：
  - 没有 lock 文件
    1. 分析依赖关系，这是因为一个包可能依赖其他的包，并且多个包之间会产生相同依赖的情况；
    2. 从 registry 仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）；
    3. 获取到压缩包后会对压缩包进行缓存（从 `npm5` 开始有的）；
    4. 将压缩包解压到项目的 `node_modules` 文件夹中（`require` 的查找顺序会在该包下面查找）；
  - 有 lock 文件
    1. 检测 lock 中包的版本是否和 `package.json` 中一致（会按照`semver`版本规范检测）；
       - 不一致，那么会重新构建依赖关系，直接走顶层的流程；
    2. 一致的情况下，会优先查找缓存；
       - 没有找到，会从 registry 仓库下载，直接走顶层流程；
       - 查找到，会获取缓存中的压缩文件，并将压缩文件解压到 `node_modules` 文件夹中；



#### 6.2.2、package-lock.json

npm config get cache：查找 npm 缓存路径

##### 常见属性

- `name`：项目的名称；

- `version`：项目的版本；

- `lockfileVersion`：lock文件的版本；

- `requies`：使用 requires 来跟着模块的依赖关系；

- `dependencies`：项目的依赖

  - 当前项目依赖 axios ，但是 axios 依赖 follow-redireacts、form-data等模块；

    ```json
      "dependencies": {
        "axios": {
          "version": "1.3.4",
          "resolved": "https://registry.npmjs.org/axios/-/axios-1.3.4.tgz",
          "integrity": "sha512-toYm+Bsyl6VC5wSkfkbbNB6ROv7KY93PEBBL6xyDczaIHasAiv4wPqQ/c4RjoQzipxRD2W5g21cOqQulZ7rHwQ==",
          "requires": {
            "follow-redirects": "^1.15.0",
            "form-data": "^4.0.0",
            "proxy-from-env": "^1.1.0"
          }
        }
      }
    ```

  - axios 属性如下：

    - `version `表示实际安装的 axios 的版本；
    - `resolved` 用来记录下载的地址，registry 仓库中的位置；
    - `requires` 记录当前模块的依赖；
    - `integrity` 用来从缓存中获取索引，再通过索引去获取压缩包文件

### 6.3、npm 其他命令

- 卸载依赖

  ```js
  npm uninstall packagename
  npm uninstall packagename --save-dev
  npm uninstall packagename --D
  ```

  

- 强制重新构建（build）

  - 比如在 package.json 文件中修改了某个依赖的版本，我们就可以通过这个命令来重新构建
  - 它会将部分依赖删除后重新下载

  ```js
  npm rebuild 
  ```

- 清除缓存

  ```js
  npm cache clean
  ```



### 6.4、扩展

#### 6.4.1、Yarn

- yarn 是由 FaceBook、Google、Exponent 和 Tilde 联合推出的一个新的 JS 包管理工具；

- yarn 是为了弥补 npm 的一些缺陷而出现的；

- 早期的 npm 存在很多缺陷，比如安装依赖速度慢（未对包做缓存导致）、版本依赖混乱等一系列问题；

- 虽然从 npm5 版本开始，进行了很多的升级和改进，但是依然很多人喜欢使用 yarn；

  ![](C:\Users\zdyang\Pictures\学习笔记\yarn、npm命令对比图.jpg)



#### 6.4.2、cnpm 

- 查看 npm 镜像

  ```js
  npm config get registry
  ```

- 设置 npm 镜像

  ```js
  npm config set registry https://registry.npm.taobao.org
  ```

- 使用 cnpm 并将cnpm设置为淘宝的镜像

  ```js
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  
  cnpm config get registry
  ```



#### 6.4.2、npx

- npx 是 npm5.2 后自带的命令

  - npx 的作用非常多，但是比较常见的是使用它来调用项目中的某个模块的指令；

- 以webpack为例

  - 全局安装的是 webpack5.1.3
  - 项目安装的是 webpack3.6.0

- 如果我们在项目中调用 webpack 相关命令，即使你是在当前项目的路径下调用，实际上执行的还是全局的webpack命令

  - 如：执行 webpack -V 输出的将会是 5.1.3，而不是3.6.0

  - 那我们想要在当前项目路径输出的是 3.6.0该怎么做呢？

    ```js
    / 第一种方法
    // 在当前目录的 package.json 文件中，添加一个指令 npm run abd 
    // 执行这个指令后，就会去 node_modules 文件夹下的 bin 文件中找webpack相关的命令
    {
        "scripts": {
            "adb": "webpack -V"
        }
    }
    
    / 第二种方法
    npx webpack -V // 这样输出的就是当前项目的webpack版本
    ```



## 7、脚手架工具开发

### 7.1、自定义终端命令

#### 7.1.1、基本过程

- **#!（shebang/hashbang) 指令**

  - 主要是配置环境的，当我们执行某个指令时会根据 `#!` 后面的环境去执行当前文件

  ```js
  #!/usr/bin/env node // 在当前电脑环境下去找 node 这个指令（可执行文件）
  // 在后续就会使用 node 去执行当前这个可执行文件
  ```

- **在package.json 文件中配置 bin 属性**

  ```json
  {
      "bin": {
          "yzd": "index.js"
      }
  }
  ```

- **执行 npm link 指令**

  - 执行该命令后，会将 bing 和环境变量做一个链接；
  - 链接后就会将 bin 中的 yzd 作为一个终端命令配置到环境变量中



#### 7.1.2、commander 库

- GitHub 文档：https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md；

- 基本使用

  ```js
  #!/usr/bin/env node
  
  // 引入 commander
  const program = require('commander');
  
  // 查看版本号
  program.version(require('./package.json').version);
  // program.version(require('./package.json').version, '-v --version'); // version 函数可以传入第二个参数
  
  // 增加自己的 options（可选参数）
  program.option('-w --why', 'a why cli'); // 参数一：options 指令 <dest> 指令后跟的参数值，参数二：指令说明
  program.option('-d --dest <dest>', 'a destination folder, 例如：-d /src/components');
  program.option('-f --framework <framework>', 'your framework,例如: vue');
  
  
  // 监听 -h 终端指令
  program.on('--help', () => {
    console.log('');
    console.log('Other:');
    console.log('  other options~');
  })
  
  // 将终端传入的参数 传入parse函数中供commander库解析
  program.parse(process.argv);
  
  / 必须在 program.parse(process.argv); 后面去获取参数
  console.log(program.opts().dest); // 获取可选参数 <dest>
  ```

- **创建指令**

  ```js
  / create.js
  const program = require('commander');
  const { createPrijectAction } = require('./actions');
  
  // 创建自定义命令
  const createCommands = () => {
    // 创建一个名为 create 的自定义命令 // why create demo
    program
      .command('create <project> [others...]')
      .description('clone a repository into a folder')
      .action((project, others) => {
        consoel.log(project, others); // demo
    });
  }
  
  module.exports = createCommands;
  
  
  / index.js
  #!/usr/bin/env node
  const program = require('commander');
  const createCommands = require('./lib/core/create');
  
  // 创建一个名为 create 的自定义命令
  createCommands();
  
  // 将终端传入的参数 传入parse函数中供commander库解析
  program.parse(process.argv);
  ```



### 7.2、创建一个项目模板

执行 why create demo 后创建一个项目

- download-git-repo：https://www.npmjs.com/package/download-git-repo

- promisify： promisify 函数的作用就是将一个只支持回调形式的函数转成一个支持 promise 形式的函数

  ```js
  const { promisify } = require('util');
  // promisify 函数的作用就是将一个只支持回调形式的函数转成一个支持 promise 形式的函数
  const download = promisify(require('download-git-repo')); 
  ```

  

具体实现：

```js
  // 1、clone 项目 借助 download-git-repo 库下载项目
  // 2、执行 npm install
  // 3、运行 npm run serve
  // 4、打开浏览器
```





### 7.3、脚手架发布至 NPM

1. 终端登录

   ```js
   npm login
   ```

2. 配置package.json

   ```json
   {
     "name": "02_learn-cli",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "bin": {
       "why": "index.js"
     },
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": ["vue"], // 关键字，方便搜索
     "author": "", // 作者
     "homepage": "", // 首页，如果没有个人网站，可以填github主页
     "repository": { // 仓库
       "type": "git", // 通过什么工具管理代码 svn/git
       "url": "" // github项目主页
     },
     "license": "ISC", // 开源协议
     "dependencies": {
       "commander": "^10.0.0",
       "download-git-repo": "^3.0.2",
       "ejs": "^3.1.9",
       "open": "^9.0.0"
     }
   }
   
   ```

   

3. 终端发布

   ```js
   npm publish
   ```

   





## 8、Buffer 与 事件循环

### 8.1、Buffer

#### 8.1.1、数据的二进制

- 计算机中所有的内容：文字、数字、图片、音频、视频最终都会使用二进制来表示；
- JavaScript 可以去处理非常直观的数据：比如字符串，我们通常展示给用户的也是这些内容；
- 但是对服务器来说是不一样的：
  - 服务器要处理的本地文件相对较多；
  - 比如某一个保存文本的文件并不是使用utf-8进行编码的，而是用 GBK，那么我们必须读取到他们的二进制数据，再通过 GBK 转换成对应的文字；
  - 比如我们读取的是一张图片数据（二进制），再通过某些手段对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜）Node中有一个sharp的库，就是读取图片或者传入图片的 Buffer 对其再进行处理；
  - 比如在 Node 中通过 TCP 建立长链接，TCP传输的是字节流，我们需要将数据转成字节再进行传入，并且需要知道传输字节的大小；（客户端需要根据大小来判断读取多少内容）

#### 8.1.2、Buffer 和 二进制

- 在Node中，为了方便开发者完成更多功能，Node提供给了我们一个类 Buffer，并且它是全局的；
- Buffer 如何存储
  - **我们可以将 Beffer 看成是一个存储二进制的数组**；
  - 这个数组中的每一项，可以保存8位二进制：0000000；
- 为什么是8位呢？
  - 在计算机中，很少的情况我们会直接操作一位二进制，因为一位二进制存储的数据是非常有限的；
  - 所以**通常会将8位合在一起作为一个单元，这个单元称之为一个字节（byte）**；
  - 也就是说 1byte = 8bit；
  - 比如很多编程语言中的 int 类型是 4 个字节，long 类型是 8个字节；
  - 比如TCP传输的是字节流，在写入和读取时都需要说明字节的个数；
  - 比如 RGB 的值分别都是 255 ，所以本质在计算机中都是用一个字节存储的；

#### 8.1.3、Buffer 和 字符串

- Buffer 相当于是一个存储字节的数组，数组中的每一项等于一个字节的大小；

- 将一个字符放入到Beffer中是怎样的过程

  ```js
  
  // Hello --> ascii 编码 --> 77 68 79 88 90（十六进制） ---> 存储 --> [77 68 79 88 90]（ Buffer ）
  const Buffer = Buffer.from('Hello');
  ```

#### 8.1.4、Buffer 和 文件读取

```js
const fs = require('fs');

// 读取文本文件
// fs.promises.readFile('./foo.txt').then(res => {
//   // 如果未在读取文件时传递 encoding ,最终拿到的是一个 Buffer
//   console.log(res.toString('utf-8'));
// });

// 读取图片文件
fs.promises.readFile('./103433361_p0.jpg').then(res => {
  // 读取图片、音视频时不用传递 encoding ，它只会返回一个 Buffer
  // console.log(res);
  // 将 Buffer 写入一个新的文件中
  fs.promises.writeFile('./foo.png', res).then(data => {
    console.log(data);
  });
});

```

#### 8.1.4、Buffer 的创建过程

- 事实上我们创建 Buffer 时，并不会频繁地向操作系统申请内存，它会默认先申请一个8 * 1024 个字节大小的内存，也就是8kb；



### 8.2、事件循环和异步IO

- 什么是事件循环？
  - 事实上可以将事件循环理解成我们编写的JavaScript和浏览器或者 Node 之间的桥梁；

- 浏览器的事件循环是一个我们编写的 JavaScript 代码和浏览器 API 调用（setTimeout/AJAX/监听事件等）的一个桥梁，桥梁之间他们通过回调函数进行沟通；
- Node 的事件循环是一个我们编写的 JavaScript 代码和系统调用（file system、network等）之间的一个桥梁，桥梁之间他们通过回调函数进行沟通；

#### 8.2.1、进程和线程

- 线程和进程是操作系统中的两个概念：
  - 进程（process）：计算机已经运行的程序；
  - 线程（thread）：操作系统能够运行运算调度的最小单位；
- 直观一点解释：
  - 进程：我们可以认为，**启动一个程序，就会默认启动一个进程**（也可能是多个进程）；
  - 线程：**每一个进程中，都会启动一个线程用来执行程序中的代码**，这个线程被称之为主线程；
  - 所以我们也可以说进程是线程的容器；
- 举个例子：
  - 操作系统类似于一个工厂；
  - 工厂中有很多车间，这个车间就是进程；
  - 每个车间可能有一个以上的工人在工厂，这个工人就是线程；

**多进程多线程开发**

- 操作系统是如何做到同时让多个进程（边听歌、边写代码、边查资料）同时工作呢？
  - 这是因为CPU的运算速度非常快，它可以快速地在多个进程之间迅速地切换；
  - 当我们地进程中的线程获取到时间片时，就可以快速执行我们编写的代码；
  - 对于用户来说是感受不到这种快速切换的；

#### 8.2.2、浏览器和JavaScript

- 我们经常会说JavaScript是单线程的，但是J**avaScript的线程应该有自己的容器进程**：浏览器或者Node；
- 浏览器是一个进程吗，它里面只有一个线程吗？
  - 目前多数的浏览器其实都是多线程的，当我们打开一个 tab 页时就会开启一个新的进程，这是为了防止一个页面卡死而造成所有的页面无法响应，整个浏览器需要强制退出；
  - 每个进程中又有很多线程，其中包括执行 JavaScript 代码的线程；
- 但是JavaScript的代码执行是在一个单独的线程中执行的：
  - 这就意味着 JavaScript 的代码，在同一时刻只能做一件事；
  - 如果这件事是非常耗时的，就意味着当前的线程会被阻塞；

- **JavaScript 执行过程**

  ```js
  // 调用栈：先进后出
  
  const name = '李四';
  
  console.log(name); // 1、执行 log 函数，函数会被放入调用栈中执行；
  // 2、log 函数执行结束，从调用栈中取出
  
  function sum(num1, num2) {
    return num1 + num2;
  }
  
  function bar() {
    // 4、bar 中调用了 sum，sum函数被压入到调用栈中，获取到结果后出栈
    return sum(1, 2);
  }
  
  // 3、调用 bar() 函数，被压入到调用栈中，但是执行未结束
  const result = bar();
  // 5、bar 获取到结果后出栈
  
  console.log(result); // 6、将 log 函数压入到调用栈，log执行结束，出栈
  
  ```



#### 8.2.3、浏览器的事件循环

- 如果在 JavaScript 代码执行过程中，有异步操作呢？

  - 整个代码中间我们插入了一个 setTimeout  的函数调用；

  - **这个函数被放入到调用栈中，执行会立即结束，并不会阻塞后续代码的执行**；

    ```js
    // 这里其实有两个函数：一个是setTimeout函数，被压入调用栈并立即执行结束的就是它；另一个就是回调函数
    setTimeout(() => {
        console.log('setTimeout');
    })
    ```

- 那么传入的那个回调函数（比如我们称之为timer函数），会在什么时候被执行呢？

  - 事实上，setTimeout是调用了 web api，在合适的时机，会将timer函数加入到一个**事件队列**中；
  - 事件队列中的函数，会被放入到调用栈中，在调用栈中被执行；

##### 宏任务和微任务

- 但是**事件循环中并非只维护着一个队列，事实上有两个队列**：
  - 宏任务队列（macrotask queue）：ajax、setTimeout、setInterval、DOM监听、UI Rendering等；
  - 微任务队列（microtask queue）：Promise的then回调、Mutation Observer API、queueMicrotask等；
- 那么事件循环对于两个队列的优先级是怎么样的呢？
  - main script 中的代码优先执行（编写的顶层script代码/同步任务）；
  - 微任务队列中的任务优先级大于宏任务队列中的任务；
  - **在执行任何一个宏任务之前（不是队列，是一个宏任务），都会先查看微任务队列中是否有任务需要执行**
    - 也就是`宏任务执行之前，必须保证微任务队列是空的`；
    - 如果不为空，那么优先执行微任务队列中的任务（回调）；

#### 8.2.4、Node的事件循环 

**Node的架构分析**

- node 架构中最重要的两个部分：V8引擎（c++编写，将js代码翻译为可识别的机器码）、libuv（C语言编写）

- 浏览器中的 `EventLoop`是根据 HTML5 定义的规范来实现的，不同的浏览器可能会有不同的实现，而Node中是由 `libuv` 实现的；
- 我们来看在很早就给大家展示的 Node 架构图
  - 我们会发现 `libuv` 中主要维护了一个 `EventLoop` 和 `worker threads`（线程池）；
  - `EventLoop`负责调用系统的一些其他操作：文件的 IO 、Network、child-processes 等；
- `libuv` 是一个多平台的专注于异步 IO 的库，它最初是为 Node 开发的，但是现在也被使用到`Luvit`、`Julia`、`pyuv`等其他地方； 

##### **阻塞IO和非阻塞IO**

- 如果我们希望在程序中对一个文件进行操作，那么我们就需要打开这个文件：通过**文件描述符**；
  - JavaScript 可以直接对一个文件进行操作吗？
  - 看起来是可以的，但是事实上我们对任何程序中的文件操作都是需要进行**系统调用**（操作系统的文件系统）；
  - 事实上对文件的操作，是一个操作系统的**系统调用**（IO系统，IO即输入输出）；
- 操作系统通常为我们提供了两种调用方式：**`阻塞式调用`**和**`非阻塞式调用`**:
  - **阻塞式调用**：调用结果返回时，当前线程处于阻塞态（阻塞态CPU是不会分配时间片的），调用线程只有在得到调用结果之后才会执行；
  - **非阻塞式调用**：调用执行后，当前线程不会停止执行，只需要过一段时间来检查一下有没有结果返回即可。
- 所以我们开发中的很多**耗时操作**，都可以基于**非阻塞式调用**：
  - 比如网络请求本身使用了 Socket 通信，而 Socket 本身提供了 select 模型，可以进行非阻塞式的工作；
  - 比如文件读写的IO操作，我们可以使用操作系统提供的基于事件的回调机制；

**非阻塞IO的问题**

- 非阻塞IO 也存在一定的问题：我们并没有获取到需要**读取的结果**
  - 那么就意味着为了可以知道是否读取到了`完整的数据`，我们需要频繁地去确定读取到的数据是否是完整的；
  - 这个过程我们称之为**`轮询操作`**；
- 那么这个轮询的工作由谁来完成呢？
  - 如果我们的主线程频繁地去进行轮询的工作，那么必然会大大降低性能；
  - 并且在开发中我们不可能只是一个文件的读取，可能是多个文件；
  - 而且可能是多个功能：网络的IO、数据库的IO、子进程调用；
- libuv 提供了一个**`线程池（Thread Pool）`**：
  - 线程池会负责所有的相关操作，并且会通过轮询或者其他的方式等待结果；
  - 当获取到结果时，就可以将对应的回调放到事件循环（某一个事件队列）中；
  - 事件循环就可以负责接管后续的回调工作，告知 JavaScript 应用程序执行对应的回调函数；

**阻塞和非阻塞，同步和异步的区别**

- 阻塞和非阻塞是对于被调用者来说的；
  - 在我们这里就是`系统调用`，操作系统为我们提供了阻塞调用和非阻塞调用；
- 同步和异步是对于调用者来说的；
  - 在我们这里就是自己的程序；
  - 如果我们在**`发起调用之后，不会进行其他任何的操作，只是等待结果`**，这个过程就称之为同步调用；
  - 如果我们在**`发起调用后，并不会等待结果，继续完成其他的工作`**，等到有回调时再去执行，这个过程就是异步调用；
- Libuv 采用的就是非阻塞异步IO的调用方式；

##### Node事件循环的阶段

- 我们之前就强调过，事件循环像是一个桥梁，是连接着应用程序的JavaScript和系统调用之间的通道：
  - 无论是我们的文件IO、数据库、网络IO、定时器、子进程，在完成对应的操作后，都会将对应的结果和回调函数放到事件循环（任务队列）中；
  - 事件循环会不断地从任务队列中取出对应的事件（回调函数）来执行；
- 但是**`一次完整的事件循环Tick分成很多个阶段`**：
  - **定时器（Timers）**：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数；
  - **待定回调（Pending Callback）**：对某些系统操作（如TCP错误类型）执行回调，比如TCP连接时接收到ECONNREFUSED
  - **idle，prepar（前置，准备）**：仅系统内部使用，一般不用关注
  - **轮询（Poll）**：检索新的I/O事件；执行与I/O相关的回调；
  - **检测（check ）**：setImmediate() 回调函数在这里执行；
  - **关闭的回调函数**：一些关闭的回调函数，如：socket.on('close', ...)；

![image-20230422090042586](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230422090042586.png)



##### Node的宏任务和微任务

- 我们会发现从一次事件循环的 Tick 来说，Node的事件循环更复杂，它也分为微任务和宏任务；
  - 宏任务（macrotask）：setTimeout、setInterval、IO事件、setImmediate、close事件；
  - 微任务（microtask）：Promsie 的then回调、process.nextTick、queueMicrotask；
- 但是，Node中的事件循环不只是微任务和宏任务：
  - 微任务队列：
    - `next tick queue`：process.nextTick;
    - `other queue`：Promise的then回调、queueMicrotask；
  - 宏任务队列：
    - `timer queue`：setTimeout、setInterval；
    - `poll queue`：IO事件；
    - `check queue`：setImmediate；
    - `close queue`：close 事件；
- 一次Tick中的队列执行顺序：
  1. nextTicks 队列
  2. 其他微任务队列
  3. timers 队列
  4. IO 队列
  5. check 队列
  6. close 队列



**Node任务队列面试题**

```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => console.log('setImmediate'));

/**
 * 情况一：setTimeout、setImmediate
 *
 * 情况二：setImmediate、setTimeout
 */

// 情况二出现的原因在于 setTimeout 虽然是 0 ms，但是真正执行时还是有一定的延时的，如果刚好它执行的延时大于整个事件循环所需要的时间，则会被加入到下一次事件循环中。即：第一次tick时：setImmediate --> 第二次事件循环时：setTimeout

```



## 9、Stream（流）

### 9.1、流的基本概念

- 什么是流呢？
  - 我们的第一反应应该是流水，源源不断地流动；
  - 程序中的流也是类似的含义，我们可以想象当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断地被读取到我们程序中；
  - 而这个一连串的字节，就是我们程序中的流；
- 所以我们可以这样理解流：
  - 是连续字节的一种表现形式和抽象概念；
  - 流应该是可读的，也是可写的；
- 在之前学习文件的读写时，我们可以直接通过 readFile 或者 writeFile 方式读写文件，为什么还需要流呢？
  - 直接读写文件的方式，虽然简单，但是无法控制一些细节的操作；
  - 比如从什么位置开始读、读到什么位置、一次性读取多少个字节；
  - 读到某个位置后，读取暂停，某个时刻恢复等等；
  - 或者这个文件非常大，比如一个视频文件，一次性全部读取并不合适；

### **9.2、文件读写的Stream**

- 事实上Node中的很多对象是基于流实现的：
  - http模块的Request和Response对象；
  - process.stdout对象；
- 官方：另外所有的流都是 EventEmitter 的实例；
- Node.js 中有**四种基本流类型**：
  - Writable：可以向其写入数据的流（例如：fs.createWriteStream()）；
  - Readable：可以从中读取数据的流（例如：fs.createReadStream()）；
  - Duplex：同时为Readable和Writable的流（例如net.Socket）；
  - Transform：Duplex可以在写入和读取数据时修改或转换数据的流（例如zlib.createDeflate()）；

### 9.3、Readable

```js
const fs = require('fs');


// 流形式读取文件
const reader = fs.createReadStream('./foo.txt', {
  start: 3, // 文件读取开始的地方
  end: 10, // 文件读取结束的地方
  highWaterMark: 2 // 一次性读取字节的长度，默认是64kb
});


// 数据读取的过程
reader.on('data', data => {
  console.log(data);

  reader.pause(); // 暂停读取

  setTimeout(() => {
    reader.resume(); // 继续读取
  }, 1000);
});

reader.on('open', () => {
  console.log('文件被打开');
});

reader.on('close', () => {
  console.log('文件读取结束');
});

```

### 9.4、Writable

```js
const fs = require('fs');

const writer = fs.createWriteStream('./bar.txt', {
  // flags: 'a', //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
  flags: 'r+',//如果要修改文件内容，而不是覆盖文件原有的所有内容，则设置flags为'r+'
  start: 4
});

writer.write('111', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('写入成功');
});

// 使用 end 函数实际上是两步操作：writer.write() --> writer.close()，也可以直接使用 close()关闭文件
// close() 其实也是将流关闭掉了，http中使用end告诉 node 流写入完毕，node才会将流返回给客户端
writer.end('关闭文件');

writer.on('close', () => {
  console.log('文件被关闭');
});

```

### 9.4、pipe 方法

```js
// 流方式复制文件

const fs = require('fs');

// 将读取的流通过管道传输到另一个地方
const reader = fs.createReadStream('./foo.txt');
const writer = fs.createWriteStream('./foz.txt');
reader.pipe(writer);
writer.close();


```



## 10、Http模块

### 10.1、web 服务器

- 什么是web服务器
  - 当应用程序（客户端）需要某一个资源时，可以向一台服务器，通过Http请求获取到这个资源；提供资源的这个服务器，就是一个web服务器
- 目前有很多开源的web服务器：Nginx、Apache（静态）、Apache Tomcat（静态、动态）、Node.js

**web服务器初体验**

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((request, response) => {
  response.end('Hello Server');
});

// 启动服务器，并指定端口和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功🚀：localhost:8888');
});


```

**创建web服务器的方式**

```js
const http = require('http');


// 创建web服务器方式一：
const server1 = http.createServer((req, res) => {
  res.end('server1');
});


// 创建web服务器方式二：
const server2 = new http.Server((req, res) => {
  res.end('server2');
});

server1.listen(8000, () => {
  console.log('server1启动成功🚀  127.0.0.1:8000');
});
// 当不传端口号时，系统分配随机端口号，通过server2.address().port获取
server2.listen(() => {
  console.log('server2启动成功🚀  127.0.0.1:',server2.address().port);
});


```

**nodemon 监听文件变动**

- 我们在每次改变代码后都要重新启动一次服务很麻烦；

- 此时可以借助 nodeman 帮助我们监听文件的变动，并在变动后重新启动一次服务

- 全局安装

  ```js
  npm install nodemon -g
  ```

- 启动文件

  ```js
  nodemon xxx.js
  ```

  

#### 10.1.1、监听主机和端口号

- Server 通过listen方法来开启服务，并且在某一个主机和端口上监听网络请求；
  - 也就是当我们通过 `ip:port` 方式发送到我们监听的Web服务器上时；
  - 我们就可以对其进行相关的处理；
- listen 函数有三个参数：
  - 端口 port：可以不穿，系统会默认分配端口号；
  - 主机 host：通常可以传入localhost、IP地址127.0.0.1、或者IP地址0.0.0.0，默认是0.0.0.0；
    - localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1；
    - 127.0.0.1：回环地址（Loop Back Address），表达的意思其实是我们主机自己发出去的包，直接被自己接收；
      - 正常的数据库包：应用层 - 传输层 - 网络层 - 数据链路层 - 物理层
      - 而回环地址，是在网络层直接就被获取到了，是不会经过数据链路层和物理层的；
      - 比如我们**监听127.0.0.1时，在同一个网段下的主机中，通过IP地址是不能访问的**；
  - 0.0.0.0：
    - **监听IPV4上所有的地址**，再根据端口找到不同的应用程序；
    - 比如我们**监听 0.0.0.0 时，在同一个网段下的主机中，通过IP地址是可以访问的**；

### 10.2、request 对象

- **url 属性** 

  ```js
  const http = require('http');
  const url = require('url');
  const qs = require('querystring');
  
  const server = http.createServer((req, res) => {
    // console.log(url.parse(req.url));
    const { pathname, query } = url.parse(req.url); // 解析url
    if (pathname === '/login') {
      const { username, pwd } = qs.parse(query); // 解析query
      console.log(username, pwd);
      res.end('登录成功', 'utf-8');
    } else {
      res.end('请求成功');
    }
  });
  
  
  server.listen(8888, () => {
    console.log('服务启动成功🚀');
  });
  
  ```

- **methods 属性** 

  ```js
  const http = require('http');
  const url = require('url');
  // const qs = require('querystring');
  
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === '/login') {
      if (req.method === 'POST') {
        // 拿到body中的数据
        req.setEncoding('utf-8'); // 为获取到的数据设置编码格式
        req.on('data', data => {
          // 这里拿到的是一个字节流，如果不在上面设置编码格式，也可以通过 data.toString() 的方式转化为字符串
          const { username, password } = JSON.parse(data);
  
          console.log(username, password);
        });
        res.end('登录成功');
      }
    } else {
      res.end('请求成功');
    }
  });
  
  
  server.listen(8888, () => {
    console.log('服务启动成功🚀~');
  });
  
  ```

#### 10.2.1、headers 属性

- 在 request 对象的header中也包含很多有用的信息，客户端会默认传递过来一些信息：

  ```json
  {
    'content-type': 'application/json',
    'Accept':'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozil la/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'content-length': '52'
  }
  ```

- **content-type**

  - `application/json`表示是一个json类型；
  - `text/plain`表示是文本类型；
  - `application/xml`表示是 xml 类型；
  - `multipart/form-data`表示是上传文件；

- **content-length**：文件的大小和长度；

- **keep-alive**

  - http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断；
  - 在http1.0中，如果想要继续保持连接：
    - 浏览器需要在请求头中添加 connection: keep-alive;
    - 服务器需要在响应头中添加 connection: keep-alive；
    - 当客户端再次发请求时，就会使用同一个连接，直到一方中断连接；
  - 在http1.1中，所有连接默认是 connection: keep-alive的；
    - 不同的web服务器会有不同的保持 keep-alive 的时间；
    - node中默认是5s；

- **accept-encoding**：告诉服务器，客户端支持的文件压缩格式，比如js文件可以使用 gzip 编码，对应 .gz 文件；

- **accept**：告知服务器，客户端可接受文件的类型；

- **user-agent**：客户端相关信息；



### 10.3、response 对象

#### 10.3.1、响应码

- Http 状态码（Http Status Code）是用来表示Http响应状态的数字代码：
  - Http状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
  - 常见的状态码如下：

| 状态码 |      状态描述       |                             说明                             |
| :----: | :-----------------: | :----------------------------------------------------------: |
|  200   |         OK          |                        客户端请求成功                        |
|  400   |     Bad Request     |         由于客户端请求有语法错误，不能被服务器所理解         |
|  401   |    Unauthorized     | 请求未经授权，这个状态码必须和WWW-Authenticate报头域一起使用 |
|  403   |      Forbidden      | 服务器收到清求，但是拒绝提供服务，服务器通常会在响应正文中给出不提供服务的原因 |
|  404   |      Not Found      |           请求的资源不存在，例如，输入流错误的URL            |
|  500   | Intemal Serve Error |      服务器发生不可预期的错误，导致无法完成客户端的请求      |
|  503   | Service Unavailable | 服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常 |

设置响应状态码

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((request, response) => {
  // 设置响应码
  // 方式一：
  // response.statusCode = 404;

  // 方式二：
  response.writeHead(401);
  response.end('Hello Server');
});

// 启动服务器，并指定端口和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功🚀：localhost:8888');
});


```



**设置响应头**

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((request, response) => {
  // 设置响应header
  // 方式一：
  // response.setHeader('Content-Type', 'text/plain;charset=utf8'); // charset 告知客户端此次响应以什么编码格式解析

  // 方式二：
  response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8'
  });
  response.end('<h2>Hello Server</h2>');
});

// 启动服务器，并指定端口和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功🚀：localhost:8888');
});


```

### 10.4、文件上传





## 11、Express 

**认识Web框架**

- 我们已经学习了使用http内置模块来搭建web服务，为什么还要使用框架？
  - 原生http在进行很多处理时，会较为复杂；
  - 有URL判断、Method判断、参数处理、代码逻辑处理等，都需要我们自己来处理和封装；
  - 并且所有的内容放在一起，会非常地混乱；
- 目前在Node中比较流行的Web服务器框架是express、koa；
- express 早于 koa出现，并在Node社区中迅速流行起来；
  - 我们可以基于express快速、方便地开发自己的Web服务器；
  - 并且通过一些工具和中间件来扩展自己的功能；
- **`Express 整个框架地核心就是中间件，理解了中间件其他一切非常简单`**;



**Express 安装**

- express 地使用过程有两种方式：

  - 方式一：通过express提供的脚手架，直接创建一个应用的骨架；
  - 方式二：从零搭建自己的express应用结构；

- 方式一：安装express-generator

  - 安装脚手架

    ```js
    npm install -g express-generator
    ```

    

  - 创建项目

    ```js
    express express-demo
    ```

    

  - 安装依赖

    ```js
    npm install
    ```

    

  - 启动项目

    ```js
    node bin/www
    ```

    

### 11.1、中间件

**认识中间件**

- Express 是一个路由和中间件的 Web 框架，它本身的功能非常少；
  - **`Express 应用程序本质上是一系列中间件函数的调用`**；
- 中间件是什么呢？
  - 中间件的本质是一个传递给 express 的一个回调函数；
  - 整个回调函数接收三个参数：
    - 请求对象（request对象）；
    - 响应对象（response对象）；
    - next函数（在express中定义的用于执行下一个中间件的函数）；
- 中间件中可以执行哪些任务呢？
  - 执行任何代码；
  - 更改请求（request）和响应（response）对象；
  - 结束请求-响应周期（返回数据）；
  - 调用栈的下一个中间件；
- 如果当前中间件功能没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件，否则，请求将被挂起；
- 那么，如何将一个中间件应用到我们的应用程序中呢？
  - express 主要提供了两种方式：app/router.use和app/router.methods;
  - 可以是app，也可以是router；
  - methods指的是常用的请求方式，比如：app.get或app.post等；
  - methods 的方式本质是use的特殊情况；

#### 中间件应用

```JS
const express = require('express');
const app = express();
// 方法一：注册一个解析 json 数据的公共/普通中间件，这样就不必再在每一个具体的路径中间件中去解析
// app.use((req, res, next) => {
//   if (req.headers['content-type'] === 'application/json') {
//     req.on('data', data => {
//       req.body = JSON.parse(data.toString());
//     });
//     req.on('end', () => {
//       next();
//     });
//   } else {
//     next();
//   }
// });

// 方法二：借助 body-parser 库解析
// body-parser：express3.x 内置于express
// body-parser：express4.x 被分离出去
// body-parser类似功能：express4.16.x 内置成函数
app.use(express.json());
// 解析 application/x-www-form-urlencoded 格式的参数
app.use(express.urlencoded({extended: true}));
// extended
// true：对urlencoded进行解析时，使用的是第三方库：qs
// false：对urlencoded进行解析时，使用的是 Node 内置模块：querystring

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('Welcome Back');
});

app.post('/products', (req, res, next) => {
  console.log(req.body);
  res.end('Upload Product Info Success');
});

app.listen(8888, () => {
  console.log('路径方法中间件服务器启动成功~');
});
```

#### 解析multipart/form-data 类型参数

1. 手动解析，拆分字符串

2. 借助 multer 库解析

   - 解析普通数据

   ```js
   const express = require('express');
   const multer = require('multer');
   
   const app = express();
   const upload = multer(); // 本质上是创建一个 multer 对象
   
   // app.use(upload.any()); 永远不要将 multer 作为一个全局中间件使用
   // 解析除文件上传外的所有 form-data 数据
   app.post('/login', upload.any() (req, res) => {
     console.log(req.body);
     res.end('Welcome Back');
   });
   
   app.listen(8888, () => {
    console.log('form-data 服务器启动成功');
   });
   
   ```

   - 解析文件上传数据

   ```js
   // const path = require('path');
   
   const express = require('express');
   const multer = require('multer');
   
   const app = express();
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, './upload/');
     }, // 文件保存位置
     filename: (req, file, cb) => {
       // path.extname(file.originalname); 取后缀
       cb(null, +new Date() + file.originalname);
     } // 文件名
   });
   const upload = multer({
     // dest: './upload/'
     storage
   });
   
   // upload.single('file') 上传单张图片
   // upload.array('file') 上传多张
   // upload.fields([{name: 'file'}, {name: '', maxCount: 2}]) 上传多张
   app.post('/upload', upload.single('file'), (req, res) => {
     console.log(req.file); // 获取上传文件的信息
     res.end('文件上传成功~');
   });
   
   app.listen(8888, () => {
     console.log('文件上传服务器启动成功~');
   });
   
   ```

#### 保存日志信息

- 第三方库 morgan

  下载

  ```js
  npm install morgan --save
  ```

  使用

  ```js
  const fs = require('fs');
  
  const express = require('express');
  const morgan = require('morgan');
  
  const app = express();
  const writerStream = fs.createWriteStream('./log/access.log', {
    flags: 'a+'
  });
  // combined 格式
  app.use(morgan('combined', {stream: writerStream}));
  
  app.get('list', (req, res) => {
    res.end('Hello World');
  });
  
  app.listen(8888, () => {
    console.log('服务器启动成功🚀~');
  });
  ```



### 11.2、客户端发送请求的方式

- 客户端传递到服务器参数的方法常见的是5中：
  - 方式一：通过 get 请求中的URL的params；
  - 方式二：通过 get 请求中的URL的query；
  - 方式三：通过 post 请求中的body的json格式；
  - 方式四：通过 post 请求中的x-www-form-urlencoded格式；
  - 方式五：通过 post 请求中的form-data格式；

### 11.3、request 参数解析

```js
const express = require('express');

const app = express();

app.get('/products/:id/:name', (req, res) => {
  console.log(req.params);
  res.end('获取商品数据成功~');
});

app.get('/login', (req, res) => {
  console.log(req.query);
  res.end('登录成功~');
});

app.listen(8888, () => {
  console.log('服务器启动成功~');
});

```

### 11.4、响应数据

```js
const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  // 设置响应码
  res.status(204);
  // 设置响应数据
  res.json({
    name: '张三',
    age: 18
  });
});

app.listen(8888, () => {
  console.log('服务器启动成功🚀~');
});

```



### 11.5、路由

- 如果我们将所有的代码逻辑都写在 app 中，那么app会变得越来越复杂；
  - 一方面完整的Web服务器包含非常多的处理逻辑；
  - 另一方面有些处理逻辑其实是一个整体，我们应该将它们放在一起：比如对users相关的处理
    - 获取用户列表；
    - 获取某一个用户信息；
    - 创建一个新的用户；
    - 删除一个用户；
    - 更新一个用户；
- 我们可以使用 **`express.Router`** 来创建一个路由处理程序；
  - **一个 Router 实例拥有完整的中间件和路由系统；**
  - 一次，他也被称为 迷你应用程序（mini-app）；

- 基本使用

  ```js
  / users.js
  const express = require('express');
  const router = express.Router();
  
  // 请求所有用户
  router.get('/', (req, res) => {
    res.json(['张三', '李四', '王老五']);
  });
  
  // 请求具体用户信息
  router.get('/:id', (req, res) => {
    res.end(`用户${req.params.id}的信息`);
  });
  
  // 新增用户
  router.post('/', (req, res) => {
    res.end('create user success');
  });
  
  module.exports = router;
  
  
  / app.js
  const express = require('express');
  
  const userRouter = require('./routers/user');
  
  const app = express();
  // 注册所有 user 相关的接口
  app.use('/user', userRouter);
  
  app.listen(8888, () => {
    console.log('路由服务器启动成功🚀~');
  });
  
  ```



### 11.6、静态资源服务器

```js
const express = require('express');

const app = express();
app.use(express.static('./build')); // 将打包后的文件夹目录传入

app.listen(8888, () => {
  console.log('静态资源服务器启动成功🚀~');
});
```



### 11.7、错误处理

```js
const express = require('express');

const app = express();

// 错误信息常量
const USERNAME_DOCE_NOT_EXISTS = 'USERNAME_DOCE_NOT_EXISTS';
const USERNAME_ALREADY_EXISTA = 'USERNAME_DOCE_NOT_EXISTS';

app.post('/login', (req, res, next) => {
  if (false) {
    console.log();
    res.json('Welcome Back~');
  } else {
    next(new Error(USERNAME_DOCE_NOT_EXISTS)); // next 带参数会执行错误监听中间件，不会去执行下一个中间件
  }
});

// 错误监听中间件
app.use((err, req, res, next) => {
  let status = 400;
  let message = '';
  switch (err.message) {
    case USERNAME_DOCE_NOT_EXISTS:
      message = 'username doce not exists~';
      break;
    case USERNAME_ALREADY_EXISTA:
      message = 'USERNAME_ALREADY_EXISTA~';
      break;
    default:
      break;
  }
  res.status(status);
  res.json({
    code: status,
    message
  });
});

app.listen(8888, () => {
  console.log('错误处理服务器启动成功🚀~');
});


```





## 12、Koa

### 12.1、注册中间件

- koa 通过创建的app对象，**注册中间件只能通过use方法**：
  - Koa 并没有提供 methods 的方式来注册中间件；
  - 也没有提供给path中间件来匹配路径；

```js
const Koa = require('koa');

const app = new Koa();

// use 注册中间件
app.use((ctx, next) => {
  if (ctx.request.url === '/login') {
    if (ctx.request.method === 'POST') {
      ctx.response.body = 'Login Success~';
    }
  } else {
    ctx.response.body = 'Hello World';
  }
});

// 没有提供下面的注册方式
// methods 方式：app.get()
// path 方式：app.use('/login');
// 连续注册：app.use((ctx, next) => {}, (ctx, next) => {}, (ctx, next) => {});


app.listen(8888, () => {
  console.log('koa 服务器启动成功🚀~');
});


```

- 但是真实开发中我们如何将路径和methods分离呢？
  - 方式一：根据req 自己判断；
  - 方式二：使用第三方路由中间件；

### 12.2、路由

- koa 官方并没有给我们提供路由的库，我们可以选择第三方库：**koa-router**；

  ```js
  npm i koa-router
  ```

- 使用

  ```js
  /user.js
  const Router = require('koa-router');
  const router = new Router({prefix: '/user'});
  
  router.get('/', (ctx, next) => {
    ctx.response.body = 'user List~';
  });
  
  router.put('/', (ctx, next) => {
    ctx.response.body = 'put methods~';
  });
  
  module.exports = router;
  
  
  / app.js
  const Koa = require('koa'); // 导入的是一个 Application 类
  const userRouter = require('./router/user');
  
  const app = new Koa();
  
  app.use(userRouter.routes()); // 注册中间件
  app.use(userRouter.allowedMethods()); // 用于判断某一个method 是否受支持
  
  app.listen(8888, () => {
    console.log('koa 路由服务器启动成功🚀~');
  });
  
  
  ```

- 注：allowedMethods 用于判断某一个method是否受支持：

  - 如果我们请求 get，那么是正常的请求，因为我们有实现 get；
  - 如果我们请求post、delete、patch，那么就自动报错：method Not Allowed，状态码：405；
  - 如果我们请求 link、copy、lock，那么就自动报错：Not Implemented，状态码：501；

### 12.3、参数解析

#### 12.3.1、params-query

**依靠路由帮助解析**

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const userRouter = new Router({prefix: '/user'});

userRouter.get('/:id', ctx => {
  console.log(ctx.params);
  console.log(ctx.query);
  ctx.response.body = '获取用户信息成功~';
});

app.use(userRouter.routes());

app.listen(8888, () => {
  console.log('get参数解析服务器启动成功🚀~');
});

```

#### 12.3.2、json-urlencoded

**依赖第三方库（koa-bodyparser）解析**

```js
npm i koa-bodyparser
```

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser()); // 在所有的中间件之前注册 bodyParser 函数
app.use((ctx, next) => {
  console.log(ctx.request.body);
  ctx.response.body = 'Hello';
});

app.listen(8888, () => {
  console.log('json-urlencoded参数解析服务器启动成功~');
});

```

#### 12.3.3、multipart/form-data

**借助第三方库 koa-multer 解析**

```js
const Koa = require('koa');
const multer = require('koa-multer');

const app = new Koa();
const upload = multer();

app.use(upload.any()); // 与 express 中一样，并不建议全局注册该中间件，应该在对应的路由中去注册。此处只是演示
app.use((ctx, next) => {
  console.log(ctx.req.body); // 这里拿到 multipart/form-data 格式解析后的数据
  ctx.response.body = 'Hello';
});

app.listen(8888, () => {
  console.log('multipart/form-data参数解析服务器启动成功~');
});

```

注意：解析后的数据被放入到 **`ctx.req.body`** 中了，而不是 **`ctx.request.body`**中

### 12.4、文件上传

```js
const Koa = require('koa');
const multer = require('koa-multer');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({prefix: '/upload'});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/');
  },
  filename: (req, file, cb) => {
    cb(null, +new Date() + file.originalname);
  }
});

const upload = multer({
  // dest: './upload/'
  storage
});

router.post('/avatar', upload.single('avatar'), ctx => {
  console.log(ctx.req.file);
  ctx.response.body = '文件上传成功~';
});

app.use(router.routes());

app.listen(8888, () => {
  console.log('文件上传服务器启动成功🚀~');
});

```



### 12.5、数据的响应

- 输出结果：**body**将响应主体设置为以下之一：

  - string：字符串数据；
  - Buffer：Buffer 数据；
  - Stream：流数据；
  - Object || Array：对象或数组；
  - null：不输出任何内容；
  - 如果 response.status 尚未设置，Koa会自动将状态设置为200或204；

  ```js
  const Koa = require('koa');
  
  const app = new Koa();
  
  app.use(ctx => {
    // 设置响应状态码‘
    // ctx.response.status = 400;
    // 设置响应内容
    // ctx.response.body = {
    //   name: '张三',
    //   age: 18
    // };
  
  
    ctx.status = 200;
    ctx.body = '响应信息'; // 这种写法本质上是 ctx.response.body = '响应信息'; 的代理操作
  });
  
  app.listen(8888, () => {
    console.log('koa 响应内容服务器启动成功🚀~');
  });
  
  ```

  

### 12.6、静态资源服务器

- koa并没有内置部署相关功能，所以我们需要使用第三方库；

  ```js
  npm install koa-static
  ```

- 部署的过程类似于 express

  ```js
  const Koa = require('Koa');
  const koaStatic = require('koa-static');
  
  const app = new Koa();
  
  app.use(koaStatic('./build'));
  
  app.listen(8888, () => {
    console.log('Koa静态资源服务器启动成功🚀~');
  });
  ```

### 12.7、错误处理

```js
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  const isLogin = false;
  if (!isLogin) {
    ctx.app.emit('error', new Error('未登录~'), ctx); // 抛出一个错误
  }
});

app.on('error', (error, ctx) => {
  ctx.status = 401;
  ctx.body = error.message;
});

app.listen(8888, () => {
  console.log('错误处理逻辑服务器启动成功🚀~');
});

```



### 12.8、与 express 区别

- 从架构设计上来说：
  - express 是完整和强大的，其中帮助我们内置了非常多好用的功能；
  - Koa 是简洁和自由的，它只包含最核心的功能，并不会对我们使用其他中间件进行任何的限制；
    - 甚至是在 app 中连最基本的 get、post 都没给我们提供；
    - 我们需要通过自己或者路由来判断请求方式或者其他功能；
  - 因为express和koa框架的核心其实都是中间件：
    - 但是事实上，它们的中间件的执行机制是不同的，**`特别是针对某个中间件中包含异步操作时`**；



#### 12.8.1、例子

 ** 需求：*

 **  有三个中间件再一次请求中被匹配到，并且按照顺序执行；*

 **  在 middleware1 中，在req.message中添加一个字符串 aaa;*

 **  在 middleware2中，在req.message中添加一个字符串 bbb;*

 **  在 middleware3 中，在req.message中添加一个字符串 ccc;*

 **  当所有内容添加结束后，在 middleware1 中，通过res返回最终的结果*

**express 实现-同步数据**

```js
const express = require('express');

const app = express();

const middleware1 = (req, res, next) => {
  req.message = 'aaa';
  next(); // 5、回退执行netx() 后的 res.end(req.message);
  res.end(req.message);
};

const middleware2 = (req, res, next) => {
  req.message += 'bbb'; // 2、req.message = 'aaabbb'
  next(); // 4、回退执行，next() 后并没有需要执行的代码
};

const middleware3 = req => {
  req.message += 'ccc'; // 3、最后一个中间件执行完成 req.message = 'aaabbbccc'
};

app.use(middleware1, middleware2, middleware3);

/**
 * express 中间件执行的规则是顺序执行，当遇到 next() 时，执行下一个中间件，等到最后一个中间件执行完成（没有next()调用）再一步步回退去执行每个中间件 next() 后面的任务
 * 即：middleware1 -> middleware2 -> middleware3 -> middleware2 -> middleware1 -> res.end(req.message);
 */

app.listen(8888, () => {
  console.log('express 同步服务器启动成功🚀~');
});

```



**express 实现-异步数据**

```js
/**
 * express 存在的问题：对于异步操作的处理稍显乏力，
 *                    根本原因就是 express 处理中间件的源码中都是同步函数
 */


const express = require('express');
const axios = require('axios');

const app = express();

const middleware1 = (req, res, next) => {
  req.message = 'aaa'; // 1、req.message = 'aaabbb'
  next(); // 5、回退执行netx() 后的 res.end(req.message);
  // await middleware3(); 解决办法：将 middleware3 不当成一个中间件使用，而是当成一个普通的函数去调用
  res.end(req.message); // 6、req.message = 'aaabbb'
};

const middleware2 = (req, res, next) => {
  req.message += 'bbb'; // 2、req.message = 'aaabbb'
  next(); // 4、回退执行，next() 后并没有需要执行的代码 req.message = 'aaabbb'
};

const middleware3 = req => {
  // 3、req.message = 'aaabbb' express 中间件并不会等待异步任务，而是会直接执行当前中间件，并在没有next()时开始回退
  axios.get('http://192.168.0.179:3000/lyric/new?id=1959028252').then(result => {
    req.message += result.data.lrc.lyric;
  });
};

app.use(middleware1, middleware2, middleware3);

/**
 * express 中间件执行的规则是顺序执行，当遇到 next() 时，执行下一个中间件，等到最后一个中间件执行完成（没有next()调用）再一步步回退去执行每个中间件 next() 后面的任务
 * 即：middleware1 -> middleware2 -> middleware3 -> middleware2 -> middleware1 -> res.end(req.message);
 */

app.listen(8888, () => {
  console.log('express 异步服务器启动成功🚀~');
});

```



**koa实现-同步数据** （与express 的同步数据实现原理类似）

```js
const Koa = require('koa');

const app = new Koa();

const middleware1 = (ctx, next) => {
  ctx.message = 'aaa';
  next();
  ctx.body = ctx.message;
};

const middleware2 = (ctx, next) => {
  ctx.message += 'bbb';
  next();
};

const middleware3 = ctx => {
  ctx.message += 'ccc';
};

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);

app.listen(8888, () => {
  console.log('koa 同步服务器启动成功🚀~');
});

```



**koa 实现-异步操作**

```js
/**
 * koa 中间件中能处理异步数据的原因是它核心源码中dispatch（next()）函数返回的是一个 promise 对象，
 * 所以如果后续中间件中有异步操作的话 可以给 next() 函数添加 promise 回调 await/then
 */


const Koa = require('koa');
const axios = require('axios');

const app = new Koa();

const middleware1 = async (ctx, next) => {
  ctx.message = 'aaa';
  await next();
  ctx.body = ctx.message;
};

const middleware2 = async (ctx, next) => {
  ctx.message += 'bbb';
  await next();
};

const middleware3 = async ctx => {
  const result = await axios.get('http://192.168.0.179:3000/lyric/new?id=1959028252');
  ctx.message += result.data.lrc.lyric;
};

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);

app.listen(8888, () => {
  console.log('koa 异步服务器启动成功🚀~');
});

```



```js
const Koa = require('koa'); // 导入的是一个 Application 类

const app = new Koa();

app.use((ctx, next) => {
  ctx.response.body = 'Hello World';
  next();
});

app.use((ctx, next) => {
  ctx.response.body = 'Hello Koa'; // 最终客户端接收到的将会是 Hello Koa，它并不会像 express 中的res.end() 一样设置了一个 end() 在下一个需要执行的中间件中再设置一次就会报错，koad 中 ctx.body 这种返回方式是类似后面的会覆盖前面的内容。原因是 内部的 dispatch（next） 函数会一层层递归执行完所有中间件后返回一个 promise 对象，此时才会将最后一个结果返回给客户端
});

app.listen(8888, () => {
  console.log('koa 服务器启动成功🚀~');
});


```



### 12.9、洋葱模型

- 两层理解含义：
  - 中间件处理代码的过程；
    - koa中间件的执行顺序规则其实就是一个洋葱模型；
    - express 中间件同步执行也可以算一个洋葱模型，但是它如果有异步请求的话就不能算了；
  - Response 返回body执行；





## 13、Node操作数据库(mysql2)

### 1、基本使用

```js
const mysql = require('mysql2');

// 连接数据库
const connection = mysql.createConnection({
  host: '192.168.0.179',
  port: 3306,
  user: 'look',
  password: '123456',
  database: 'coderhub'
});

// 执行SQL语句
const statement = `
  SELECT * FROM bilibiliVideo WHERE id = 8;
`;
connection.query(statement, (err, results, fields) => {
  if (err) {
    console.log('查询数据库报错了', err);
    return;
  }
  console.log(results);
  // connection.end(); // 终止此次连接，某些异常可以通过 connection.on('err' , (err) => {}); 监听
  // connection.destroy(); // 销毁此次连接，强制关闭，不会有错误信息
});

```



### 2、预处理语句

- Prepared Statement（预编译语句）：

  - 提高性能：将创建的语句模块发送给MySQL，然后MySQL编译（解析、优化、转换）语句模块，并且存储它但是不执行，之后我们在真正执行时会给 ? 提供实际的参数才会执行；就算多次执行，也只会编译一次，所以性能是更高的；
  - **防止SQL注入**：之后传入的值不会像模块引擎那样就编译，那么一些SQL注入的内容就不会被执行；

  ```js
  // 执行SQL语句
  const statement = `
    SELECT * FROM bilibiliVideo WHERE id = ?; // 比如如果客户端传来的 id 值是 8 or 1 = 1; 的话，如果直接执行SQL语句则这个判断条件一定是成立的，但是使用预编译后，判断的条件就只有一个 id = xxx，后面增加的 1 = 1; 这样的SQL判断根本就不会被执行
  `;
  // execute 先执行 prepare 函数，再执行 query 函数
  // prepare(预编译语句);
  // query(预编译语句中?的参数)
  connection.execute(statement, [8], (err, results, fields) => {
    if (err) {
      console.log('查询数据库报错了', err);
      return;
    }
    console.log(results);
  });
  
  ```

- 强调：如果再次执行该语句，它会从 LRU（Least Recently Used）Cache中获取，省略了编译 statement的时间来提高性能；



### 3、连接池

- 前面我们是创建了一个链接（connection），但是如果我们有多个请求的话，该连接很有可能正在被占用，那么我们是否需要每次一个请求都去创建一个新的连接呢？

  - 事实上，mysql2给我们提供了连接池（**`connection pools`**）；
  - 连接池可以再需要的时候自动创建连接，并且创建的连接不会被销毁，会放到连接池中，后续可以继续使用；
  - 我们可以在创建连接池的时候设置 LIMIT ，也就是最大创建个数；

  ```js
  const mysql = require('mysql2');
  
  // 创建连接池
  const connections = mysql.createPool({
    host: '192.168.0.179',
    port: 3306,
    user: 'look',
    password: '123456',
    database: 'coderhub',
    connectionLimit: 10
  });
  
  
  // 执行SQL语句
  const statement = `
    SELECT * FROM bilibiliVideo WHERE published = ? AND title = ?;
  `;
  connections.execute(statement, [1, '妖怪手表'], (err, results) => {
    if (err) {
      console.log('查询数据库报错了', err);
      return;
    }
    console.log(results);
  });
  
  
  ```



**promise 方式**

- ```js
  const mysql = require('mysql2');
  
  const connections = mysql.createPool(
    {
      host: '192.168.0.179',
      port: 3306,
      user: 'look',
      password: '123456',
      database: 'coderhub'
    }
  );
  
  const statement = `
    SELECT * FROM bilibiliVideo WHERE id = ?;
  `;
  connections.promise().execute(statement, [1]).then(([results, fields]) => {
    console.log(results);
  })['catch'](err => {
    console.log('查询数据库出错了',err);
  });
  
  ```



## 14、ORM

- **对象关系映射**（Object Relational Mapping，简称**ORM**，或O/RM，或O/R mapping），是一种程序设计的方案：

  - 从效果来讲，它提供了一个可在编程语言中，使用 虚拟对象数据库 的效果；
  - 比如在 Java 开发中经常使用的 ORM 包括：Hibernate、MyBatis；
  - 简单拿Node来举例就是由 node -> mysql2 -> 数据库 这个过程变为  node -> sequelize -> mysql2 -> 数据库；而在后者这个过程中，我们不再需要去写 SQL 语句了，只需要调用 sequelize  所提供的对应的 api 即可

- Node 当中的ORM我通常使用的是 **sequelize**；

  - sequelize 是用于 Postgres，MySQL、MariaDB，SQLite和Microsoft SQL Server的基于Node.js的ORM

  - 它支持非常多的功能；

- 如果我们希望将 Sequelize和MySQL一起使用，那么我们需要先安装两个东西：

  - mysql2：sequelize在操作MySQL时使用的是mysql2；
  - sequelize：使用它来让对象映射到表中；
  - 操作数据库的过程由 node -> 数据库驱动(mysql2) -> 数据库 这个过程变为  node -> sequelize -> mysql2 -> 数据库；而在后者这个过程中，我们不再需要去写 SQL 语句了，只需要调用 sequelize  所提供的对应的 api 即可





### 14.1、sequelize 基本使用

- Sequelize 连接数据库
  - 第一步：创建一个 Sequelize 的对象，并且指定数据库、用户名、密码、数据库类型、主机地址等；
  - 第二步：测试连接是否成功；

```js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('coderhub', 'look', '123456', {
  host: '192.168.0.179',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('连接数据库成功~');
})['catch'](err => {
  console.log('连接数据库失败：', err);
});

```



### 14.2、sequelize 单表操作

```js
const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('coderhub', 'look', '123456', {
  host: '192.168.0.179',
  dialect: 'mysql'
});

// 继承一个类
class BiliVideo extends Model {}

// 初始化这个继承的类
BiliVideo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pub_index: DataTypes.STRING
},
{
  tableName: 'bilibiliVideo', // 将这个类与表映射
  createdAt: false,
  updatedAt: false,
  sequelize
});


async function queryVideo() {
  // 1、查询数据库中 bilibiliVideo 表中所有的内容
  // const result = await BiliVideo.findAll({
  //   where: {
  //     id: {
  //       [Op.eq]: 1
  //     }
  //   }
  // }); // 本质上执行这个sql：'SELECT `id`, `title`, `pub_index` FROM `bilibiliVideo` AS `BiliVideo` WHERE `BiliVideo`.`id` = 1

  // 2、插入数据
  // const result = await BiliVideo.create({
  //   title: '四月是你的谎言',
  //   'pub_index': '第1话'
  // });

  // 更新数据
  const result = await BiliVideo.update({
    'title': '声之形'
  }, {
    where: {
      id: 43
    }
  });

  console.log(result);
}

queryVideo();

```



### 14.3、sequelize 一对多操作

```js
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('coderhub', 'look', '123456', {
  host: '192.168.0.179',
  dialect: 'mysql'
});


class Product extends Model {}
class Brand extends Model {}

Brand.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: DataTypes.STRING,
  phoneRank: DataTypes.INTEGER
},
{
  tableName: 'brand', // 将这个类与表映射
  createdAt: false,
  updatedAt: false,
  sequelize
});

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE,
  brandId: {
    field: 'brand_id',
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id'
    }
  }
},
{
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 将两张表联合在一起
Product.belongsTo(Brand, {
  foreignKey: 'brandId'
});

async function queryProduct() {
  const result = await Product.findAll({
    include: {
      model: Brand
    }
  });

  console.log(result);
}

queryProduct();
```



### 14.4、sequelize 多对多操作

```js
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('coderhub', 'look', '123456', {
  host: '192.168.0.179',
  dialect: 'mysql'
});

// 创建 Student 类
class Student extends Model {}
Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: DataTypes.INTEGER
}, {
  tableName: 'students',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 创建 Course 类
class Course extends Model {}
Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.INTEGER
},
{
  tableName: 'coures',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 创建 StudentCourse 类
class StudentCourse extends Model {}
StudentCourse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'id'
    },
    field: 'student_id'
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    },
    field: 'coures_id'
  }
}, {
  tableName: 'students_select_coures',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 多对多关系的联系
Student.belongsToMany(Course, {
  through: StudentCourse,
  foreignKey: 'studentId',
  otherKey: 'courseId'
});

Course.belongsToMany(Student, {
  through: StudentCourse,
  foreignKey: 'courseId',
  otherKey: 'studentId'
});


async function queryProduct() {
  const result = await Student.findAll({
    include: {
      model: Course
    }
  });

  console.log(result);
}

queryProduct();

```







## 15、实战

### 15.1、JWT

- 为什么需要登录凭证？
  - web开发中，我们使用最多的协议是http，但是http是一个无状态的协议。
  - **无状态协议**：http的每次请求对服务器来说都是一个单独的请求，和之前的请求没什么两样，服务器并不知道我们上一步做了什么；
  - 所以，我们必须有一个方法证明我们登录过；

### 15.2、扩展

#### cookie

- 复数形态 Cookies，又被称为“小甜饼”。类型为“**小型文本文件**”，某些网站为了辨别用户身份而存储在用户本地终端（Client Side）上的数据。

  - 浏览器会在特定的情况下携带上cookie来发送请求，我们可以通过cookie来获取一些信息；

- Cookie 总是保存在客户端中，按在客户端中的存储位置，Cookie 可以分为 `内存Cookie` 和 `硬盘Cookie`。

  - 内存Cookie由**浏览器维护**，保存在内存中，**浏览器关闭时Cookie就会消失**，其存在时间是短暂的；
  - 硬盘Cookie**保存在硬盘中**，有一个过期时间，**用户手动清理或过期时间到时，才会被清理**；

- 如何判断一个Cookie是内存Cookie还是硬盘Cookie呢？

  - 没有设置过期时间，默认情况下cookie是内存cookie，在关闭浏览器时会自动删除；
  - 有设置国企时间，并且过期时间不为0或则负数的cookie，是硬盘cookie，需要手动或者到期时，才会删除；

- **cookie的生命周期**

  - 默认情况下的cookie是内存cookie，也称之为会话cookie，也就是在浏览器关闭时会自动删除；
  - 我们可以通过设置 expires 或者 max-age 来设置过期时间；
    - `expires`：设置的是 Date.toUTCString(), 设置格式是：expires=data-in-GMTString-format；意思是过了某个时间点过期，比如过了今天 23：59 ，这个cookie就失效了；
    - `max-age`：设置过期的秒数；max-age=max-age-seconds（例如一年为60 * 60 * 24 * 365）；

- **cookie的作用域**

  - `Domain`：指定哪些主机可以接受cookie
    - 如果不指定，那么默认是 origin，不包含子域名；
    - 如果指定 Domain，则包含子域名，例如设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如`developer`.mozilla.org）;
  - `Path`: 指定主机下哪些路径可以接受cookie
    - 例如，设置Path=/docs，则以下地址都会匹配：
      - /docs
      - /docs/Web
      - /docs/Web/HTTP

- **Koa中操作cookie**

  ```js
  // 设置
  const setMiddleware = (ctx, next) => {
    ctx.cookies.set(key, value, {
      maxAge: 5 * 1000 // 时间的单位与浏览器中设置时的 s 不同，此处的单位为ms
    });
  }
  
  // 获取
  const getMiddleware = (ctx, next) => {
    const value = ctx.cookies.get(key);
  }
  ```



#### session

session是基于cookie的，本质上还是一个cookie；

安装库

```js
npm i koa-session
```

使用

```js
const Session = require('koa-session');

// 创建 session 的配置
const session = Session({
  key: 'sessionid',
  maxAge: 10 * 1000,
  signed: true // 是否使用加密签名,默认为 true
}, app);
app.keys = ['aaaa'];
app.use(session);

// 设置 session
const setMiddleware = (ctx, next) => {
  // 模拟获取到数据库中的用户信息
  const id = 110;
  const name = '张三';
  ctx.session.user = {id, name}; 
}

// 获取 session
const setMiddleware = (ctx, next) => {
  console.log(ctx.session.user);
}

```



#### cookie和session的缺点

- Cookie会被附加在每个HTTP请求中，所以无形中增加了流量（事实上某些请求是不需要的）；
- Cookie是明文传递的，所以存在安全问题；
- Cookie的大小限制是4kb，对于复杂的需求来说是不够的；
- 对于浏览器外的其他客户端（比如iOS、Android），必须手动地设置cookie和session（不统一）；
- 对于分布式系统和服务器集群中如何可以保证其他系统也可以正确地解析session；



