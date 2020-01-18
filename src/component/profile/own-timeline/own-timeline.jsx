import React, {useEffect, useState} from 'react';
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import PostDisplay from "../../post/postDisplay";

export const OwnTimeline = props => {

    const { userId, listOwnPost, fetchOwnTimeline } = props;

    const [displayListPost , setDisplayListPost] = useState(listOwnPost);

    useEffect (() => {
        if (userId !== null) {
            fetchOwnTimeline(userId);
        }
    }, [userId, fetchOwnTimeline]);

    const deletePostToTimeline = id => {
        setDisplayListPost(displayListPost.filter(post => {
            return post.id !== id;
        }));
    };

    const listPostDisplay = displayListPost !== null && displayListPost !== undefined ? (
        displayListPost.map((post, i) => (
            <PostDisplay
                key={`post-${i}`}
                id={post.id}
                author={post.userId}
                content={post.content}
                creationDate={post.createdAt}
                media={post.media}
                reactionerId={post.reactionerId}
                reactionType={post.reactionType}
                reactions={post.reactions}
                comments={post.comments}
                deletePostToTimeline={deletePostToTimeline}
            />
        ))
    ) : null;

    return(
        <Row>
            <Col sm="2"/>
            <Col>
                {listPostDisplay}
            </Col>
            <Col sm="2"/>
        </Row>
    );

};
const mapStateToProps = state => {
    return {
        listOwnPost: state.timeline.listOwnPost
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOwnTimeline: id => dispatch(actions.fetchOwnTimeline(id))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnTimeline);
