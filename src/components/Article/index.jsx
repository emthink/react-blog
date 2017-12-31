import React, { Component } from 'react'
import { CircularProgress } from 'material-ui/Progress'

const style = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '100%'
  }
}

class Article extends Component {
  render () {
    return (
      <div style={style.root}>
        {this.renderPost()}
      </div>
    )
  }

  renderPost () {
    const { post } = this.props

    if (!post || !post.title) {
      return <CircularProgress color='accent' />
    }

    return <div style={style.container} dangerouslySetInnerHTML={{__html: post.content}} />
  }
}

export default Article
