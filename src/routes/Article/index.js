/**
 * 文章正文路由文件
 * @name Article/index.js
 * @copyright src/routes/Article/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'styles/markdown.scss'
import 'styles/highlight.scss'
import 'styles/toc.scss'
import Article from 'components/Article/'
import ArticleReducer, { setPostId, requestPost, ArticleSaga } from './flux'

/**
 * 文章正文容器组件
 * @class ArticleContainer
 * @extends Component
 * @see src/routes/Article/index.js
 */
class ArticleContainer extends Component {
  componentDidMount () {
    const { post, id } = this.props
    if (!post || !post.id) {
      this.props.requestPost({
        id: id
      })
    }
    if (post && post.id) {
      this.props.setPostId(post.id)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { id } = nextProps.post || {}
    if (id && id !== this.props.post.id) {
      this.props.setPostId(id)
    }
  }

  render () {
    const { post } = this.props
    return (
      <Article post={post} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ids = [], data } = state.app.posts
  const { postId } = ownProps.match.params

  return {
    id: parseInt(postId || 0, 10) || '',
    post: (ids.indexOf(postId) >= 0 && data[postId]) || state.article.post
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPostId: setPostId,
    requestPost: requestPost
  }, dispatch)
}

ArticleContainer.defaultProps = {
  post: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
export const sagas = [ArticleSaga]
export const reducer = ArticleReducer
