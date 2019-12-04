import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "reactstrap";

export const Post = props => {
  return (
    <Card>
      <div>
        <div>{props.author} - {props.creationDate}</div>
        <div>{props.content}</div>
      </div>
      <div>
        Reactions
      </div>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  creationDate: PropTypes.instanceOf(Date).isRequired,
  reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(Post.propTypes))
};
