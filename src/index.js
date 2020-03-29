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
const getType = (target = '') => {
  const match = target.match(/^<(s|string|b|boolean|n|number)>/)
  const typeStr = (match || [])[1] || '';
}


const xChain = (target = {}, fileds = [], callback = () => { }) => {

  function createPropChain(applyPath) {
    function chain() {
      callback.call(target, applyPath);
    }

    chain.__proto__ = proto;
    chain._applyPath = applyPath;

    return chain;
  }

  function createEndPropChain(applyPath) {
    callback.call(target, applyPath);
  }

  function createFuncChain(applyPath) {
    return function () {
      function chain() {
        console.log(chain._applyPath, ...args);
      }

      chain.__proto__ = proto;
      chain._applyPath = applyPath;

      return chain;
    }
  }

  function createEndFuncChain(applyPath) {
    return function () {
      callback.call(target, applyPath);
    };
  }

  let hasFun = false;
  let hasEnd = false;
  const props = {};

  fileds
    .filter(key => (key || '').trim())
    .forEach(key => {
      const match = key.match(/^(<(boolean|any)>)?(.*?)\((.*?)\)(\$?)$/m);
      if (!match.length) {
        throw new Error('Illegal parameter');
      }

      const [
        ,
        ,
        paramType,
        funcName,
        isFunc,
        defValue,
        isEnd
      ] = match;
      if (isFunc) {
        // const funcName = RegExp.$1;
        // const defValue = RegExp.$2;
        // const isEndFun = RegExp.$4;
        const defVal = formatValue(defValue);

        hasFun = true;
        if (isEnd) hasEnd = true;

        console.log(typeof defVal, 'defaultValue', defVal);

        props[funcName] = propConfig(function () {
          const applyPath = (this._applyPath || []).concat({ [funcName]: defVal });
          return isEnd ? createEndFuncChain(applyPath) : createFuncChain(applyPath);
        });
      } else {
        props[funcName] = propConfig(function () {
          const applyPath = (this._applyPath || []).concat(key);
          return isEnd ? createEndPropChain(applyPath) : createPropChain(applyPath);
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


