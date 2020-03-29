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

  function createChain(applyPath) {
    function chain() {
      callback.call(target, applyPath);
    }

    chain.__proto__ = proto;
    chain._applyPath = applyPath;

    return chain;
  }

  function createFuncChain(applyPath, isEnd, defaultValue) {
  
    if (isEnd) {
      return function() {
        console.log(applyPath);
      };
    }

    return function() {
      function chain() {
        console.log(chain._applyPath, ...args);
      }
  
      chain.__proto__ = proto;
      chain._applyPath = applyPath;
  
      return chain;
    }
  }

 


  let hasFun = false;
  let hasEnd = false;
  const props = {};

  function createEndFuncChain(applyPath) {
    
    return function() {
      callback.call(target, applyPath);
    };
  }


  fileds.forEach(key => {
    if (/(.*?)\((.*?)\)(\$?)$/g.test(key)) {
      const funcName = RegExp.$1;
      const defValue = RegExp.$2;
      const isEndFun = RegExp.$3;
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


