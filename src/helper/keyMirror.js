/**
 * 映射key，Map工具函数，支持为key拓展命名空间
 * @param {Object} obj
 *   eg: {
 *     key: value || (null, undefined, '')
 *   }
 * @param {String} namespace
 */
export default function (obj, namespace = '') {
  let temp = {};
  let ret = {};
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && key) {
      // 已存在key或者value，则提示异常
      if (ret[key]) {
        throw new Error(`You can not overwrite the key: ${obj[key] || key} `);
      }
      if (obj[key] && temp[obj[key]]) {
        throw new Error(`You can not overwrite the value: ${obj[key]} `);
      }
      ret[key] = obj[key] || `${key}_${namespace}`.replace(/_$/, '');
      temp[obj[key]] = true;
    }
  }
  return ret;
}
