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

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.changeKeyword = this.changeKeyword.bind(this);
  }

  changeKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { keyword } = this.state;
    return (
      <div className='App'>
        <Header changeKeyword={this.changeKeyword} keyword={keyword} />
        <Switch location={this.props.location}>
          <Route exact path='/home' component={() => <Home />} />
          <Route
            exact
            path='/search-results'
            component={() => <SearchResults keyword={keyword} />}
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
