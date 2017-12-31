/**
 * 数据适配功能文件
 * @name dataAdapter.js
 * @kind file
 * @copyright src/store/dataAdapter.js 2017/12/28
 * @author codingplayboy
 */
import moment from 'moment'

/**
 * 适配PostList数组
 * @param {array} data postList
 * @return {array} new list of post
 * @see src/store/dataAdapter.js
 */
export const formatPostListData = (data) => {
  let len = data.length
  let result = {
    ids: [],
    data: {}
  }
  if (len > 0) {
    while (len--) {
      let post = data[len]
      result.ids.unshift(post.id)
      Object.assign(result.data, {
        [post.id]: {
          id: post.id,
          title: post.title.rendered,
          date: moment(post.date).format('YYYY-MM-DD HH:mm:ss'),
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          modified: moment(post.modified).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    }
    return result
  }
}
