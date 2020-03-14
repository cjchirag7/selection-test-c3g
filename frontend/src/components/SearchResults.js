import React, { Component } from 'react';
import Loading from './Loading';
import PostListItem from './PostListItem';
import baseUrl from '../shared/baseUrl';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: '',
      isLoading: false
    };
  }

  fetchSearchResults() {
    const { keyword } = this.props;
    this.setState({ isLoading: true });
    let requestOptions = {
      method: 'GET'
    };
    let url = baseUrl + 'search?keyword=' + keyword;
    console.log(url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        const { results, success, error } = result;
        if (success) {
          this.setState({ posts: results });
          this.setState({ isLoading: false, error: '' });
        } else {
          let err = new Error(error);
          throw err;
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        this.setState({ error: error.message });
      });
  }

  componentDidMount() {
    this.fetchSearchResults();
    window.scrollTo(0, 0);
  }

  render() {
    const { error, posts, isLoading } = this.state;
    const { keyword } = this.props;
    if (isLoading) {
      return (
        <div className='container  '>
          <div className='row justify-content-center heading'>
            <Loading />
          </div>
        </div>
      );
    } else if (error) {
      return (
        <div className='container'>
          <div className='row justify-content-center heading'>
            <h3 align='center'>{error}</h3>
          </div>
        </div>
      );
    } else if (posts.length === 0) {
      return (
        <div className='container'>
          <div className='row justify-content-center heading'>
            <h3 align='center'>No posts match your query</h3>
          </div>
        </div>
      );
    }
    const list = posts.map(post => (
      <PostListItem post={post} key={post.Id.toString()} />
    ));
    return (
      <div className='container  '>
        <div className='row justify-content-center heading'>
          <h4 align='center'>Search Results for ' {keyword} ' : </h4>
        </div>
        <div>{list}</div>
      </div>
    );
  }
}

export default SearchResults;
