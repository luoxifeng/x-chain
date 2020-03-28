const xChain = require('../src');


const t = xchain({}, ['a', 'b'], function () {

});

t.a.b(11);

t.b.a(11);