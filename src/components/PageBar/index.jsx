import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'material-ui';

const PageConfig = [
  {
    label: '首页',
    key: 'home',
    link: '/',
    exact: true
  }, {
    label: '归档',
    key: 'archive',
    link: '/archive/'
  }, {
    label: '分类',
    key: 'categories',
    link: '/categories/'
  }, {
    label: '关于',
    key: 'about',
    link: '/about/'
  }
];

class PageBar extends Component {
  render () {
    return (
      <div className={'pagebar-wrap'}>
        {this.props.pages.map(page => {
          return <Button key={page.key} exact={page.exact} className={'pagebar-item'} color='inherit'
            activeClassName={'active-link'} component={NavLink} to={page.link}>
            {page.label}
          </Button>;
        })}
      </div>
    );
  }
}

PageBar.defaultProps = {
  pages: PageConfig
};

export default PageBar;
