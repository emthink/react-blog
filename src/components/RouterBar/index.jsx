import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'

const styles = (theme) => ({
  container: {},
  gridItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  router: {
    minWidth: 'unset',
    margin: 0,
    padding: '0 5px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary
  },
  activeRouter: {
    color: blue[500]
  },
  text: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class RouterBar extends Component {
  render () {
    const { classes } = this.props
    return (
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={12} style={{paddingTop: 0, paddingBottom: 0}}>
          <div className={classes.wrapper}>
            <Button color='primary' className={classes.router}
              component={Link} to='/'>
              Home
            </Button>
            <Button className={[classes.router, classes.text]}>/</Button>
            <Button color='primary' className={[classes.router, classes.activeRouter]}
              component={Link} to='/topics'>
              Posts
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(RouterBar)
