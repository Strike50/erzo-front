import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useParams} from "react-router";
import {Col, Spinner} from 'reactstrap';
import * as actions from "../../store/actions";
import PostDisplay from "./postDisplay";
import CreatePost from "../create-post/create-post";

export const Post = props => {
    const {getPostById, getCommentsOfPostById} = props;

   const {postId} = useParams();
   const [postObject, setPostObject] = useState({});
   const [comments, setComments] = useState([]);

    useEffect(() => {
        if (postId !== null && postId !== undefined) {
            getPostById(postId)
                .then(post => {
                setPostObject(post);
                getCommentsOfPostById(post.id)
                    .then(responseComments => {
                        setComments(responseComments);
                    })
            });
        } else {
            setPostObject({});
        }

    }, [postId, getPostById, getCommentsOfPostById]);

    console.log(postObject.comments, postObject.id)

    return postObject.id !== undefined ? (
        <div>
            <Col md="2" />
            <Col>
                <PostDisplay
                    id={postObject.id}
                    author={postObject.userId}
                    content={postObject.content}
                    creationDate={postObject.createdAt}
                    media={postObject.media}
                    reactionerId={postObject.reactionerId}
                    reactionType={postObject.reactionType}
                    reactions={postObject.reactions}
                    comments={postObject.comments}
                />
                <CreatePost postParentId={postObject.id}/>
                {comments.map((comment, i) => (
                    <PostDisplay
                        key={`comment-${i}`}
                        id={comment.id}
                        author={comment.userId}
                        content={comment.content}
                        creationDate={comment.createdAt}
                        media={comment.media}
                        reactionerId={comment.reactionerId}
                        reactionType={comment.reactionType}
                        reactions={comment.reactions}
                        comments={comment.comments}
                    />
                ))}
            </Col>
            <Col md="2"/>
        </div>
    ) : <Spinner color="dark" />;
};

const mapDispatchToProps = dispatch => {
    return {
        getPostById: id => dispatch(actions.getPostById(id)),
        getCommentsOfPostById: id => dispatch(actions.getCommentsOfPostById(id))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Post)
