/**
 * 应用首页组件
 * @file src/routes/Home/index.js
 * @author codingplayboy
 * @date 2017/12/19
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Posts from 'components/Posts/'
import Pagination from 'components/Pagination/'
import { actions as AppActions } from 'store/appFlux'

class Home extends Component {
  constructor (...arg) {
    super(...arg)

    this.state = {
      posts: [],
      startPage: 1,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      total: 0
    }

    this.handlePageBack = this.handlePageBack.bind(this)
    this.handlePageNext = this.handlePageNext.bind(this)
  }

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {
    const { page, pageSize } = this.state

    if (nextState.page !== page || nextState.pageSize !== pageSize) {
      this.fetchPosts(nextState)
    }
  }

  render () {
    const { ids, posts, total, totalPages } = this.props
    const { page, pageSize, startPage } = this.state

    return (
      <div>
        <Posts ids={ids} posts={posts} pageSize={pageSize} />
        <Pagination
          total={total}
          totalPages={totalPages}
          page={page}
          pageSize={pageSize}
          startPage={startPage}
          handlePageBack={this.handlePageBack}
          handlePageNext={this.handlePageNext} />
      </div>
    )
  }

  handlePageNext () {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
    })
  }

  handlePageBack () {
    this.setState((prevState) => {
      return {
        page: prevState.page - 1
      }
    })
  }

  fetchPosts (data) {
    const { page, pageSize } = data || this.state
    this.props.requestPostList({
      page: page,
      per_page: pageSize
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ids: state.app.posts.ids,
    posts: state.app.posts.data,
    total: state.app.posts.total,
    totalPages: state.app.posts.totalPages
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestPostList: AppActions.requestPostList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
