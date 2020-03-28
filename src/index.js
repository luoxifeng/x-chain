/**
 * 
 */
const defineProps = Object.defineProperties;

const xchain = (target = {}, fileds = [], fun = () => { }) => {

  function chain(applyPath) {
    function innerChain() {

    }
    innerChain.__proto__ = proto;
    innerChain._applyPath = applyPath;
    return innerChain;
  }

  const props = fileds.reduce((acc, key) => {
    const isfun = /\(.*?\)/.test(key);
    const [defaultval, ...othervalues] = (RegExp.$1 || '').split('|')
    if (isfun) {

    } else {

    }

    acc[key] = {
      get() {
        return
      }
    }
    return acc;
  }, {});

  const proto = defineProps(function () { }, props)

    (target, props);
}


