/**
 * 创建redux store
 * @name CreateStotre.js
 * @kind file
 * @copyright src/store/CreateStore.js 2017/12/19
 * @author codingplayboy
 */
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

export default (initialState = {}, reducers = {}, sagas = []) => {
  // Middlewares
  // Build the middleware for intercepting and dispatching navigation actions
  const blogRouteMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [blogRouteMiddleware, sagaMiddleware];

  // enhancers
  const enhancers = [];
  let composeEnhancers = compose;

  if (__DEV__) {
    // 开发环境，开启redux-devtools
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // create store
  const store = createStore(
    combineReducers({
      router: routerReducer,
      ...reducers
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncSagas = {};
  store.asyncReducers = {};
  store.runSaga = (saga) => {
    sagaMiddleware.run(saga);
  };

  if (module.hot) {
    module.hot.accept('./index', () => {
      const { makeRootReducer } = require('./index');
      store.replaceReducer(makeRootReducer(store.asyncReducers));
    });
  }

  // kick off initial sagas
  store.runSaga(sagas);

  return store;
};
