/**
 * 应用底部版权信息
 * @author codingplayboy
 * @date 2017/12/23
 */
import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Grid, Typography } from 'material-ui'

const styles = theme => ({
  container: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: 0,
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.secondary,
    borderTop: '1px solid #eeeeee'
  },
  item: {
    padding: '0 5px'
  },
  text: {
    paddingRight: 3,
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  }
})

const CopyRight = props => {
  const { classes } = props
  return (
    <Grid container justify='center' spacing={0} className={classes.container}>
      <Grid item className={classes.item}>
        <Typography className={classes.text}>
          © 2017 熊建刚的博客
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <Typography>
          <a className={classes.text} href='http://mail.163.com'>Email: codingfun@163.com</a>
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <a className={classes.text} href='http://github.com/codingplayboy'>Github: codingplayboy</a>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(CopyRight)
