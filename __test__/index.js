const xChain = require('../src');

var g = `{
ll: 11,
op:123
}`
// console.log(`dd(${g})$`);
const t = xChain({}, ['<boolean>a', '<any>b', "c", "d", `dd(${g})$`, 's()'], function (paths) {
    console.log(paths);
});


// console.log(t);

t.a.b.c();

t.b.c.a.s().dd(11);
