import React, { Component } from 'react';
import { ListGroup, Button, ButtonGroup } from 'reactstrap';
import baseUrl from '../shared/baseUrl';
import Loading from './Loading';
import PostListItem from './PostListItem';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: '',
      sortField: 'CreationDate',
      order: 'asc',
      isLoading: true
    };
  }

  fetchPosts(initialCall) {
    const { sortField, order } = this.state;
    if (!initialCall) this.setState({ isLoading: true });
    let requestOptions = {
      method: 'GET'
    };
    let url = baseUrl + 'posts?sort=' + sortField + '&order=' + order;
    // console.log(url);
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
    window.scrollTo(0, 0);
    this.fetchPosts(true);
  }

  render() {
    const { error, posts, sortField, order, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className='container  '>
          <div className='row justify-content-center heading'>
            <Loading />
          </div>
        </div>
      );
    }
    const list = posts.map(post => (
      <PostListItem post={post} key={post.Id.toString()} />
    ));
    if (error) {
      return (
        <div className='container'>
          <div className='row justify-content-center heading'>
            <h3 align='center'>{error}</h3>
          </div>
        </div>
      );
    }
    return (
      <div className='container  '>
        <div className='row justify-content-center heading'>
          <div>
            Sort on basis of :{' '}
            <ButtonGroup size='sm'>
              <Button
                color='primary'
                onClick={() => {
                  this.setState({ sortField: 'CreationDate' }, () => {
                    this.fetchPosts();
                  });
                  this.fetchPosts();
                }}
                active={sortField === 'CreationDate'}
              >
                Creation Date
              </Button>
              <Button
                color='primary'
                onClick={() => {
                  this.setState({ sortField: 'Score' }, () => {
                    this.fetchPosts();
                  });
                  this.fetchPosts();
                }}
                active={sortField === 'Score'}
              >
                Score
              </Button>
              <Button
                color='primary'
                onClick={() => {
                  this.setState({ sortField: 'ViewCount' }, () => {
                    this.fetchPosts();
                  });
                  this.fetchPosts();
                }}
                active={sortField === 'ViewCount'}
              >
                View Count
              </Button>
            </ButtonGroup>
            &nbsp; Order :{' '}
            <ButtonGroup size='sm'>
              <Button
                color='primary'
                onClick={() => {
                  this.setState({ order: 'asc' }, () => {
                    this.fetchPosts();
                  });
                  this.fetchPosts();
                }}
                active={order === 'asc'}
              >
                Increasing
              </Button>
              <Button
                color='primary'
                onClick={() => {
                  this.setState({ order: 'desc' }, () => {
                    this.fetchPosts();
                  });
                }}
                active={order === 'desc'}
              >
                Decreasing
              </Button>
            </ButtonGroup>
          </div>
          <br />
          <br />
          <ListGroup>{list}</ListGroup>
        </div>
      </div>
    );
  }
}

export default Home;
