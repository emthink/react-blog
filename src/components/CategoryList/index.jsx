import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

class CategoryList extends Component {
  render () {
    const { subslug } = this.props;
    return <div className={'post-list-wrap'}>
      <ul className={`post-list ${subslug ? 'subslug-padding' : ''}`}>
        {this.renderPostList()}
      </ul>
    </div>;
  }

  renderPostList () {
    const { ids, posts, fetching } = this.props;

    if (fetching) {
      return <div className={'load-progress-wrap'}>
        <CircularProgress color='secondary' />
      </div>;
    }

    return ids.map(id => {
      let post = posts[id];
      return <li className={'post-item'} key={post.id}>
        <NavLink className={'post-item-nav'}
          to={`/posts/${post.id}/`}>
          <p className={'item post-item-date'}>{post.date.split(' ')[0]}</p>
          <h3 className={'item post-item-title'}>{post.title}</h3>
        </NavLink>
      </li>;
    });
  }
}

export default CategoryList;
