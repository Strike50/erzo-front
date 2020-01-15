import './create-post.css';
import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "reactstrap";
import Files from 'react-files'
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const CreatePost = props =>{

    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);

    const handleContentChange = e => {
        setContent(e.target.value);
    };

    const handleMedia = e => {
        if (e.length === 1) {
            setMedia(e[0]);
        }
    };

    const handleMediaError = e => {
        console.log(e);
    };

    const handleSubmitTweet = () => {
        if (content !== '') {
            props.postTweet(content, media);
            setContent('');
            setMedia(null);
        }
    };

    return (
        <Form className="form" onSubmit={handleSubmitTweet}>
            <Row>
                <Input type="textarea" className="textarea" value={content} onChange={handleContentChange}/>
            </Row>
            <Row className="buttonSend">
                <Col sm="6">
                    <Files
                        className="file"
                        onChange={handleMedia}
                        onError={handleMediaError}
                        accepts={['image/*', 'video/*']}
                        multiple={false}
                    >
                        <Button onClick={e => e.preventDefault()}>Sélectionner photo / vidéo</Button>
                    </Files>
                    {media !== null ? media.name : null}
                </Col>
                <Col sm="6">
                    <Button disabled={content === ''}>Tweeter</Button>
                </Col>
            </Row>
        </Form>
    )
};

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
