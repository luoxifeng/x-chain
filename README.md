# X-Chain
make object infinite chain invoke api

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
