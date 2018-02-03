/**
 * 应用初始化时期望处理的异步请求管理Sagas模块
 * @name AppFlux.js
 * @kind file
 * @copyright src/store/appFlux.js 2017/12/23
 * @author codingplayboy
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { fetch, API } from 'api/';
import { formatPostListData, formatPostNavsData, formatCategoriesData, formatCategoryListData } from './dataAdapter';
import { setWillAutoFetchPosts } from 'routes/Home/flux';

const TOGGLE_APP_SIDE_BAR = 'toggle_app_side_bar';
const REQUEST_POST_LIST = 'REQUEST_POST_LIST';
const FETCHING_POST_LIST = 'FETCHING_POST_LIST';
const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST';
const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORY_LIST';
const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST';

/**
 * 切换顶部／左部导航栏ActionCreator
 * @param {object} [payload] 负载参数
 * @return {object} [action] action object
 * @see src/store/appFlux.js
 */
function toggleMobileSideBar (payload = {}) {
  return {
    type: TOGGLE_APP_SIDE_BAR,
    payload: payload
  };
}

/**
 * 请求文章列表ActionCreator
 * @param {object} payload 请求文章列表参数负载
 * @return {object} [action] action object
 * @see src/store/appFlux.js
 */
function requestPostList (payload) {
  return {
    type: REQUEST_POST_LIST,
    payload: payload
  };
}

/**
 * 请求文章列表状态中ActionCreator
 * @param {object} payload 请求状态
 * @return {object} [action] action object
 * @see src/store/AppFlux.js
 */
function fetchingPostList (payload) {
  return {
    type: FETCHING_POST_LIST,
    payload: payload
  };
}

/**
 * 接收文章列表ActionCreator
 * @param {*} payload 接收文章列表数据负载
 * @return {object} [action] action object
 * @see src/store/appFlux.js
 */
function receivePostList (payload) {
  return {
    type: RECEIVE_POST_LIST,
    payload: payload
  };
}

// 请求博客目录
function requestCategories (param) {
  return {
    type: REQUEST_CATEGORY_LIST,
    payload: param
  };
}

// 接收博客目录
function receiveCategories (param) {
  return {
    type: RECEIVE_CATEGORY_LIST,
    payload: param
  };
}

export const actions = {
  toggleMobileSideBar, requestPostList, receivePostList, requestCategories, receiveCategories
};

// 初始化状态
var initialState = {
  isMobileSideBarShow: false,
  fetching: false,
  posts: {
    ids: [],
    data: {},
    total: 0,
    totalPages: 0
  },
  categories: [],
  categorySlugMap: {},
  categoryList: [],
  categoryIndexes: {},
  postNavs: []
};

/**
 * 应用初始reducer
 * @param {object} state 应用状态树节点状态对象
 * @param {object} action action object
 * @return {object} state 应用新状态对象
 * @see src/store/appFlux.js
 */
export default function appReducer (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_APP_SIDE_BAR:
      return Object.assign({}, state, {
        isMobileSideBarShow: action.payload.isMobileSideBarShow
      });
    case FETCHING_POST_LIST:
      return Object.assign({}, state, {
        fetching: action.payload.fetching
      });
    case RECEIVE_POST_LIST:
      return Object.assign({}, state, {
        posts: {
          ids: payload.ids,
          data: payload.data,
          total: payload.total,
          totalPages: payload.totalPages
        }
      });
    case RECEIVE_CATEGORY_LIST:
      let data = formatCategoryListData(payload.categories);
      let categories = formatCategoriesData(payload.categories);
      return Object.assign({}, state, {
        categories: categories.idMap,
        categorySlugMap: categories.slugMap,
        categoryList: data.list,
        categoryIndexes: data.indexObj,
        postNavs: formatPostNavsData(payload.categories)
      });
    default:
      return state;
  }
}

const initParam = {
  page: 1,
  per_page: 10
};

/**
 * 请求文章列表方法
 * @see src/store/appFlux.js
 * @param {*} params 请求参数
 *  eg: {
 *    page: Num,
 *    per_page: Num
 *  }
 */
function getPostList (params = {
  page: 1,
  per_page: 10
}) {
  return fetch({
    ...API.getPostList,
    data: Object.assign({}, initParam, params)
  }).then(res => {
    if (res) {
      let data = formatPostListData(res.data);
      return {
        total: parseInt(res.headers['X-WP-Total'.toLowerCase()], 10),
        totalPages: parseInt(res.headers['X-WP-TotalPages'.toLowerCase()], 10),
        ...data
      };
    }
  });
}

// 请求目录列表方法
function getCategories (params = {
  per_page: 100
}) {
  return fetch({
    ...API.getCategories,
    data: params
  }).then(res => {
    return res.data || [];
  });
}

/**
 * 处理请求文章列表Saga
 * @see src/store/appFlux.js
 * @param {*} payload 请求参数负载
 */
function * getPostListSaga ({ payload }) {
  yield put(fetchingPostList({
    fetching: true
  }));
  const data = yield call(getPostList, payload);
  yield put(receivePostList(data));
  yield put(fetchingPostList({
    fetching: false
  }));
  if (data) {
    yield put(setWillAutoFetchPosts(false));
  }
}

function * getCategoriesSaga ({ payload }) {
  const data = yield call(getCategories, payload);
  yield put(receiveCategories({
    categories: data
  }));
}

/**
 * 定义AppSaga
 * @see src/store/appFlux.js
 */
export function * AppSaga (action) {
  // 接收最近一次请求，然后调用getPostListSaga子Saga
  yield takeLatest(REQUEST_POST_LIST, getPostListSaga);
  yield takeLatest(REQUEST_CATEGORY_LIST, getCategoriesSaga);
}
