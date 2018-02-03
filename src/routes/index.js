/**
 * 应用路由入口文件
 * @name 路由入口文件
 * @kind file
 * @copyright src/routes/index.js 2017/12/14
 * @author codingplayboy
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogHeader from 'containers/Header/';
// import RouterBar from 'components/RouterBar/';
import CopyRight from 'components/CopyRight/';
import Launch from 'components/Launch/';
import Layout from 'containers/Layout/';
import Home from './Home/';
import About from './About/';
import { history } from 'store/';
import AsyncComponent from 'helper/AsyncComponent';
import { actions as AppActions } from 'store/appFlux';
import { setPostId } from './Article/flux';

export const isArticlePage = (path) => {
  const results = path.match(/\/posts\/(\d+)\/?$/) || [];
  const results2 = path.match(/\/\d{4}\/\d{1,2}\/(\d+)\/.+\/?$/) || [];
  return !!results[1] || !!results2[1];
};

const Article = AsyncComponent(() =>
  import(/* webpackChunkName: "article" */ './Article/'), {
  key: 'article'
});

const Category = AsyncComponent(() =>
  import(/* webpackChunkName: "category" */ './Category/'), {
  key: 'category'
});

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: theme.palette.background.default
  },
  wrap: {
    padding: theme.spacing.unit * 1,
    paddingTop: 0,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      padding: theme.spacing.unit * 2,
      paddingTop: 0
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 60,
      padding: theme.spacing.unit * 3,
      paddingTop: 0
    }
  },
  content: {
  }
});

/**
 * 应用路由组件
 * @class Routes
 * @kind class
 * @extends Component
 * @see src/routes/index.js
 */
class Routes extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount () {
    const { pathname } = history.location;
    let results = pathname.match(/\/posts\/(\d+)\//) || [];
    let pageRes = pathname.match(/\/page\/(\d+)\//) || [];
    let param = {};

    if (results[1]) {
      param.id = results[1];
      this.props.setPostId(results[1]);
    }
    if (pageRes[1]) {
      param.page = pageRes[1];
    }
    this.props.requestPostList(param);
    this.props.requestCategories();
  }
  render () {
    const { classes, toggleMobileSideBar } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Launch className={classes.root}>
          <BlogHeader toggleMobileSideBar={toggleMobileSideBar} />
          <div className={classes.wrap}>
            {/* <RouterBar classes={{
              container: classes.routerBar
            }} /> */}
            <div className={classes.content}>
              <Layout isArticlePage={isArticlePage}>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/page/:page/' component={Home} />
                  <Route exact path='/posts/:postId/' component={Article} />
                  <Route exact path='/:aYear(\d{4})/:aMonth(\d{1,2})/:aDay(\d{1,2})/:aSlug/' component={Article} />
                  <Route path='/about/' component={About} />
                  <Route path='/category/' component={Category} />
                </Switch>
              </Layout>
            </div>
          </div>
          <CopyRight />
        </Launch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isMobileSideBarShow: state.app.isMobileSideBarShow
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleMobileSideBar: AppActions.toggleMobileSideBar,
    requestPostList: AppActions.requestPostList,
    requestCategories: AppActions.requestCategories,
    setPostId: setPostId
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Routes));
