/**
 * 应用请求API配置文件
 * @name api.js
 * @copyright src/api/api.js 2017/12/28
 * @author codingplayboy
 */

export const APIBaseUrl = '//blog.codingplayboy.com/wp-json/wp';

export default {
  getPostList: {
    url: '/v2/posts',
    method: 'GET'
  },
  getPost: {
    url: '/v2/posts/{id}',
    method: 'GET'
  }
};
