/**
 * 文章正文路由文件
 * @name Article/index.js
 * @copyright src/routes/Article/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
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
      tags: []
    }
  }

  componentDidMount () {
    const { post, id, link } = this.props;

    if (!post || !post.id || +id !== +post.id || link !== post.link) {
      if (id) {
        this.props.requestPost({
          id: id
        });
      } else {
        const { aYear, aMonth, aDay, aSlug } = this.props.match.params;
        let dateString = `${aYear}/${aMonth}/${aDay}`;
        this.props.requestPost({
          slug: aSlug,
          before: moment(dateString).endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
          after: moment(dateString).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
        });
      }
    }
    if ((id || link) && post.id) {
      this.props.setPostId(+(id || post.id));
      this.initArticleMeta();
    }
  }

  componentWillReceiveProps (nextProps) {
    const { post } = this.props;
    const { id, link } = nextProps.post || {};
    if ((id && +id !== +post.id) ||
      (link && link !== post.link)) {
      this.props.setPostId(+id);
      this.initArticleMeta(nextProps.post);
    }
  }

  render () {
    const { post, categories } = this.props;
    return (
      <Article categories={this.getCategories(categories, post.categories)} post={post} meta={this.state.meta} />
    );
  }

  getCategories = (categories, ids = []) => {
    return ids.map(item => {
      let category = categories[item];
      return {
        id: category.id,
        name: category.name,
        link: category.link
      };
    });
  };

  initArticleMeta (data = {}) {
    const { post } = this.props;
    let authorId = data.authorId || post.authorId;
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
  let { aYear, aMonth, aDay, aSlug, postId } = ownProps.match.params;
  postId = parseInt(postId || 0, 10);
  let link = ['', aYear, aMonth, aDay, aSlug, ''].join('/');

  return {
    id: postId || '',
    link: link,
    post: (ids.indexOf(postId) >= 0 && data[postId]) || data[link] || state.article.post,
    categories: state.app.categories
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
