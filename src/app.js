/**
 * @name app.js
 * @desc 项目入口文件
 * @author codingplayboy
 * @date 2017/12/14
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/main'

// 渲染根组件
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
