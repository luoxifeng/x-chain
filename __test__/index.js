const xChain = require('../src');

var g = `{
ll: 11,
op:123
}`
console.log(`dd(${g})$`);
const t = xChain({}, ['a', 'b', "c", "d", `dd(${g})$`, 's(2)'], function (paths) {
    console.log(paths);
});


// console.log(t);

t.a.b.c.d.dd(11);

t.b.c.a.s(55).dd();
