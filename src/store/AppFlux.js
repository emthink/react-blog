/**
 * 应用初始化时期望处理的异步请求管理Sagas
 * @file src/store/appFlux.js
 * @author codingplayboy
 * @date 2017/12/23
 */
import { put, call, takeLatest } from 'redux-saga/effects'
import { fetch, API } from '../api/'
import { formatPostListData } from './dataAdapter'

const TOGGLE_APP_SIDE_BAR = 'toggle_app_side_bar'
const REQUEST_POST_LIST = 'REQUEST_POST_LIST'
const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST'

/**
 * 切换顶部／左部导航栏ActionCreator
 * @param {object} payload 负载参数
 */
function toggleMobileSideBar (payload = {}) {
  return {
    type: TOGGLE_APP_SIDE_BAR,
    payload: payload
  }
}

/**
 * 请求文章列表ActionCreator
 * @param {object} payload
 */
function requestPostList (payload) {
  return {
    type: REQUEST_POST_LIST,
    payload: payload
  }
}

/**
 * 接收文章列表ActionCreator
 * @param {*} payload
 */
function receivePostList (payload) {
  return {
    type: RECEIVE_POST_LIST,
    payload: payload
  }
}

export const actions = {
  toggleMobileSideBar, requestPostList, receivePostList
}

// 初始化状态
var initialState = {
  isMobileSideBarShow: false,
  posts: {
    ids: [],
    data: {},
    total: 0,
    totalPages: 0
  }
}

export default function appReducer (state = initialState, action) {
  const { payload } = action
  switch (action.type) {
  case TOGGLE_APP_SIDE_BAR:
    return Object.assign({}, state, {
      isMobileSideBarShow: action.payload.isMobileSideBarShow
    })
  case RECEIVE_POST_LIST:
    return Object.assign({}, state, {
      posts: {
        ids: payload.ids,
        data: payload.data,
        total: payload.total,
        totalPages: payload.totalPages
      }
    })
  default:
    return state
  }
}

/**
 * 请求文章列表方法
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
    data: params
  }).then(res => {
    if (res) {
      let data = formatPostListData(res.data)
      return {
        total: parseInt(res.headers['X-WP-Total'.toLowerCase()], 10),
        totalPages: parseInt(res.headers['X-WP-TotalPages'.toLowerCase()], 10),
        ...data
      }
    }
  })
}

/**
 * 处理请求文章列表Saga
 * @param {*} payload 请求参数负载
 */
function * getPostListSaga ({ payload }) {
  const data = yield call(getPostList, payload)
  yield put(receivePostList(data))
}

// 定义AppSaga
export function * AppSaga (action) {
  // 接收最近一次请求，然后调用getPostListSaga子Saga
  yield takeLatest(REQUEST_POST_LIST, getPostListSaga)
}
