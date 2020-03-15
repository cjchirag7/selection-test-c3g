import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Alert,
  Badge,
  CardBody,
  CardFooter
} from 'reactstrap';
import Markdown from 'react-markdown';
import Loading from './Loading';
import baseUrl from '../shared/baseUrl';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLoading: true,
      error: ''
    };
  }

  fetchPost() {
    const { postId } = this.props;
    this.setState({ isLoading: true });
    let requestOptions = {
      method: 'GET'
    };
    let url = baseUrl + 'posts/' + postId;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        const { results, success, error } = result;
        if (success) {
          this.setState({ post: results });
          this.setState({ isLoading: false, error: '' });
        } else {
          let err = new Error(error);
          throw err;
        }
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchPost();
  }

  render() {
    const { isLoading, error, post } = this.state;
    let colors = ['warning', 'danger', 'success', 'info', 'secondary'];
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
            <Alert color='danger'>
              <h3 align='center'>{error}</h3>
            </Alert>
          </div>
        </div>
      );
    } else {
      const {
        Id,
        AnswerCount,
        ClosedDate,
        CommentCount,
        CreationDate,
        FavoriteCount,
        LastActivityDate,
        LastEditDate,
        LastEditorUserId,
        OwnerDisplayName,
        OwnerUserId,
        ParentId,
        PostTypeId,
        Score,
        Title,
        ViewCount,
        Tags,
        Body
      } = post;
      return (
        <div className='container  '>
          <div className='row justify-content-center heading'>
            <Card>
              <CardHeader tag='h3'>
                {`${Title ? Title : 'Post #' + Id}  `} &nbsp; &nbsp;
                &nbsp;&nbsp; [Type {PostTypeId}]
              </CardHeader>
              <CardBody>
                <CardTitle>
                  {' '}
                  <b>Owner User ID</b> - {OwnerUserId}{' '}
                  {OwnerDisplayName ? ' ( ' + OwnerDisplayName + ' ) ' : ''}{' '}
                  &nbsp;&nbsp;
                  {LastEditorUserId ? (
                    <>
                      {' '}
                      <b>Last Editor User ID</b> - {LastEditorUserId}{' '}
                    </>
                  ) : (
                    ''
                  )}{' '}
                  &nbsp;&nbsp;
                  {ParentId ? (
                    <>
                      {' '}
                      <b>Parent ID</b> - {ParentId}{' '}
                    </>
                  ) : (
                    ''
                  )}{' '}
                  &nbsp;&nbsp;
                  {FavoriteCount ? (
                    <>
                      {' '}
                      <b>Favorite Count</b> - {FavoriteCount}{' '}
                    </>
                  ) : (
                    ''
                  )}{' '}
                  <br /> <b>Score</b> - {Score} &nbsp;&nbsp;<b>View Count</b> -{' '}
                  {ViewCount} &nbsp;&nbsp;
                  {AnswerCount ? (
                    <>
                      {' '}
                      <b>Answer Count</b> - {AnswerCount}{' '}
                    </>
                  ) : (
                    ''
                  )}{' '}
                  &nbsp;&nbsp;
                  {CommentCount ? (
                    <>
                      {' '}
                      <b>Comment Count</b> - {CommentCount}{' '}
                    </>
                  ) : (
                    ''
                  )}{' '}
                </CardTitle>
                <CardText>
                  <b> Tags: </b>{' '}
                  {Tags.length
                    ? Tags.map((tag, i) => (
                        <React.Fragment key={i.toString()}>
                          <Badge color={colors[i % colors.length]} pill>
                            {' '}
                            {tag}
                          </Badge>
                          &nbsp;
                        </React.Fragment>
                      ))
                    : 'None'}{' '}
                  <br />
                  <br />
                  <Markdown escapeHtml={false} source={Body} />
                  <br />
                  <br />
                </CardText>
                <br />
              </CardBody>
              <CardFooter className='text-muted'>
                <Row>
                  <Col md={6}>
                    Created at :{' '}
                    {CreationDate
                      ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        }).format(new Date(CreationDate))
                      : '-'}{' '}
                  </Col>
                  <Col md={6}>
                    Last activity at :{' '}
                    {LastActivityDate
                      ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        }).format(new Date(LastActivityDate))
                      : '-'}
                  </Col>
                </Row>
                {ClosedDate || LastEditDate ? (
                  <Row>
                    <Col md={6}>
                      Closed at :{' '}
                      {ClosedDate
                        ? new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          }).format(new Date(ClosedDate))
                        : '-'}{' '}
                    </Col>
                    <Col md={6}>
                      Last edited at :{' '}
                      {LastActivityDate
                        ? new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          }).format(new Date(LastEditDate))
                        : '-'}
                    </Col>
                  </Row>
                ) : (
                  ''
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      );
    }
  }
}

export default PostDetail;
