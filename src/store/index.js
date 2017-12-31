/**
 * store模块入口
 * @file src/store/index.js
 * @author codingplayboy
 */
import { fork } from 'redux-saga/effects'
import { pushRoute, replaceRoute } from './location'
import createStore, { history } from './CreateStore'
import { makeRootReducer, injectReducer } from './OperateReducer'

const makeRootSaga = (sagas) => {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

const injectSagas = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return
  }
  store.asyncSagas[key] = sagas
  store.runSaga(makeRootSaga(sagas))
}

export default createStore
export {
  history,
  pushRoute,
  replaceRoute,
  injectReducer,
  makeRootReducer,
  makeRootSaga,
  injectSagas
}
