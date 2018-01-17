/**
 * 文章正文路由文件
 * @name Article/index.js
 * @copyright src/routes/Article/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch, API } from 'api/';
import 'styles/article.scss';
import Article from 'components/Article/';
import ArticleReducer, { setPostId, requestPost, ArticleSaga } from './flux';

/**
 * 文章正文容器组件
 * @class ArticleContainer
 * @extends Component
 * @see src/routes/Article/index.js
 */
class ArticleContainer extends Component {
  state = {
    meta: {
      author: {
        name: null
      },
      categories: [],
      tags: []
    }
  }

  componentDidMount () {
    const { post, id } = this.props;
    if (!post || !post.id || id !== post.id) {
      this.props.requestPost({
        id: id
      });
    }
    if (id && id !== post.id) {
      this.props.setPostId(id);
    }
    this.initArticleMeta();
  }

  componentWillReceiveProps (nextProps) {
    const { id } = nextProps.post || {};
    if (id && id !== this.props.post.id) {
      this.props.setPostId(id);
      this.initArticleMeta(nextProps.post);
    }
  }

  render () {
    const { post } = this.props;
    return (
      <Article post={post} meta={this.state.meta} />
    );
  }

  initArticleMeta (data = {}) {
    const { post } = this.props;
    let authorId = data.authorId || post.authorId;
    let categories = data.categories || post.categories || [];
    let tags = data.tags || post.tags || [];

    if (!authorId) {
      return;
    }
    fetch({
      ...API.getUser,
      slotParams: {
        id: authorId
      }
    }).then(res => {
      if (res && res.data) {
        this.setState(prevState => ({
          meta: Object.assign({}, prevState.meta, {
            author: res.data
          })
        }));
      }
    });
    if (categories.length) {
      fetch({
        ...API.getCategories,
        data: {
          include: categories.join(',')
        }
      }).then(res => {
        if (res && res.data) {
          this.setState(prevState => ({
            meta: Object.assign({}, prevState.meta, {
              categories: res.data
            })
          }));
        }
      });
    }
    if (tags.length) {
      fetch({
        ...API.getTags,
        data: {
          include: tags.join(',')
        }
      }).then(res => {
        if (res && res.data) {
          this.setState(prevState => ({
            meta: Object.assign({}, prevState.meta, {
              tags: res.data
            })
          }));
        }
      });
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ids = [], data } = state.app.posts;
  let { postId } = ownProps.match.params;
  postId = parseInt(postId || 0, 10);

  return {
    id: postId || '',
    post: (ids.indexOf(postId) >= 0 && data[postId]) || state.article.post
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPostId: setPostId,
    requestPost: requestPost
  }, dispatch);
};

ArticleContainer.defaultProps = {
  post: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
export const sagas = [ArticleSaga];
export const reducer = ArticleReducer;
