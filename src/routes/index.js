/**
 * 应用路由入口文件
 * @name 路由入口文件
 * @kind file
 * @copyright src/routes/index.js 2017/12/14
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogHeader from 'components/Header/';
import RouterBar from 'components/RouterBar/';
import CopyRight from 'components/CopyRight/';
import Launch from 'components/Launch/';
import Layout from 'containers/Layout/';
import Home from './Home/';
import About from './About/';
import { history } from 'store/';
import AsyncComponent from 'helper/AsyncComponent';
import { actions as AppActions } from 'store/appFlux';
import { setPostId } from './Article/flux';

const Topics = AsyncComponent(() =>
  import(/* webpackChunkName: "topics" */ './Topics/')
);
const Article = AsyncComponent(() =>
  import(/* webpackChunkName: "article" */ './Article/')
);

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: theme.palette.background.default
  },
  routerBar: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    }
  },
  wrap: {
    padding: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 1
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 1
    }
  },
  content: {}
});

/**
 * 应用路由组件
 * @class Routes
 * @kind class
 * @extends Component
 * @see src/routes/index.js
 */
class Routes extends Component {
  componentDidMount () {
    const { pathname } = history.location;
    let results = pathname.match(/\/posts\/(\d+)\//) || [];
    let param = {};

    if (results[1]) {
      param.id = results[1];
      this.props.setPostId(results[1]);
    }
    this.props.requestPostList(param);
  }
  render () {
    const { classes, toggleMobileSideBar } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Launch className={classes.root}>
          <BlogHeader toggleMobileSideBar={toggleMobileSideBar} />
          <div className={classes.wrap}>
            <RouterBar classes={{
              container: classes.routerBar
            }} />
            <div className={classes.content}>
              <Layout>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/page/:id/' component={Home} />
                  <Route exact path='/posts/:postId/' component={Article} />
                  <Route path='/about/' component={About} />
                  <Route path='/topics/' component={Topics} />
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
    setPostId: setPostId
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Routes));
