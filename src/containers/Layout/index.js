/**
 * 应用主体部分布局模块
 * @name Layout/index.jsx
 * @copyright src/components/Layout/index.jsx
 * @author codingplayboy
 */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
import TOC from 'containers/TOC/';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 5
  },
  container: {
    background: '#ffffff'
  },
  articleToc: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
});

/**
 * 应用主体布局组件
 * @kind function Component
 * @param {*} props
 */
function Layout (props) {
  const { classes } = props;
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
        className={'right-tools'}
        item
        xs={12}
        sm={12}
        md={3}>
        暂时未开放，敬请期待
        <div className={`${classes.articleToc} article-toc`}>
          <TOC />
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Layout);
