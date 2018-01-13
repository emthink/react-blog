import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'material-ui';

class Topic extends Component {
  render () {
    const { match } = this.props;
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    );
  }
}

class Topics extends Component {
  render () {
    const { match } = this.props;
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>
              <Button>
                Rendering with React
              </Button>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>
              <Button>
                Components
              </Button>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              <Button>
                Props v. State
              </Button>
            </Link>
          </li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url}
          render={() => {
            return (
              <h3>Please select a topic.</h3>
            );
          }} />
      </div>
    );
  }
}

export default Topics;
