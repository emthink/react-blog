import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import hljs from 'highlight'

const styles = theme => ({
  root: {
    width: '100%',
    lineHeight: 1.6,
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    padding: 10,
    maxWidth: 700,
    boxSizing: 'border-box',
    '-webkitBoxSizing': 'border-box',
    backgroundColor: 'rgba(250, 250, 250, 0.4)',
    [theme.breakpoints.up('sm')]: {
      padding: 20
    }
  }
})

class Article extends Component {
  componentDidMount () {
    if (this.props.post.content) {
      this.initHighlight()
    }
  }

  componentDidUpdate () {
    if (this.props.post.content) {
      this.initHighlight()
    }
  }

  render () {
    return (
      <div className={`${this.props.classes.root} article markdown-wrap`}>
        {this.renderPost()}
      </div>
    )
  }

  renderPost () {
    const { classes, post } = this.props

    if (!post || !post.title) {
      return <CircularProgress color='accent' />
    }

    return <div className={`${classes.container} base-text`}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  }

  initHighlight () {
    document.querySelectorAll('pre code').forEach((code) => {
      hljs && hljs.highlightBlock(code)
    })
  }
}

Article.defaultProps = {
  post: {}
}

export default withStyles(styles)(Article)
