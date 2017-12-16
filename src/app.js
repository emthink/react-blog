/**
 * @name app.js
 * @desc 项目入口文件
 * @author codingplayboy
 * @date 2017/12/14
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'material-ui'

/**
 * 项目根组件
 * @extends Component
 * {@link Component}
 */
class App extends Component {
  render () {
    return (
      <div>
        <Button>Blog</Button>
      </div>
    )
  }
}

// 渲染根组件
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
