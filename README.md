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
