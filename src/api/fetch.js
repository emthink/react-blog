/**
 * 封装接口请求模块文件
 * @name fetch.js
 * @copyright src/api/fetch.js
 * @author codingplayboy
 * @see axios
 */

import axios from 'axios'
import { APIBaseUrl } from './api'

function fetch (option) {
  let params = {
    baseURL: APIBaseUrl
  }
  if (Object.prototype.toString.call(option) === '[object String]') {
    params.url = option
    params.method = 'GET'
  } else {
    params = Object.assign(params, option)
    if ((option.method).toUpperCase() === 'GET') {
      params.params = params.data
      delete params.data
    }
  }
  return axios(params).then(res => {
    if (res.data) {
      return {
        data: res.data,
        headers: res.headers
      }
    }
    return Promise.reject(new Error('No response data.'))
  })
}

export default fetch
