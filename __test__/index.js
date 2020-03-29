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
