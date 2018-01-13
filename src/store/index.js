/**
 * store模块入口
 * @name store/index.js
 * @copyright src/store/index.js
 * @author codingplayboy
 */
import { fork } from 'redux-saga/effects';
import { pushRoute, replaceRoute } from './location';
import createStore, { history } from './CreateStore';
import { makeRootReducer, injectReducer } from './OperateReducer';

/**
 * fork所有saga分支
 * @param {array} sagas saga数组
 * @see src/store/index.js
 */
const makeRootSaga = (sagas) => {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga));
  };
};

/**
 * 插入异步saga，更新store中fork的saga
 * @param {*} store
 * @param {object} param
 * @see src/store/index.js
 */
const injectSagas = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return;
  }
  store.asyncSagas[key] = sagas;
  store.runSaga(makeRootSaga(sagas));
};

export default createStore;
export { history, pushRoute, replaceRoute, injectReducer, makeRootReducer, makeRootSaga, injectSagas };
