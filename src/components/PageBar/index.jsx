/**
 * 页面路由导航工具条
 * @see src/components/PageBar/index.jsx
 * @author codingplayboy
 * @date 2018/01/17
 */
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
    link: '/archive/',
    exact: true
  }, {
    label: '分类',
    key: 'category',
    link: '/category/'
  }, {
    label: '关于',
    key: 'about',
    link: '/about/'
  }
];

class PageBar extends Component {
  state = {
    activeNav: '',
    activeClass: 'active-link'
  }

  render () {
    const { activeNav, activeClass } = this.state;
    return (
      <div className={'pagebar-wrap'}>
        {this.props.pages.map(page => {
          return <Button key={page.key} exact={page.exact} color='inherit'
            activeClassName={activeClass} className={`pagebar-item ${activeNav === page.link ? 'active-link' : ''}`}
            component={NavLink} to={page.link}
            onClick={this.handleNavClick}>
            {page.label}
          </Button>;
        })}
      </div>
    );
  }

  handleNavClick = (event) => {
    let activeNav = event.currentTarget.getAttribute('href');
    this.setState(prevState => ({
      activeNav: activeNav,
      activeClass: ''
    }));
  }
}

PageBar.defaultProps = {
  pages: PageConfig
};

export default PageBar;
