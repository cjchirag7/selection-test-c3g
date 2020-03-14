import React from 'react';
import { Badge, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function PostListItem(props) {
  const { post } = props;
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
    ViewCount
  } = post;
  let colors = ['warning', 'danger', 'success', 'info', 'secondary'];
  return (
    <ListGroupItem key={Id}>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h5 align='center'>
              <Link to={`/posts/${Id}`}>
                <b>{`${Title ? Title : 'Post #' + Id}  `}</b>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Badge color={colors[PostTypeId - 1]} pill>
                {' '}
                {'Type ' + PostTypeId}
              </Badge>
            </h5>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4'>
            Owner User ID :{' '}
            {`    ${OwnerUserId ? OwnerUserId : '-'} ${
              OwnerDisplayName ? ' ( ' + OwnerDisplayName + ' )' : ''
            }`}
          </div>
          <div className='col-12 col-md-4'>
            {`    ${
              LastEditorUserId
                ? ' Last Editor User ID : ' + LastEditorUserId
                : ''
            } `}
          </div>
          <div className='col-12 col-md-4'>
            Parent ID : {ParentId ? ParentId : ' -'}
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4'>Score : {Score}</div>
          <div className='col-12 col-md-4'>Comment Count : {CommentCount}</div>
          <div className='col-12 col-md-4'>View Count : {ViewCount}</div>
        </div>
        {FavoriteCount || AnswerCount ? (
          <div className='row'>
            <div className='col-12 col-md-6'>Answer Count : {AnswerCount}</div>
            <div className='col-12 col-md-6'>
              Favorite Count : {FavoriteCount}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='row'></div>
        <div className='row'>
          <div className='col-12 col-md-6'>
            {' '}
            Created At :{' '}
            {CreationDate
              ? new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                }).format(new Date(CreationDate))
              : '-'}
          </div>
          <div className='col-12 col-md-6'>
            {' '}
            Last Activity At :{' '}
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
          </div>
        </div>
        {LastEditDate || ClosedDate ? (
          <div className='row'>
            <div className='col-12 col-md-6'>
              {' '}
              Last Edited At :{' '}
              {LastEditDate
                ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(new Date(LastEditDate))
                : '-'}
            </div>
            <div className='col-12 col-md-6'>
              {' '}
              Closed At :{' '}
              {ClosedDate
                ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(new Date(ClosedDate))
                : '-'}
            </div>
          </div>
        ) : (
          ''
        )}
        <br />
        <div className='text-center'>
          <Link to={`/posts/${Id}`}>
            <Button color='info' size='sm'>
              <i className='fa fa-eye fa-lg' /> &nbsp;View
            </Button>
          </Link>
        </div>
      </div>
    </ListGroupItem>
  );
}

export default PostListItem;
