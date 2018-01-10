/**
 * 文章正文路由文件
 * @name Article/index.js
 * @copyright src/routes/Article/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'styles/highlight.scss'
import 'styles/markdown.scss'
import Article from 'components/Article/'

/**
 * 文章正文容器组件
 * @class ArticleContainer
 * @extends Component
 * @see src/routes/Article/index.js
 */
class ArticleContainer extends Component {
  componentDidMount () {
    const { post } = this.props
    if (!post || !post.title) {
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
  const { id } = ownProps.match.params

  return {
    post: (ids.indexOf(id) && data[id])
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
