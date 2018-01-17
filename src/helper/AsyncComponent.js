/**
 * 封装实现按需加载组件的高阶组件
 * @name AsyncComponent.js
 * @copyright src/helper/AsyncComponent 2017/12/19
 * @author codingplayboy
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectReducer, injectSagas } from 'store/';

const AsyncComponent = (loadComponent, params) => {
  return class AsyncComponent extends Component {
    constructor (...arg) {
      super(...arg);

      this.state = {
        LoadedComponent: null
      };
    }

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentWillMount () {
      if (!this.state.LoadedComponent) {
        loadComponent()
          .then(module => {
            const { reducer, sagas } = module;
            if (reducer) {
              injectReducer(this.context.store, { key: params.key, reducer });
            }
            if (sagas) {
              injectSagas(this.context.store, { key: params.key, sagas });
            }
            return module.default;
          })
          .then((component) => {
            this.setState({
              LoadedComponent: component
            });
          })
          .catch((err) => {
            console.error('Async load component Failed.');
            throw err;
          });
      }
    }

    render () {
      const { LoadedComponent } = this.state;

      if (LoadedComponent) {
        return <LoadedComponent {...this.props} />;
      }
      return null;
    }
  };
};

export default AsyncComponent;
