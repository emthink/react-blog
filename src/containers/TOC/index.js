/**
 * 生成文章目录容器组件
 * @name index.js
 * @copyright src/containers/TOC/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TOC from 'components/TOC/';
import toc from 'helper/parseTOC';
import { setPostToc } from 'routes/Article/flux';

class TOCContainer extends Component {
  componentDidMount () {
    this.init();
  }

  componentWillUpdate (nextProps) {
    const { id, toc } = this.props;
    if (+nextProps.id !== +id && toc && toc.length) {
      this.props.setPostToc([]);
    }
    this.init(true);
  }

  componentWillUnmout () {
    clearInterval(this.timer);
    this.time = 0;
  }

  render () {
    const { tocOrigin, toc, id, title } = this.props;

    if (!this.isArticlePage() || !title || tocOrigin === 'tocbot') {
      // tocbot插件不需要使用组件渲染
      return null;
    }

    if (tocOrigin === 'auto') {
      return <TOC title={title} id={id} toc={toc} />;
    }
  }

  init (reset) {
    if (this.isArticlePage()) {
      this.time = 0;
      if (reset) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.time = this.time + 1;
        this.initTOC(reset);
      }, 100 + (Math.random() * 10 * 5));
    } else {
      clearInterval(this.timer);
      this.time = 0;
    }
  }

  initTOC (reset) {
    const { tocOrigin } = this.props;

    if (tocOrigin === 'auto') {
      this.tocParser = toc({
        contentSelector: '.article',
        headSelector: 'h2, h3, h4, h5',
        idSelector: 'span'
      });
    }
    this.refreshTOC();
  }

  refreshTOC () {
    const { tocOrigin, toc } = this.props;

    // 限制无限循环
    if (this.time > 150 || (toc && toc.length)) {
      clearInterval(this.timer);
      this.time = 0;
      return;
    }

    // auto自动根据内容生成目录方式
    if (tocOrigin === 'auto') {
      this.props.setPostToc(this.tocParser.getTOC());
    }
  }

  isArticlePage () {
    const results = location.pathname.match(/\/posts\/(\d+)\/?$/) || [];
    return results[1];
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(state.article.id || 0, 10) || '';
  let data = (state.app.posts.data || {})[id] || state.article.post || {};

  return {
    id: id,
    title: data.title,
    toc: state.article.toc
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPostToc: setPostToc
  }, dispatch);
};

TOCContainer.defaultProps = {
  // auto表示根据文章内容生成目录；
  // 后期可拓展支持多种方式生成目录
  tocOrigin: 'auto'
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TOCContainer));
