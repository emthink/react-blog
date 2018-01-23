/**
 * 页面公用顶部栏容器组件
 * @see src/containers/Header/index.js
 * @author codingplayboy
 */
import React, { Component } from 'react';
import Header from 'components/Header/';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  render () {
    const { categories, postNavs, toggleMobileSideBar } = this.props;
    return <Header toggleMobileSideBar={toggleMobileSideBar}
      postNavs={postNavs} categories={categories} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.app.categories,
  postNavs: state.app.postNavs
});

export default connect(mapStateToProps)(HeaderContainer);
