import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

export default class MenuList extends Component {
  render () {
    const { menu, anchorEle, handleClose, classNames } = this.props;
    return <Menu
      id={'menu-list-box'}
      className='menu-list' PopoverClasses={{ paper: 'menu-list-popover' }}
      anchorEl={anchorEle}
      open={!!anchorEle}
      onClose={handleClose}>
      <MenuItem className={classNames} key={menu.key}>
        <NavLink activeClassName={'active-link'} exact={!0} to={menu.link}>{menu.label || menu.title}</NavLink>
      </MenuItem>;
      {menu.children.map(menu => {
        return <MenuItem className={classNames} key={menu.key}>
          <NavLink activeClassName={'active-link'} to={menu.link}>{menu.label || menu.title}</NavLink>
        </MenuItem>;
      })}
    </Menu>;
  }
}
