import React from 'react';
import {Card, CardBody, CardFooter, CardText, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';

export const Post = props => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.author} - {props.creationDate}</CardTitle>
        <CardText>{props.content}</CardText>
      </CardBody>
      <CardFooter>
        Reactions
      </CardFooter>
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
