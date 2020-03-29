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
const formatValue = value => new Function('', `return ${value}`)();


const xChain = (target = {}, fileds = [], callback = () => {}) => {

  function createPropChain(applyPath) {
    function chain() {
      callback.call(target, applyPath);
    }

    chain.__proto__ = proto;
    chain._applyPath = applyPath;

    return chain;
  }

  function createFuncChain(applyPath) {
    return function() {
      function chain() {
        console.log(chain._applyPath, ...args);
      }
  
      chain.__proto__ = proto;
      chain._applyPath = applyPath;
  
      return chain;
    }
  }

  function createEndFuncChain(applyPath) {
    return function() {
      callback.call(target, applyPath);
    };
  }

  let hasFun = false;
  let hasEnd = false;
  const props = {};

  fileds.forEach(key => {
    if (/(.*?)\(((.|\n)*?)\)(\$?)$/gm.test(key)) {
      const funcName = RegExp.$1;
      const defValue = RegExp.$2;
      const isEndFun = RegExp.$4;
      const defVal = formatValue(defValue);

      hasFun = true;
      if (isEndFun) hasEnd = true;

      console.log(typeof defVal, 'defaultValue', defVal);

      props[funcName] = propConfig(function() {
        const applyPath = (this._applyPath || []).concat({ [funcName]: defVal });
        return isEndFun ? createEndFuncChain(applyPath) : createFuncChain(applyPath);
      });
    } else {
      props[key] = propConfig(function() {
        return createPropChain((this._applyPath || []).concat(key));
      });
    }
  });

  if (hasFun && !hasEnd) {
    throw new Error(`
      requires at least one ending function when Function chain is configured;
      eg: 'foo()$'
    `);
  }

  const proto = defineProps(function () { }, props);

  return defineProps(target, props);
}

module.exports = xChain;


