/**
 * 文章目录展示型组件
 * @name index.js
 * @copyright src/components/TOC/index.jsx
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { List } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';

const styles = theme => ({
  root: {
    maxWidth: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    lineHeight: 1.6
  },
  list: {
    paddingTop: 4,
    paddingBottom: 4
  },
  header: {
    paddingLeft: 0,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '400',
    lineHeight: 1.6
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    lineHeight: 1.6
  }
});

class TOC extends Component {
  render () {
    const { toc, classes } = this.props;

    if (!toc || !toc.length) {
      return null;
    }
    return (
      <div className={`${classes.root} article-toc-wrap`}>
        {this.renderTOCList(toc)}
      </div>
    );
  }

  renderTOCList (toc) {
    const { classes, id } = this.props;

    if (!toc || !toc.length) {
      return null;
    }

    const renderItem = item => {
      if (item.children) {
        return this.renderTOCList(item.children);
      }
      return <ListItemText primary={<a href={`#${item.id}`}>toc.textContent</a>} />;
    };

    return <List className={classes.list}>
      {toc.map((item, index) => {
        return <div key={`section-${id}-${item.id || index}`}>
          <ListSubheader className={`${classes.header} toc-header`}>
            <a href={`#${item.id}`}>{item.textContent}</a>
          </ListSubheader>
          {item.children &&
            <ListItem className={`${classes.item} toc-item-wrap`}>
              {renderItem(item)}
            </ListItem>
          }
        </div>;
      })}
    </List>;
  }
}

export default withStyles(styles)(TOC);
