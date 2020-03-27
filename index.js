/**
 * 
 */
const defineProps = Object.defineProperties;

const xchain = (target = {}, fileds = [], fun = () => {}) => {

  function chain(applyPath) {
    function innerChain() {

    }
    innerChain.__proto__ = proto;
    innerChain._applyPath = applyPath;
    return innerChain;
  }

  const props = fileds.reduce((acc, key) => {
    acc[key] = {
      get() {
        return 
      }
    }
    return acc;
  }, {});

  const proto = defineProps(function () {}, props)

  (target, props);
}

const t = xchain({}, ['a', 'b'], function () {

});

t.a.b(11);

t.b.a(11);
