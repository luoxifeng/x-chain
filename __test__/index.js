const xChain = require('../src');


const t = xChain({}, ['a', 'b', "c", "d", 'dd(12)$', 's(2)'], function (paths) {
    console.log(paths);
});


// console.log(t);

t.a.b.c.d.dd(11);

t.b.c.a.s(55).a(11);
