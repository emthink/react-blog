/**
 * flux工具辅助方法模块
 * @see src/helper/fluxHelper.js
 * @author codingplayboy
 * @date 2018/01/27
 */

/**
 * 默认的ActionCreator创建函数
 * @see src/helper/fluxHelper.js
 */
const actionCreator = data => (params) => {
  let results = {
    type: data.type
  };

  if (data.paramKey) {
    results.payload = {
      [data.paramKey]: params
    };
  } else {
    results.payload = Object.assign(data.payload || {}, {
      data: params
    });
  }

  return results;
};

/**
 * createAction, 根据传入数据批量返回多个actionCreator
 * @see src/helper/fluxHelper.js
 * @param {*} options
 * eg: {
 *   key {string, actionCreator名称}: val {object}
 * }
 * val - eg: {
 *   type: {string}, action 类型,
 *   payload: {object}, action 默认负载对象
 *   paramKey: {string} payload参数key，仅单参数有效
 * }
 * @return {object} action object
 * eg: {
 *   type: {string} action类型
 *   payload: action负载
 * }
 */
export const createActions = (options) => {
  let results = {};
  if (options) {
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        let data = options[key];
        results[key] = data.actionCreator || actionCreator(data);
      }
    }
  }
  return results;
};
