# X-Chain （神奇的链式调用）

这是一个可以让你配置任意调用链的库，它会让你的链式调用更语义化，并且很少关心顺序，如果你有些场景下希望代码像说话或者写句子一样顺畅，那么`X-Chain`可能会适合你.

## Amazing

像下面这样一句话

```
You can do some amazing things by it
```

想象一下，如果代码可以这样写是不是很有意思

```javascript
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

## Simple Demo

```javascript

const _ = xChain({}, ['a', 'b', "c", "d", 'dd(12)~-1', 's(2)'], function (paths) {
    console.log(paths);
});

_.a.b.c.d.dd(11); // [ 'a', 'b', 'c', 'd', { dd: 12 } ]
_.b.c.a.s().a(); // [ 'b', 'c', 'a', { s: 2 }, 'a' ]


```

## Document

```none

[<a|b|i>]foo[([default])][~(|^|$|+|0-Infinite)]

```

- Props Chain (属性链)

- Function Chain (函数调用链)

- Tag (强制转换标签)
  - `<boolean>` === `<b>`

  - `<any>` === `<a>`

  - `<ignore>` === `<i>`

- Position Limit (位置限制)
  - Start `~^` === `~0` (尚不支持)

  - Middle `~+` !== `~0` (尚不支持)

  - End `~$` === `~-1`

  - Sort `~[number]` (尚不支持)
  

## 真实案例
  
```javascript

const cfg = [
    'position("top")',
    'duration(1000)',
    "message('你好')",
    'success',
    'error'
];
const _ = xChain({}, cfg, console.log);

_.duration(2000).position().message('成功了').success();
// output: [{ duration: 2000 }, { position: 'top' }, { message: '成功了' }, 'success']

_.position('left').duration().message('出错了').error();
// output: [{ position: 'left' }, { duration: 1000 }, { message: '出错了' }, 'error']

```
