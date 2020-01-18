import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useParams} from "react-router";
import {Col, Row, Spinner} from 'reactstrap';
import * as actions from "../../store/actions";
import PostDisplay from "./postDisplay";
import CreatePost from "../create-post/create-post";
import './post.css';

export const Post = props => {
    const {getPostById, getCommentsOfPostById} = props;

   const {postId} = useParams();
   const [postObject, setPostObject] = useState({});
   const [comments, setComments] = useState([]);

    useEffect(() => {
        if (postId !== null && postId !== undefined) {
            refresh();
        } else {
            setPostObject({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const refresh = () => {
        getPostById(postId)
            .then(post => {
                setPostObject(post);
                getCommentsOfPostById(post.id)
                    .then(responseComments => {
                        setComments(responseComments);
                    })
            });
    };

    const checkComment = () => {
        if (postObject.id !== undefined && postObject.comments.length > 0) {
            return comments.length > 0 ? comments.map((comment, i) => (
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
            )) : <Spinner color="black" />;
        } else {
            return null;
        }
    };

    return postObject.id !== undefined ? (
        <>
            <Row>
                <Col sm="2" />
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
                    <h3>Ajouter un commentaire</h3>
                    <CreatePost refresh={refresh} postParentId={postObject.id}/>
                </Col>
                <Col sm="2"/>
            </Row>
            <Row>
                <Col md="3" />
                <Col>
                    {checkComment()}
                </Col>
                <Col md="3"/>
            </Row>
        </>
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
