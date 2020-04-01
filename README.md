# X-Chain （神奇的链式调用）
这是一个可以让你配置任意调用链的库，它会让你的链式调用更语义化，并且很少关心顺序，如果你有些场景下希望代码像说话或者写句子一样顺畅，那么`X-Chain`可能会适合你.

## Amazing
像下面这样一句话
```
You can do some amazing things by it
```
想象一下，如果代码可以这样写是不是很有意思
```
You.can.do.some.amazing.things.by.it
```
`X-Chain`就可以为你实现

```javascript
const AMAZING = 'You can do some amazing things by it$';
const join = str => list => Function.prototype.call.bind(Array.prototype.join)(list, str);

const _ = xChain({}, AMAZING.split(' '), join(' '))
const wow = _.You.can.do.some.amazing.things.by.it;
console.log(wow); // You can do some amazing things by it
```




## Usage
```javascript
const xChain = require('../src');

const t = xChain({}, ['a', 'b', "c", "d", 'dd(12)$', 's(2)'], function (paths) {
    console.log(paths);
});

t.a.b.c.d.dd(11); // [ 'a', 'b', 'c', 'd', { dd: 12 } ]

t.b.c.a.s().a(); // [ 'b', 'c', 'a', { s: 2 }, 'a' ]

```

-  真实案例
```javascript
const tt = xChain({}, ['position("top")', 'duration(1000)', "message('你好')", 'success$', 'error$'], function (paths) {
    console.log(paths);
});


tt.position().duration(2000).message('成功了').success();
tt.position().duration(2000).message('出错了').error();

```
