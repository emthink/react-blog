/**
 * 处理Reducers方法
 * @name OperateReducer.js
 * @copyright src/store/OperateReducer.js 2017/12/19
 * @author codingplayboy
 */
import { combineReducers } from 'redux';

/**
 * 创建根Reducer
 * @param {object} asyncReducers reducers
 * @see src/store/OperateReducer.js
 */
export const makeRootReducer = (reducers, asyncReducers) => {
  return combineReducers({
    ...reducers,
    ...asyncReducers
  });
};

/**
 * 插入异步Reducers
 * @param {*} store redux store
 * @param {*} reducerMap.key key
 * @param {*} reducerMap.reducer reducer
 * @see src/store/OperateReducer.js
 */
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.reducers, store.asyncReducers));
};

export default makeRootReducer;
