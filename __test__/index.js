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

const tt = xChain({}, ['position("top")', 'duration(1000)', "message('你好')", 'success$', 'error$'], function (paths) {
    console.log(paths);
});


tt.position().duration(2000).message('好呀').success();
tt.position().duration(2000).message('好呀').error();