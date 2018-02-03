import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { actions } from './flux';
import CategoryList from 'components/CategoryList/';

class CategoryListContainer extends Component {
  componentDidMount () {
    const { categorySlugMap, match } = this.props;
    const { cslug, subslug } = match.params;
    if (subslug) {
      this.props.requestPostList({
        categories: categorySlugMap[subslug].id
      });
    } else if (cslug) {
      this.props.requestPostList({
        categories: categorySlugMap[cslug].id
      });
    } else {
      this.props.requestPostList();
    }

    this.initPosition();
  }

  render () {
    const { ids, posts, match, fetching } = this.props;
    const { subslug } = match.params;

    return <div className={'category-content'}>
      {this.renderCategoryList()}
      {this.renderChildCategoryList()}
      <CategoryList ids={ids} posts={posts} fetching={fetching} subslug={subslug} />
    </div>;
  }

  renderCategoryList () {
    const { categories: list } = this.props;
    if (!list || !list.length) {
      return null;
    }
    return <ul className={'category-list'}>
      <li className={'category-item'} key={'category'}>
        <NavLink exact activeClassName={'active-link'} to={'/category/'}>
          {'全部'}
        </NavLink>
      </li>
      {list.map(item => {
        return <li key={item.id} className={'category-item'}>
          <NavLink activeClassName={'active-link'} to={item.link}>
            {item.label}
          </NavLink>
        </li>;
      })}
    </ul>;
  }

  renderChildCategoryList () {
    const { categories, categorySlugMap, indexes, match } = this.props;
    const { cslug } = match.params;

    if (cslug) {
      let id = categorySlugMap[cslug] && categorySlugMap[cslug].id;
      let index = indexes[id] && indexes[id][0];
      let data = categories[index] && categories[index].children;
      if (!data) {
        return null;
      }
      return <ul className={'secondary-category-list'}>
        {data.map(item => {
          return <li key={item.id} className={'secondary-category-item'}>
            <NavLink activeClassName={'active-link'} to={item.link}>
              {item.label}
            </NavLink>
          </li>;
        })}
      </ul>;
    }
    return null;
  }

  initPosition () {
    let activeLink = document.querySelector('.category-list a.active-link');
    if (activeLink) {
      let item = activeLink.parentNode || activeLink.parentElement;
      let itemWidth = item.clientWidth;
      let offsetLeft = item.offsetLeft;
      let list = document.querySelector('.category-list');
      let clientWidth = list.clientWidth;
      list.scrollTo(offsetLeft - clientWidth + itemWidth, 0);
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
  fetching: state.categoryList.fetching,
  ids: state.categoryList.ids,
  posts: state.categoryList.posts
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    requestPostList: actions.requestPostList
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer));
