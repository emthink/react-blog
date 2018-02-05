/**
 * 格式化文章信息DataAdapter
 * @see see src/routes/Article/dataAdapter.js
 * @author codingplayboy
 */
import moment from 'moment';

/**
 * 格式化文章信息
 * @param {object} post
 */
export const formatPostData = (post = {}) => {
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
};
