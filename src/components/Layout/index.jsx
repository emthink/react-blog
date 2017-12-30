import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Grid } from 'material-ui'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 15
  },
  container: {
    background: '#ffffff'
  }
})

function Layout (props) {
  const { classes } = props
  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}>
        <div className={classes.container}>
          {props.children}
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={3}>
        暂时未开放，敬请期待
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Layout)
