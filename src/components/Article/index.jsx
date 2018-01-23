import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { FolderOpen, LabelOutline } from 'material-ui-icons';
import { CircularProgress } from 'material-ui/Progress';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight';

const sourceTypes = {
  markdown: 'markdown'
};
const sourceTypeKey = 'sourceType';

const styles = theme => ({
  root: {
    width: '100%',
    lineHeight: 1.6,
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  articleContainer: {
    width: '100%',
    padding: 10,
    maxWidth: 700,
    boxSizing: 'border-box',
    '-webkitBoxSizing': 'border-box',
    backgroundColor: 'rgba(250, 250, 250, 0.4)',
    [theme.breakpoints.up('sm')]: {
      padding: 20
    }
  }
});

class Article extends Component {
  componentDidMount () {
    if (this.props.post.content) {
      this.initHighlight();
    }
  }

  componentDidUpdate () {
    if (this.props.post.content) {
      this.initHighlight()
    }
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} article markdown-wrap`}>
        {this.renderPost()}
      </div>
    );
  }

  renderPost () {
    const { classes, post, meta, categories } = this.props;

    const renderContent = () => {
      const { post } = this.props;
      if (post[sourceTypeKey] === sourceTypes.markdown) {
        return <ReactMarkdown source={post.content} />;
      }
      return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
    };

    if (!post || !post.title) {
      return <CircularProgress color='secondary' />;
    }

    return (
      <div className={classes.container}>
        <div className={`${classes.articleContainer} article-content base-text`}>
          <h1>{post.title}</h1>
          <div className={'article-meta-wrap'}>
            <span className={'article-meta-container'}>
              作者：<span className={'meta-author'}>{meta.author.name}</span>
              <span className={'meta-date'}>{post.date}著</span>
            </span>
          </div>
          {renderContent()}
          <div className={'meta-categories'}><span><FolderOpen className={'category-icon'} />分类: </span>{this.renderCategoriesOrTags(categories, true)}
            <span className={'tag-label'}><LabelOutline className={'tag-icon'} />Tags: </span> {this.renderCategoriesOrTags(meta.tags)}
          </div>
        </div>
      </div>
    );
  }

  renderCategoriesOrTags (arr = [], category = false) {
    return arr.map((data, index) => {
      return (<span className={category ? 'category' : 'tag'} key={data.id}>
        {data.name}{!category && index !== arr.length - 1 && ', '}
      </span>);
    });
  }

  initHighlight () {
    document.querySelectorAll('pre code').forEach((code) => {
      hljs && hljs.highlightBlock(code);
    });
  }
}

Article.defaultProps = {
  post: {}
};

export default withStyles(styles)(Article);
