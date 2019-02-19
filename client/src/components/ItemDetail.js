import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Comment from './Comment';

const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      comments(top: 3) {
        id
        content
        numberOfStars
      }
    }
  }
`;

const ItemDetail = ({ id }) => (
  <Query query={GET_ITEM} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const { item } = data;

      return (
        <Fragment>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <ol>
            {item.comments &&
              item.comments.map(({ id: commentId, content, numberOfStars }) => (
                <li key={commentId}>
                  <Comment
                    id={commentId}
                    content={content}
                    numberOfStars={numberOfStars}
                  />
                </li>
              ))}
          </ol>
        </Fragment>
      );
    }}
  </Query>
);

ItemDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemDetail;
