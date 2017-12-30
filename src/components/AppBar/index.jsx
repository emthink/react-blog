/**
 * 应用顶部导航栏
 * @author codingplayboy
 * @date 2017/12/23
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Toolbar, Hidden, Typography } from 'material-ui'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import { Menu as MenuIcon, Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon} from 'material-ui-icons'
import { withStyles } from 'material-ui/styles'
// import { ChevronLeftIcon } from 'material-ui-icons/ChevronLeft'
// import ChevronRightIcon from 'material-ui-icons/ChevronRight'

const drawerWidth = 240

const styles = (theme) => {
  return {
    root: {
      width: '100%'
    },
    flex: {
      flex: 1
    },
    appBar: {
    },
    navButton: {
      marginLeft: -12,
      marginRight: 10,
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    searchField: {
      width: 200,
      marginTop: -16,
      color: 'inherit',
      [theme.breakpoints.down('sm')]: {
        width: 100
      }
    },
    hidden: {
      display: 'none'
    },
    inputLabelFocused: {
      marginTop: 5,
      color: theme.palette.common.lightWhite,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    inputInkbar: {
      '&:after': {
        backgroundColor: theme.palette.common.lightWhite
      }
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      width: drawerWidth,
      top: 56,
      [theme.breakpoints.up('sm')]: {
        top: 64
      }
    }
  }
}

class BlogAppBar extends Component {
  constructor (...arg) {
    super(...arg)

    this.state = {
      isMobileSideBarShow: false
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  render () {
    const { classes, theme, title } = this.props
    const { isMobileSideBarShow } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='fixed' color='primary' className={{[classes.appBar]: isMobileSideBarShow}}>
          <Toolbar>
            <IconButton className={classes.navButton} color='contrast'
              aria-label='open Nav' onClick={this.handleDrawerToggle}>
              {isMobileSideBarShow ? <CloseIcon /> : <MenuIcon /> }
            </IconButton>
            <Typography component={Link} to='/' type='title' color='inherit'>
              {title}
            </Typography>
            <div color='inherit' className={classes.flex}>
              <Hidden mdDown implementation='css'>
                {this.props.children}
              </Hidden>
            </div>
            <FormControl className={classes.searchField}>
              <InputLabel
                FormControlClasses={{
                  focused: classes.inputLabelFocused
                }}
                htmlFor='custom-color-input'
              >
                搜索
              </InputLabel>
              <Input
                classes={{
                  inkbar: classes.inputInkbar
                }}
                id='custom-color-input'
              />
            </FormControl>
            {/* <TextField
              id='search'
              label='搜索'
              type='search'
              className={classes.searchField}
            /> */}
            {/* <Button color='contrast'>Login</Button> */}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            type='persistent'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={isMobileSideBarShow}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            className={classes.sideNavZIndex}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerToggle}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            {this.props.children}
          </Drawer>
        </Hidden>
      </div>
    )
  }

  handleDrawerToggle () {
    this.setState((prevState) => ({
      isMobileSideBarShow: !prevState.isMobileSideBarShow
    }), () => {
      this.props.toggleMobileSideBar({
        isMobileSideBarShow: this.state.isMobileSideBarShow
      })
    })
  }
}

BlogAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(BlogAppBar)
