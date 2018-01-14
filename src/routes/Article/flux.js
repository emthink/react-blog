/**
 * 正文页flux文件
 * @name flux.js
 * @kind file
 * @copyright src/routes/Article/flux.js 2017/01/12
 * @author codingplayboy
 */
const SET_POST_ID = 'SET_POST_ID';
const SET_POST_TITLE = 'SET_POST_Title';
const SET_POST_TOC = 'SET_POST_TOC';

export const setPostId = (id) => ({
  type: SET_POST_ID,
  payload: {
    id: id
  }
});

export const setPostTitle = (title) => ({
  type: SET_POST_TITLE,
  payload: {
    title: title
  }
});

export const setPostToc = (toc) => ({
  type: SET_POST_TOC,
  payload: {
    toc: toc
  }
});

const initialState = {
  id: '',
  toc: []
};

export default function articleReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_POST_ID:
      return Object.assign({}, state, {
        id: action.payload.id
      });
    case SET_POST_TOC:
      return Object.assign({}, state, {
        toc: action.payload.toc
      });
    default:
      return state;
  }
}
