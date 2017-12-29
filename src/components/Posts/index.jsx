import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Grid } from 'material-ui'
// import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import Post from '../Post/'

const styles = theme => ({
  root: {
    height: 'auto',
    minHeight: 600,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: '0 2px',
    paddingBottom: 20,
    background: theme.palette.background.paper
  },
  subHeader: {
    marginBottom: 3,
    color: theme.palette.common.darkBlack
  },
  container: {
    flexGrow: 1,
    flexWrap: 'wrap'
  },
  gridList: {
    width: '100%'
  },
  gridListItem: {
    maxHeight: 300
  },
  postWrap: {
    width: '100%',
    // [theme.breakpoints.between('sm', 'md')]: {
    //   width: 'auto',
    //   maxWidth: 400
    // },
    [theme.breakpoints.between('md', 'lg')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 420
    }
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})

function TitlebarGridList (props) {
  const { classes, ids, posts } = props

  return (
    <div className={classes.root}>
      <Subheader className={classes.subHeader} component='div'>文章列表</Subheader>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={16}>
            {ids.map(id => (
              <Grid key={posts[id].id} item className={classes.postWrap}>
                <Post post={posts[id]} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* <GridList spacing={6} cellHeight={'auto'} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} className={classes.gridListItem}>
            <Post />
          </GridListTile>
        ))}
      </GridList> */}
    </div>
  )
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitlebarGridList)
