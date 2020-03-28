const xChain = require('../src');


const t = xChain({}, ['a', 'b', "c", "d", 'dd()$'], function (paths) {
    console.log(paths, this === t);
});


console.log(t);

t.a.b.c.d(11);

t.b.c.a(11);
