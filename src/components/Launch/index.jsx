/**
 * 应用启动组件模块
 * @name Launch/index.jsx
 * @file src/components/Layout/index.jsx 2017/12/31
 * @author codingplayboy
 */
import React, { Component } from 'react'
import { Avatar } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { LinearProgress } from 'material-ui/Progress'

const styles = theme => ({
  wrap: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  avatar: {
    backgroundColor: 'red'
  },
  titleWrap: {
    position: 'relative',
    left: 0,
    top: 0,
    marginTop: 30,
    height: 26,
    overflowX: 'hidden',
    textAlign: 'center'
  },
  transitionDiv: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundColor: '#ffffff',
    transition: 'all 1.5s linear',
    '-webkitTransition': 'all 1.5s ease-out'
  },
  fadeIn: {
    opacity: 0,
    left: 300
  }
})

/**
 * 应用启动加载组件
 * @class Launch
 * @extends Component
 */
class Launch extends Component {
  constructor (...arg) {
    super(...arg)
    this.state = {
      isLaunch: false,
      complete: 0,
      buffer: 10
    }
  }

  timer = null

  componentDidMount () {
    this.timer = setInterval(() => {
      this.progress()
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div>
        {this.renderLaunchScreen()}
      </div>
    )
  }

  renderLaunchScreen () {
    const { children, classes } = this.props
    const { isLaunch, complete, buffer } = this.state
    if (isLaunch) {
      return children
    }
    return (
      <div className={classes.wrap}>
        <LinearProgress mode='buffer' value={complete} color='accent'
          valueBuffer={buffer} className={classes.progress} />
        <Avatar className={classes.avatar}>X</Avatar>
        <div className={classes.titleWrap}>
          <h2>每天进步一点点</h2>
          <div className={`${classes.transitionDiv} ${complete > 0 ? classes.fadeIn : ''}`} />
        </div>
      </div>
    )
  }

  progress = () => {
    const { complete } = this.state
    if (complete >= 100) {
      clearInterval(this.timer)
      this.setState(prevState => ({
        isLaunch: true
      }))
    } else {
      const diff = Math.random() * 10
      const diff2 = Math.random() * 10
      this.setState(prevState => ({ complete: complete + diff, buffer: complete + diff + diff2 }))
    }
  };
}

export default withStyles(styles)(Launch)
