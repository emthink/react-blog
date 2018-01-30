/**
 * 分类页面
 * @see src/routes/Category/index.js
 * @author codingplayboy
 * @date 2018/01/25
 */
import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Category from 'components/Category/';
import CategoryList from 'containers/CategoryList/';
import 'styles/category.scss';

class CategoryContainer extends Component {
  componentDidMount () {}

  render () {
    const { match, categories, categoryList, categoryIndexes, categorySlugMap } = this.props;

    return <div className={'category-page'}>
      <Route path='/category/' component={props => <Category length={Object.keys(categories).length} />} />
      <Route path={`${match.url}/:cslug?/:subslug?/`} component={props =>
        <CategoryList categorySlugMap={categorySlugMap} categories={categoryList} indexes={categoryIndexes} />} />
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
  categories: state.app.categories,
  categorySlugMap: state.app.categorySlugMap,
  categoryList: state.app.categoryList,
  categoryIndexes: state.app.categoryIndexes
});

CategoryContainer.defaultProps = {
  categories: {}
};

export default connect(mapStateToProps)(CategoryContainer);
