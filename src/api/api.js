/**
 * 应用请求API定义文件
 * @file src/api/api.js
 * @author codingplayboy
 * @date 2017/12/28
 */

export const APIBaseUrl = '//blog.codingplayboy.com/wp-json/wp'

export default {
  getPostList: {
    url: '/v2/posts',
    method: 'GET'
  }
}
