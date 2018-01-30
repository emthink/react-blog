/**
 * 分类模块flux
 * @see src/routes/Category/flux.js
 * @author codingplayboy
 * @date 2018/01/27
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import keyMirror from 'helper/keyMirror';
import { fetch, API } from 'api/';
import { createActions } from 'helper/fluxHelper';
import { formatPostListData } from 'store/dataAdapter';

const TYPES = keyMirror({
  REQUEST_POST_LIST: null,
  RECEIVE_POST_LIST: null
}, 'CATEGORY');

export const actions = createActions({
  requestPostList: {
    type: TYPES.REQUEST_POST_LIST
  },
  receivePostList: {
    type: TYPES.RECEIVE_POST_LIST
  }
});

const initialState = {
  ids: [],
  posts: []
};

export default function categoryReducer (state = initialState, action) {
  switch (action.type) {
    case TYPES.RECEIVE_POST_LIST:
      let results = formatPostListData(action.payload.data);
      return Object.assign({}, state, {
        ids: results.ids,
        posts: results.data
      });
    default:
      return state;
  }
}

/**
 * fetch请求分类文章列表
 * @param {*} params
 */
function getPostList ({ data }) {
  return fetch({
    ...API.getPostList,
    data: data
  }).then(res => {
    if (res && res.data) {
      return res.data;
    }
    return [];
  });
}

/**
 * 定义请求分类文章列表Saga
 * @see src/containers/CategoryList/flux.js
 * @param {*} param
 */
function * getPostListSaga ({ payload }) {
  const data = yield call(getPostList, payload);
  yield put(actions.receivePostList(data));
}

/**
 * 定义TagListSaga
 * @see src/store/appFlux.js
 */
export function * CategoryListSaga (action) {
  // 接收最近一次请求，然后调用getPostListSaga子Saga
  yield takeLatest(TYPES.REQUEST_POST_LIST, getPostListSaga);
}
