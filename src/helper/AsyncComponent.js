/**
 * 封装实现按需加载组件的高阶组件
 * @name AsyncComponent.js
 * @copyright src/helper/AsyncComponent 2017/12/19
 * @author codingplayboy
 */
import React, { Component } from 'react'

const AsyncComponent = loadComponent => {
  return class AsyncComponent extends Component {
    constructor (...arg) {
      super(...arg)

      this.state = {
        LoadedComponent: null
      }
    }

    componentWillMount () {
      if (!this.state.LoadedComponent) {
        loadComponent()
          .then(module => module.default)
          .then((component) => {
            this.setState({
              LoadedComponent: component
            })
          })
          .catch((err) => {
            console.error('Async load component Failed.')
            throw err
          })
      }
    }

    render () {
      const { LoadedComponent } = this.state

      if (LoadedComponent) {
        return <LoadedComponent {...this.props} />
      }
      return null
    }
  }
}

export default AsyncComponent
