/**
 * 处理Reducers
 * @file src/store/OperateReducer.js
 * @author codingplayboy
 * @date 2017/12/19
 */
import { combineReducers } from 'redux'

/**
 * 创建根Reducer
 * @param {object} asyncReducers reducers
 */
export const makeRootReducer = (reducers) => {
  return combineReducers({
    ...reducers
  })
}

/**
 * 插入异步Reducers
 * @param {*} store redux store
 * @param {*} reducerMap.key key
 * @param {*} reducerMap.reducer reducer
 */
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return
  }

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
