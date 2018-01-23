/**
 * 站点文章导航，主要是文章分类导航
 * @see src/components/PostNavBar/index.jsx
 * @author codingplayboy
 * @date 2018/01/19
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'material-ui';
import MenuList from '../MenuList/';

class PostNavBar extends Component {
  state = {
    activeEle: null,
    activeClass: 'active-link',
    menu: []
  };

  componentWillUnmount () {
    document.removeEventListener('click', this.handleMenuClose);
  }

  render () {
    const { postNavs, type } = this.props;
    if (type === 'slide') {
      return this.renderSlideNavs(postNavs);
    }
    return this.renderPostNavs(postNavs);
  }

  renderPostNavs (navs) {
    let menuList = null;
    const { activeEle, menu, activeClass } = this.state;

    // 存在子菜单且展示子菜单
    if (activeEle && menu.children && this.props.isShowMenuList) {
      menuList = <MenuList key={'post-navbar-section-menus'} anchorEle={activeEle}
        classNames={'post-navbar-menu-item'}
        menu={menu} handleClose={this.handleMenuClose} />;
    }
    return [<div key={'post-navbar-section-wrap'} className={'post-navbar-wrap'}>
      {navs.map(nav => {
        return this.renderPostNav(nav);
      })}
    </div>, menuList];
  }

  renderPostNav (nav) {
    const { activeEle, activeClass, activeNav } = this.state;
    if (nav.children && nav.children.length > 0 && this.props.isShowMenuList) {
      return <Button key={nav.key} className={'post-navbar-item'} color='inherit'
        component={'p'} title={nav.title}
        aria-owns={activeEle ? 'menu-list-box' : null}
        aria-haspopup='true'
        onClick={this.handleMenuOpen(nav)}>
        {nav.icon && <img className={`navbar-icon ${nav.class || ''}`} src={nav.icon} />}
        {nav.label}
      </Button>;
    } else {
      return <Button key={nav.key} exact={nav.exact} color='inherit'
        activeClassName={activeClass} className={`post-navbar-item ${activeNav === nav.link ? 'active-link' : ''}`}
        component={NavLink} to={nav.link} title={nav.title}
        aria-owns={activeEle ? 'menu-list-box' : null}
        aria-haspopup='true'
        onClick={this.handleNavClick}>
        {nav.icon && <img className={`navbar-icon ${nav.class || ''}`} src={nav.icon} />}
        {nav.label}
      </Button>;
    }
  }

  renderSlideNavs (list) {
    const { activeClass, activeNav } = this.state;
    if (!list || !list.length) {
      return null;
    }

    const renderItem = item => {
      if (item) {
        return this.renderSlideNavs(item);
      }
      return <Button key={item.key} exact={item.exact} color='inherit'
        activeClassName={activeClass} className={`post-slide-nav-item-child ${activeNav === item.link ? 'active-link' : ''}`}
        component={NavLink} to={item.link} title={item.title}
        onClick={this.handleNavClick}>
        {item.label || item.title}
      </Button>;
    };

    return <ul className={'post-slide-nav-wrap'}>
      {list.map((item, index) => {
        return <li key={`slide-nav-section-${item.id || item.key || index}`} className={'post-slide-nav-item'}>
          <Button key={item.key} exact={typeof item.exact !== 'undefined' ? item.exact : true} color='inherit'
            activeClassName={activeClass} className={`post-slide-nav-item-content ${activeNav === item.link ? 'active-link' : ''}`}
            component={NavLink} to={item.link} title={item.title}
            onClick={this.handleNavClick}>
            {item['label-title'] ? item.title : (item.label || item.title)}
          </Button>
          {item.children && renderItem(item.children)}
        </li>;
      })}
    </ul>;
  }

  handleMenuOpen = (nav = {}) => {
    return (event) => {
      let target = event.currentTarget;
      this.setState(prevState => ({
        activeEle: target,
        menu: nav
      }), () => {
        document.addEventListener('click', this.handleMenuClose);
      });
    };
  }

  handleMenuClose = (event) => {
    if (event.target === document.querySelector('.post-navbar-menu-item')) {
      event.stopPropagation();
      return false;
    }
    this.setState(prevState => ({
      activeEle: null
    }), () => {
      document.removeEventListener('click', this.handleMenuClose);
    });
  }

  handleNavClick = (event) => {
    let activeNav = event.currentTarget.getAttribute('href');
    this.setState(prevState => ({
      activeNav: activeNav,
      activeClass: ''
    }));
  }
}

PostNavBar.defaultProps = {
  postNavs: [],
  type: '',
  // 是否展示MenuList
  isShowMenuList: true
};

export default PostNavBar;
