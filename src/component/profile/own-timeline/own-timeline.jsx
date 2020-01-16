import React, {useEffect} from 'react';
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import PostDisplay from "../../post/postDisplay";

export const OwnTimeline = props => {

    const { userId, listOwnPost, fetchOwnTimeline } = props;

    useEffect (() => {
        if (userId !== null) {
            fetchOwnTimeline(userId);
        }
    }, [userId, fetchOwnTimeline]);

    const listPostDisplay = listOwnPost !== null && listOwnPost !== undefined ? (
        listOwnPost.map((post, i) => (
            <PostDisplay key={`post-${i}`}
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
