/**
 * 
 */
const defineProps = Object.defineProperties;


const xChain = (target = {}, fileds = [], fun = () => { }) => {

  function createChain(applyPath) {
    function chain(...args) {
      console.log(chain._applyPath, ...args);
    }

    chain.__proto__ = proto;
    chain._applyPath = applyPath;

    return chain;
  }

  let hasFun = false;
  let hasEnd = false;
  const props = {};

  fileds.forEach((acc, key) => {
    const isfun = /\(.*?\)/.test(key);
    const [defaultValue, ...otherValues] = (RegExp.$1 || '').split('|');

    if (isfun) {

    } else {
      props[key] = {
        get() {
          return createChain((this._applyPath || []).concat(key));
        }
      }
    }
  });

  if (!(hasFun && hasEnd)) {
    throw new Error('++++++');
  }

  const proto = defineProps(function () { }, props)

}

module.exports = xChain;


