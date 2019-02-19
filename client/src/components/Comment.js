import React from 'react';
import PropTypes from 'prop-types';
import { TiStarFullOutline } from 'react-icons/ti';
import { FiChevronUp } from 'react-icons/fi';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_STAR_TO_COMMENT = gql`
  mutation AddStarToComment($id: ID!) {
    addStarToComment(id: $id) {
      id
      numberOfStars
    }
  }
`;

const Comment = ({ id, content, numberOfStars }) => (
  <Mutation mutation={ADD_STAR_TO_COMMENT} variables={{ id }}>
    {(addStarToComment, { loading, error }) => {
      if (error) return `Error! ${error.message}`;

      return (
        <blockquote>
          <p>{`"${content}"`}</p>
          <TiStarFullOutline />
          {` ${numberOfStars} `}
          <FiChevronUp
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            onClick={loading ? () => {} : addStarToComment}
          />
        </blockquote>
      );
    }}
  </Mutation>
);

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  numberOfStars: PropTypes.number.isRequired,
};

export default Comment;
