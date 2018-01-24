/**
 * 页面路由导航工具条
 * @see src/components/PageBar/index.jsx
 * @author codingplayboy
 * @date 2018/01/17
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Hidden, Menu } from 'material-ui';
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import MoreHorizIcon from 'material-ui-icons/MoreHoriz';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import GithubIcon from 'styles/imgs/icons-github.png';

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
const MorePageConfig = [{
  label: '标签',
  key: 'tag',
  link: '/tag/'
}, {
  label: '资源',
  key: 'resource',
  link: '/resource/'
}, {
  label: '读书',
  key: 'read',
  link: '/read/'
}, {
  label: '',
  key: 'github',
  link: 'https://www.github.com/codingplayboy/',
  icon: GithubIcon
}];

class PageBar extends Component {
  state = {
    activeEle: null,
    activeNav: '',
    activeClass: 'active-link'
  }

  render () {
    const { activeNav, activeClass, activeEle } = this.state;
    const { pages, morePages } = this.props;
    return (
      <div className={'pagebar-wrap'}>
        {pages.map(page => {
          return <Button key={page.key} exact={page.exact} color='inherit'
            activeClassName={activeClass} className={`pagebar-item ${activeNav === page.link ? 'active-link' : ''}`}
            component={NavLink} to={page.link}
            onClick={this.handleNavClick}>
            {page.label}
          </Button>;
        })}
        <Hidden only={['xs', 'sm']}>
          <IconButton onClick={this.handleMorePageCLick}>
            <MoreHorizIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={this.handleMorePageCLick}>
            <MoreVertIcon />
          </IconButton>
          {/* <Button onClick={this.handleMorePageCLick} component={MoreVertIcon} /> */}
        </Hidden>
        <ClickAwayListener onClickAway={this.handleMorePageMenuClose}>
          <Menu role='menu' anchorEl={activeEle} open={Boolean(activeEle)}
            onClose={this.handleMorePageMenuClose}>
            {morePages.map(page => {
              return <MenuItem key={page.key} style={{justifyContent: 'center'}}>
                <NavLink onClick={this.handleMorePageMenuClose}
                  to={page.link}>
                  {page.icon && <img className={`pagebar-icon ${page.class || ''}`} src={page.icon} />}
                  {page.label || page.title}
                </NavLink>
              </MenuItem>;
            })}
          </Menu>
        </ClickAwayListener>
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

  handleMorePageCLick = (event) => {
    let target = event.currentTarget;
    this.setState(prevState => ({
      activeEle: target
    }));
  }

  handleMorePageMenuClose = () => {
    this.setState(prevState => ({
      activeEle: null
    }));
  }
}

PageBar.defaultProps = {
  pages: PageConfig,
  morePages: MorePageConfig
};

export default PageBar;
