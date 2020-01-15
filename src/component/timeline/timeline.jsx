import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import * as actions from '../../store/actions/index'
import Post from '../post/post';
import CreatePost from "../create-post/create-post";

export const Timeline = props => {

    const { listPost, fetchTimeline } = props;

    useEffect (() => {
        fetchTimeline();
    }, [fetchTimeline]);

    const listPostDisplay = listPost !== null && listPost !== undefined ? (
        listPost.map((post, i) => (
            <Post key={`post-${i}`}
                  id={post.id}
                  author={post.userId}
                  content={post.content}
                  creationDate={post.createdAt}
                  media={post.media}
                  reactions={post.reactions}
                  comments={post.comments}/>
                  ))
    ) : null;

    return (
        <Row>
            <Col sm="2"/>
            <Col>
                <CreatePost/>
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
