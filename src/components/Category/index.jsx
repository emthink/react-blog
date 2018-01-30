import React, { Component } from 'react';

class Category extends Component {
  componentDidMount () {
  }
  render () {
    return <div className={'category-page-header'}>
      <h2>分类</h2>
      <p className={'category-desc'}>共有{this.props.length}个分类。</p>
    </div>;
  }
}

export default Category;
