import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import BlogAppBar from '../AppBar/'

const BlogHeader = (props) => {
  return (
    <BlogAppBar title={'熊建刚的博客'} toggleMobileSideBar={props.toggleMobileSideBar}>
      <Button color='inherit' component={Link} to='/'>
        Home
      </Button>
      <Button color='inherit' component={Link} to='/about'>
        About
      </Button>
      <Button color='inherit' component={Link} to='/topics'>
        Topics
      </Button>
    </BlogAppBar>
  )
}

export default BlogHeader
