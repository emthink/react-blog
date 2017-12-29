/**
 * 项目路由入口文件
 * @file src/routes/index.js
 * @author codingplayboy
 * @date 2017/12/14
 */
import React, { Component } from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { withStyles } from 'material-ui/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BlogHeader from 'components/Header/'
import RouterBar from 'components/RouterBar/'
import CopyRight from 'components/CopyRight/'
import Home from './Home/'
import About from './About/'
import { history } from '../store/'
import AsyncComponent from '../helper/AsyncComponent'
import { actions as AppActions } from '../store/appFlux'

const Topics = AsyncComponent(() =>
  import(/* webpackChunkName: "topics" */ './Topics/')
)
const Article = AsyncComponent(() =>
  import(/* webpackChunkName: "article" */ './Article/')
)

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
      padding: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 3
    }
  },
  content: {}
})

/**
 * 项目路由组件
 * @class Routes
 */
class Routes extends Component {
  componentDidMount () {
    this.props.requestPostList()
  }
  render () {
    const { classes, toggleMobileSideBar } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          <BlogHeader toggleMobileSideBar={toggleMobileSideBar} />
          <div className={classes.wrap}>
            <RouterBar classes={{
              container: classes.routerBar
            }} />
            <div className={classes.content}>
              <Route exact path='/' component={Home} />
              <Route exact path='/posts/:id' component={Article} />
              <Route path='/about' component={About} />
              <Route path='/topics' component={Topics} />
            </div>
          </div>
          <CopyRight />
        </div>
      </ConnectedRouter>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isMobileSideBarShow: state.app.isMobileSideBarShow
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleMobileSideBar: AppActions.toggleMobileSideBar,
    requestPostList: AppActions.requestPostList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Routes))
