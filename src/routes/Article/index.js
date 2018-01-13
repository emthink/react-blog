/**
 * 文章正文路由文件
 * @name Article/index.js
 * @copyright src/routes/Article/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'styles/markdown.scss';
import 'styles/highlight.scss';
import 'styles/toc.scss';
import Article from 'components/Article/';
import { setPostId } from './flux';

/**
 * 文章正文容器组件
 * @class ArticleContainer
 * @extends Component
 * @see src/routes/Article/index.js
 */
class ArticleContainer extends Component {
  componentDidMount () {
    const { post } = this.props;
    if (post && post.id) {
      this.props.setPostId(post.id);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { id } = nextProps.post || {};
    if (id && id !== this.props.post.id) {
      this.props.setPostId(id);
    }
  }

  render () {
    const { post } = this.props;
    return (
      <Article post={post} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ids = [], data } = state.app.posts;
  const { postId } = ownProps.match.params;

  return {
    post: (ids.indexOf(postId) && data[postId])
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPostId: setPostId
  }, dispatch);
};

ArticleContainer.defaultProps = {
  post: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
