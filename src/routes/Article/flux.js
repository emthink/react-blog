/**
 * 正文页flux文件
 * @name flux.js
 * @kind file
 * @copyright src/routes/Article/flux.js 2017/01/12
 * @author codingplayboy
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { fetch, API } from 'api/';
import moment from 'moment';

const SET_ARTICLE_POST_ID = 'SET_ARTICLE_POST_ID';
const SET_ARTICLE_LINK = 'SET_ARTICLE_LINK';
const SET_ARTICLE_POST_TITLE = 'SET_ARTICLE_POST_Title';
const SET_ARTICLE_POST_TOC = 'SET_ARTICLE_POST_TOC';
const REQUEST_ARTICLE_POST = 'REQUEST_ARTICLE_POST';
const RECEIVE_ARTICLE_POST = 'RECEIVE_ARTICLE_POST';

export const setPostId = (id) => ({
  type: SET_ARTICLE_POST_ID,
  payload: {
    id: id
  }
});

export const setPostLink = (link) => ({
  type: SET_ARTICLE_LINK,
  payload: {
    link: link
  }
});

export const setPostTitle = (title) => ({
  type: SET_ARTICLE_POST_TITLE,
  payload: {
    title: title
  }
});

export const setPostToc = (toc) => ({
  type: SET_ARTICLE_POST_TOC,
  payload: {
    toc: toc
  }
});

export const requestPost = (param) => ({
  type: REQUEST_ARTICLE_POST,
  payload: param
});

export const receivePost = (param) => ({
  type: RECEIVE_ARTICLE_POST,
  payload: {
    post: param
  }
});

const initialState = {
  id: '',
  link: '',
  toc: [],
  post: {
    id: '',
    title: '',
    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    excerpt: '',
    content: '',
    modified: '',
    authorId: '',
    categories: [],
    tags: [],
    comment_status: '',
    status: '',
    link: ''
  }
};

/**
 * Article Reducer
 * @see src/routes/Article/flux.js
 * @param {*} state store状态节点
 * @param {object} action action对象
 */
export default function articleReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_ARTICLE_POST_ID:
      return Object.assign({}, state, {
        id: action.payload.id
      });
    case SET_ARTICLE_LINK:
      return Object.assign({}, state, {
        link: action.payload.link
      });
    case SET_ARTICLE_POST_TOC:
      return Object.assign({}, state, {
        toc: action.payload.toc
      });
    case RECEIVE_ARTICLE_POST:
      return Object.assign({}, state, {
        post: action.payload.post
      });
    default:
      return state;
  }
}

/**
 * 格式化文章信息DataAdapter
 * @see see src/routes/Article/flux.js
 * @param {object} post post文章信息对象
 */
function formatPostData (post = {}) {
  if (!post.id) {
    return {};
  }
  return {
    id: parseInt(post.id, 10),
    title: post.title.rendered,
    date: moment(post.date).format('YYYY-MM-DD HH:mm:ss'),
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    modified: moment(post.modified).format('YYYY-MM-DD HH:mm:ss'),
    authorId: post.author,
    categories: post.categories,
    tags: post.tags,
    comment_status: post.comment_status,
    status: post.status,
    link: post.link
  };
}

function getPost (params = {}) {
  let options = {};

  if (params.id) {
    options = {
      ...API.getPostById,
      slotParams: {
        ...params
      }
    };
  } else {
    options = {
      ...API.getPost,
      data: params
    };
  }
  return fetch(options).then(res => {
    if (res && res.data) {
      return formatPostData(res.data);
    }
    return {};
  });
}

/**
 * 处理请求文章列表Saga
 * @see src/routes/Article/flux.js
 * @param {*} action.payload 请求参数负载
 */
function * getPostSaga ({ payload }) {
  const data = yield call(getPost, payload);
  yield put(receivePost(data));
}

/**
 * 定义ArticleSaga
 * @see src/routes/Article/flux.js
 */
export function * ArticleSaga (action) {
  // 接收最近一次请求，然后调用getPostSaga子Saga
  yield takeLatest(REQUEST_ARTICLE_POST, getPostSaga);
}
