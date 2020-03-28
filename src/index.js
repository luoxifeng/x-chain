/**
 * 
 */
const defineProps = Object.defineProperties;
const propConfig = getter => {
  return {
    get: getter,
    enumerable: true,
    configurable: false
  }
};


const xChain = (target = {}, fileds = [], callback = () => {}) => {

  function createChain(applyPath) {
    function chain() {
      callback.call(target, applyPath);
    }

    chain.__proto__ = proto;
    chain._applyPath = applyPath;

    return chain;
  }

  function createFuncChain(applyPath, isEnd, defaultValue) {
    return function() {
      function chain() {
        console.log(chain._applyPath, ...args);
      }
  
      chain.__proto__ = proto;
      chain._applyPath = applyPath;
  
      return chain;
    }

    if (isEnd) {
      return function() {

      };
    }
  }

  let hasFun = false;
  let hasEnd = false;
  const props = {};

  fileds.forEach(key => {
    if (/(.*?)\((.*?)\)(\$?)$/g.test(key)) {
      const funcName = RegExp.$1;
      const defaultValue = RegExp.$2;
      const isEnd = RegExp.$3;

      hasFun = true;
      if (isEnd) hasEnd = true;

      props[funcName] = propConfig(function() {
        return createFuncChain((this._applyPath || []).concat({ funcName: defaultValue }), isEnd);
      });
    } else {
      props[key] = propConfig(function() {
        return createChain((this._applyPath || []).concat(key));
      });
    }
  });

  if (hasFun && !hasEnd) {
    throw new Error('++++++');
  }

  const proto = defineProps(function () { }, props);

  return defineProps(target, props);
}

module.exports = xChain;


