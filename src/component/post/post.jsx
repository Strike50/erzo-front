import React, {useEffect, useState} from 'react';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {useParams} from "react-router";
import PostDisplay from "./postDisplay";
import CreatePost from "../create-post/create-post";

export const Post = props => {
    const {getPostById} = props;

   const [postId] = useParams();
   const [postObject, setPostObject] = useState({});

    useEffect(() => {
        if (postId !== null && postId !== undefined) {
            getPostById(postId)
                .then(post => {
                setPostObject(post);
            });
        }
    }, [postId, getPostById]);

    return postObject !== {} ? (
        <div>
            <PostDisplay id={postObject.id}
                         author={postObject.userId}
                         content={postObject.content}
                         creationDate={postObject.createdAt}
                         media={postObject.media}
                         reactions={postObject.reactions}
                         comments={postObject.comments} />
            <CreatePost />
        </div>
    ) : null;
};

const mapDispatchToProps = dispatch => {
    return {
        getPostById: id => dispatch(actions.getPostById(id))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Post)
