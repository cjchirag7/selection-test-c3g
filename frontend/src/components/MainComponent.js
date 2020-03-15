import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import SearchResults from './SearchResults';
import PostDetail from './PostDetail';

class Main extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch location={this.props.location}>
          <Route exact path='/home' component={() => <Home />} />
          <Route
            exact
            path='/search-results'
            component={({ location }) => (
              <SearchResults keyword={location.search.split('?keyword=')[1]} />
            )}
          />
          <Route
            exact
            path='/posts/:postId'
            component={({ match }) => (
              <PostDetail postId={match.params.postId} />
            )}
          />
          <Redirect to='/home' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
