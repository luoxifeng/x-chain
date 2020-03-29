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
const getCurrentApplyPath = (type, key, val) => {
  if (type === 'boolean') {
    return { [key]: true };
  } else if (type === 'any') {
    return { [key]: val };
  }
  return key;
}


const xChain = (target = {}, fileds = [], callback = () => { }) => {

  function createPropChain(applyPath, type, funcName) {
    function chain(val) {
      callback.call(target, [...applyPath, getCurrentApplyPath(type, funcName, val)]);
    }

    chain.__proto__ = proto;
    chain._applyPath = [...applyPath, getCurrentApplyPath(type, funcName)];

    return chain;
  }

  function createEndPropChain(applyPath, type, funcName) {
    const currentPath = getCurrentApplyPath(type, funcName);
    callback.call(target, applyPath.concat(currentPath));
  }

  function createFuncChain(applyPath, type, funcName, defVal) {
    return function (val) {
      const finalVal = typeof val === 'undefined' ? defVal : val;
      
      function chain() {}
      chain.__proto__ = proto;
      chain._applyPath = [...applyPath, getCurrentApplyPath(type, funcName, finalVal)];

      return chain;
    }
  }

  function createEndFuncChain(applyPath, type, funcName, defVal) {
    return function (val) {
      const finalVal = typeof val === 'undefined' ? defVal : val;
      callback.call(target, [...applyPath, getCurrentApplyPath(type, funcName, finalVal)]);
    };
  }

  let hasFun = false;
  let hasEnd = false;
  const props = {};

  fileds
    .map(key => (key || '').trim())
    .filter(key => key)
    .forEach(key => {
      const reg = /^(<(boolean|any)>)?(\w+?)(\(((.|\n)*?)\))?(\$)?$/g;
      if (!reg.test(key)) {
        throw new Error(`Illegal parameter ${key}`);
      }
      const paramType = RegExp.$2;
      const funcName = RegExp.$3;
      const isFunc = RegExp.$4;
      const defValue = RegExp.$5;
      const isEnd = RegExp.$7;

      if (isFunc) {
        const defVal = formatValue(defValue);

        hasFun = true;
        if (isEnd) hasEnd = true;
        props[funcName] = propConfig(function () {
          const type = defVal !== 'undefined' ? 'any' : paramType;
          const applyPath = [this._applyPath || [], type, funcName, defVal];
          return isEnd ? createEndFuncChain(...applyPath) : createFuncChain(...applyPath);
        });
      } else {
        props[funcName] = propConfig(function () {
          const type = paramType === 'any' ? '' : paramType;
          const applyPath = [this._applyPath || [], type, funcName];
          return isEnd ? createEndPropChain(...applyPath) : createPropChain(...applyPath);
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


