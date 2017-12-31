import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Article from 'components/Article/'

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
