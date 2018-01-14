/**
 * 首页组件相关action, reducer, saga
 * @fiel src/routes/Home/flux.js
 * @author codingplayboy
 * @date 2017/12/23
 */

export const SET_WILL_AUTO_FETCH_POSTS = 'SET_HAS_AUTO_FETCH_POSTS';

export const setWillAutoFetchPosts = (param) => ({
  type: SET_WILL_AUTO_FETCH_POSTS,
  payload: {
    flag: param
  }
});

export const actions = {};

var initialState = {
  willAutoFetchPosts: true
};

export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case SET_WILL_AUTO_FETCH_POSTS:
      return Object.assign({}, state, {
        willAutoFetchPosts: action.payload && action.payload.flag
      });
    default:
      return state;
  }
}
