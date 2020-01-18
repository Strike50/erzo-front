import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row} from "reactstrap";
import * as actions from '../../store/actions/index'
import PostDisplay from '../post/postDisplay';
import CreatePost from "../create-post/create-post";

export const Timeline = props => {

    const { listPost, fetchTimeline } = props;
    const [isButtonRefreshDisabled , setIsButtonRefreshDisabled] = useState(false);
    const [displayListPost , setDisplayListPost] = useState(listPost);

    useEffect (() => {
        fetchTimeline().then(response => {
            setDisplayListPost(response.data.posts);
        });
    }, [fetchTimeline]);

    const refresh = () => {
        fetchTimeline();
    };

    const addPostToTimeline = post => {
        setDisplayListPost([post].concat(displayListPost));
    };

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

    const onClickRefreshButton = e => {
        e.preventDefault();
        setIsButtonRefreshDisabled(true);
        refresh();
        // **** here's the timeout ****
        setTimeout(() => setIsButtonRefreshDisabled(false), 10000);
    };

    return (
        <Row>
            <Col sm="2"/>
            <Col>
                <CreatePost addPostToTimeline={addPostToTimeline} />
                <Button disabled={isButtonRefreshDisabled} onClick={onClickRefreshButton}>Actualiser</Button>
                {listPostDisplay}
            </Col>
            <Col sm="2"/>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        listPost: state.timeline.listPost
    }
};

const mapDispatchToProps = dispatch => {
    return {
      fetchTimeline: () => dispatch(actions.fetchTimeline())
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
