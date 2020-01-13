import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import * as actions from '../../store/actions/index'
import Post from '../post/post';
import CreatePost from "../create-post/create-post";

export const Timeline = props => {

    const { fetchTimeline } = props;

    useEffect (() => {
        fetchTimeline();
    }, [fetchTimeline]);

    const listPost = props.listPost !== null ? (
        props.listPost.map((post, i) => (
                <Post key={`post-${i}`}
                      author={post.userId}
                      content={post.content}
                      creationDate={post.createdAt}
                      reactions={post.reactions}/>
            ))
    ) : null;

    return (
        <Row>
            <Col/>
            <Col>
                <CreatePost/>
                {listPost}
            </Col>
            <Col/>
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
