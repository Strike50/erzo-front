import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Post = props => {
    const creationDate = new Date(props.creationDate).toLocaleString();
    const media = props.media !== null ? '' : null;
    return (
        <Card>
            <CardHeader>
                <div>{props.author}</div>
                <div>{creationDate}</div>
            </CardHeader>
            <CardBody>
                {media}
                <div>{props.content}</div>
            </CardBody>
            <CardFooter>
                <div textalign="left">
                    <FontAwesomeIcon marginleft="5%" icon="comment"/>
                    <FontAwesomeIcon marginleft="33%" icon="retweet"/>
                    <FontAwesomeIcon marginleft="33%" icon="heart"/>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Post;

Post.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  creationDate: PropTypes.string.isRequired,
  reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(Post.propTypes))
};
