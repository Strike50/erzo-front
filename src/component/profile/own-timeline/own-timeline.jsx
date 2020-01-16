import React, {useEffect} from 'react';
import {Col, Row} from "reactstrap";
import Post from "../../post/post";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";


export const OwnTimeline = props => {

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
)(OwnTimeline);