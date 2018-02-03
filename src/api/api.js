/**
 * 应用请求API配置文件
 * @name api.js
 * @copyright src/api/api.js 2017/12/28
 * @author codingplayboy
 */

export const APIBaseUrl = '//blog.codingplayboy.com/wp-json/wp/v2';

export default {
  getPostList: {
    url: '/posts',
    method: 'GET'
  },
  getPost: {
    url: '/posts/',
    method: 'GET'
  },
  getPostById: {
    url: '/posts/{id}',
    method: 'GET'
  },
  getUser: {
    url: '/users/{id}',
    method: 'GET'
  },
  getCategories: {
    url: '/categories',
    method: 'GET'
  },
  getTags: {
    url: '/tags',
    method: 'GET'
  }
};
