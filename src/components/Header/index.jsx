/**
 * 网站公用顶部栏
 * @see src/components/Header/index.jsx
 * @author codingplayboy
 * @date 2018/01/13
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import BlogAppBar from '../AppBar/';

// const PostNavs = [{
//   label: '',
//   title: 'HTML',
//   key: 'html',
//   icon: HTMLIcon,
//   link: '/category/html/',
//   children: [{
//     label: 'HTML5',
//     key: 'html5',
//     link: '/category/html/html5/'
//   }]
// }, {
//   label: '',
//   title: 'CSS',
//   key: 'css',
//   icon: CSSIcon,
//   link: '/category/css/',
//   children: [{
//     label: 'CSS3',
//     key: 'css3',
//     link: '/category/css/css3/'
//   }]
// }, {
//   label: '',
//   title: 'JavaScript',
//   icon: JSIcon,
//   key: 'javascript',
//   link: '/category/javascript/'
// }, {
//   label: '',
//   title: '移动开发',
//   class: 'small',
//   key: 'mobile',
//   icon: MobileIcon,
//   link: '/category/mobile/',
//   children: [{
//     label: 'React Native',
//     key: 'react-native',
//     link: '/category/mobile/react-native/'
//   }]
// }, {
//   label: '',
//   title: 'Git/SVN',
//   class: 'small',
//   key: 'git-svn',
//   icon: GitIcon,
//   link: '/category/gitsvn/'
// }, {
//   label: 'SPA',
//   title: '单页应用',
//   key: 'spa',
//   link: '/category/spa/'
// }];

const BlogHeader = (props) => {
  return (
    <BlogAppBar title={'学而后知'} postNavs={props.postNavs} toggleMobileSideBar={props.toggleMobileSideBar}>
      <Button color='inherit' component={Link} to='/'>
        Home
      </Button>
      <Button color='inherit' component={Link} to='/about'>
        About
      </Button>
      <Button color='inherit' component={Link} to='/topics'>
        Topics
      </Button>
    </BlogAppBar>
  );
};

export default BlogHeader;
