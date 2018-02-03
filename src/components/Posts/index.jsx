import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
// import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader';
import { CircularProgress } from 'material-ui/Progress';
import Post from '../Post/';

const styles = theme => ({
  root: {
    height: 'auto',
    minHeight: 600,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 0,
    paddingBottom: 20,
    background: theme.palette.background.paper
  },
  splitLine: {
    width: '100%',
    height: 1,
    position: 'relative',
    top: -1,
    marginBottom: 5,
    borderBottom: '1px solid rgba(204, 204, 204, 0.6)'
  },
  subHeader: {
    color: theme.palette.common.darkBlack,
    borderBottom: '1px solid #ff5e52'
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
  }
});

function Posts (props) {
  const { classes, fetching, ids, posts, categories, subHeaderTitle } = props;

  const getCategories = (categories, ids = []) => {
    return ids.map(item => {
      let category = categories[item];
      return {
        id: category.id,
        name: category.name,
        link: category.link
      };
    });
  };

  const renderPosts = () => {
    if (fetching) {
      return <CircularProgress color='secondary' />;
    }

    if (ids && ids.length) {
      return ids.map(id => (
        <Grid key={posts[id].id} item className={classes.postWrap}>
          <Post categories={getCategories(categories, posts[id].categories)} post={posts[id]} />
        </Grid>
      ));
    }
  };

  return (
    <div className={classes.root}>
      <Subheader className={classes.subHeader} component='div'>{subHeaderTitle}</Subheader>
      <div className={classes.splitLine} />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={16}>
            {renderPosts()}
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
  );
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
  subHeaderTitle: PropTypes.string
};

Posts.defaultProps = {
  subHeaderTitle: '最新动态'
};

export default withStyles(styles)(Posts);
