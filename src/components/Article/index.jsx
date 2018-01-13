import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight'

const sourceTypes = {
  markdown: 'markdown'
}
const sourceTypeKey = 'sourceType'

const styles = theme => ({
  root: {
    width: '100%',
    lineHeight: 1.6,
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  articleContainer: {
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
});

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
    const { classes } = this.props
    return (
      <div className={`${classes.root} article markdown-wrap`}>
        {this.renderPost()}
      </div>
    )
  }

  renderPost () {
    const { classes, post } = this.props

    const renderContent = () => {
      const { post } = this.props
      if (post[sourceTypeKey] === sourceTypes.markdown) {
        return <ReactMarkdown source={post.content} />
      }
      return <div dangerouslySetInnerHTML={{ __html: post.content }} />
    }

    if (!post || !post.title) {
      return <CircularProgress color='accent' />
    }

    return (
      <div className={classes.container}>
        <div className={`${classes.articleContainer} article-content base-text`}>
          <h1>{post.title}</h1>
          {renderContent()}
        </div>
      </div>
    )
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
