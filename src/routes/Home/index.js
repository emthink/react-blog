/**
 * 应用首页模块
 * @name 首页主体路由文件
 * @kind file
 * @copyright src/routes/Home/index.js 2017/12/19
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Posts from 'components/Posts/';
import Pagination from 'components/Pagination/';
import { pushRoute, replaceRoute } from 'store/';
import { actions as AppActions } from 'store/appFlux';

/**
 * 首页主体容器组件
 * @class Home
 * @extends Component
 * @see src/routes/Home/index.js
 */
class Home extends Component {
  constructor (...arg) {
    super(...arg);

    this.state = {
      posts: [],
      startPage: 1,
      page: parseInt(this.props.page || 0, 10) || 1,
      pageSize: 10,
      totalPages: 0,
      total: 0
    };

    this.handlePageBack = this.handlePageBack.bind(this);
    this.handlePageNext = this.handlePageNext.bind(this);
  }

  componentDidMount () {
    if (!this.props.willAutoFetchPosts) {
      this.fetchPosts();
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const { page } = this.props;
    const { pageSize } = this.state;

    if (nextProps.page !== page || nextState.pageSize !== pageSize) {
      this.fetchPosts({
        page: nextProps.page
      });
    }
  }

  render () {
    const { fetching, ids, page, posts, total, totalPages, categories } = this.props;
    const { pageSize, startPage } = this.state;

    return (
      <div>
        <Posts
          categories={categories}
          fetching={fetching}
          ids={ids}
          posts={posts}
          pageSize={pageSize} />
        <Pagination
          total={total}
          totalPages={totalPages}
          page={page}
          pageSize={pageSize}
          startPage={startPage}
          handlePageBack={this.handlePageBack}
          handlePageNext={this.handlePageNext} />
      </div>
    );
  }

  handlePageNext () {
    const { page } = this.props;
    this.props.push({
      pathname: `/page/${page + 1}/`,
      state: {
        page: page + 1
      }
    });
  // this.setState((prevState) => {
  //   return {
  //     page: prevState.page + 1
  //   }
  // })
  }

  handlePageBack () {
    const { page } = this.props;
    if (page === 2) {
      this.props.push({
        pathname: '/',
        state: {
          id: 1
        }
      });
    } else {
      this.props.push({
        pathname: `/page/${page - 1}/`,
        state: {
          page: page - 1
        }
      });
    }
  }

  fetchPosts (data) {
    const { page } = data || this.props;
    this.props.requestPostList({
      page: page,
      per_page: this.state.pageSize
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    willAutoFetchPosts: state.home.willAutoFetchPosts,
    page: parseInt(ownProps.match.params.page || 1, 10),
    fetching: state.app.fetching,
    ids: state.app.posts.ids,
    posts: state.app.posts.data,
    total: state.app.posts.total,
    totalPages: state.app.posts.totalPages,
    categories: state.app.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestPostList: AppActions.requestPostList,
    push: pushRoute,
    replace: replaceRoute
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
