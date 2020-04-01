const xChain = require('../src');

var g = `{
ll: 11,
op:123
}`
// console.log(`dd(${g})$`);
const t = xChain({}, ['<b>a', '<a>b', "c", "d", `dd(${g})$`, 's()'], function (paths) {
    console.log(paths);
});




// console.log(t);

t.a.b.c.s(1).dd();

// t.b.c.a.s().dd(123);

const tt = xChain({}, ['position("top")', 'duration(1000)', "message('你好')", 'success', 'error'], function (paths) {
    console.log(paths);
});


tt.position().duration(2000).message('好呀').success();
tt.position().duration(2000).message('好呀').error();

const AMAZING = 'You can do some amazing things by it$';
const join = str => list => Function.prototype.call.bind(Array.prototype.join)(list, str);
const _ = xChain({}, AMAZING.split(' '), join(' '))
console.log(_.You.can.do.some.amazing.things.by.it)
