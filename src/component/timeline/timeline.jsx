import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import * as actions from '../../store/actions/index'
import Post from '../post/post';
import CreatePost from "../create-post/create-post";

export const Timeline = props => {
    useEffect (() => {
        props.fetchTimeline();
    });

    const listPost = props.listPost;
    return (
        <Row>
            <Col/>
            <Col>
                <CreatePost/>
                {listPost.map((post,i) => (
                    <Post key={`post-${i}`} author={post.author} content={post.content} creationDate={post.creationDate} reactions={post.reactions}/>
                    ))}
            </Col>
            <Col/>
        </Row>
    );
};

const mapStateToProps = (storeState) => ({
  listPost: storeState.timeline.listPost});

const mapDispatchToProps = dispatch => {
    return {
      fetchTimeline: () => dispatch(actions.fetchTimeline())
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
