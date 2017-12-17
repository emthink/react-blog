/**
 * @name main.js
 * @desc 项目根组件文件
 */
import React, { Component } from 'react'
import { Button } from 'material-ui'

/**
 * 项目根组件
 * @class App
 * @extends Component
 */
class App extends Component {
  constructor (...arg) {
    super(...arg)
  }

  render () {
    return (
      <div>
        <Button>
          Blog
        </Button>
      </div>
    )
  }
}

export default App
