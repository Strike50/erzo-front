import './create-post.css';
import React from 'react';
import {Button, Col, Form, Input, Row} from "reactstrap";
import Files from 'react-files'
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as actions from "../../store/actions";

class CreatePost extends React.Component {

    state = {
        content: '',
        media: null
    };

    handleContentChange = e => {
        this.setState({
            ...this.state,
            content: e.target.value
        })
    };

    handleMedia = e => {
        if (e.length === 1) {
            this.setState({
                ...this.state,
                media: e[0]
            });
        }
    };

    handleMediaError = e => {
        console.log(e);
    };

    handleSubmitTweet = () => {
        if (this.state.content !== '') {
            this.props.postTweet(this.state.content, this.state.media);
            this.setState({
                ...this.state,
                content: '',
                media: null
            });
        }
    };

    render() {
        return (
            <Form >
                <Row>
                    <Input type="textarea" value={this.state.content} onChange={this.handleContentChange}/>
                </Row>
                <Row>
                    <Col sm="3">
                        <Files
                            className="file"
                            onChange={this.handleMedia}
                            onError={this.handleMediaError}
                            accepts={['image/*', 'video/*']}
                            multiple={false}
                        >
                            <FontAwesomeIcon icon="file-image"/>
                        </Files>
                        {this.state.media !== null ? this.state.media.name : null}
                    </Col>
                    <Col sm="9">
                        <Button onClick={this.handleSubmitTweet} disabled={this.state.content === ''}>Tweeter</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mapStateToProps = (storeState) => ({
    success: storeState.createPost.success
});

const mapDispatchToProps = dispatch => {
    return {
        postTweet: (content, media) => dispatch(actions.postTweet(content, media))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);
