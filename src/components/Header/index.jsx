import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import BlogAppBar from '../AppBar/'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  right: {
    textAlign: 'left'
  },
  nav: {
  }
})

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

export default withStyles(styles)(BlogHeader)
