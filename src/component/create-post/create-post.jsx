import './create-post.css';
import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "reactstrap";
import Files from 'react-files'
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    };

    const handleSubmitTweet = () => {
        if (content !== '') {
            props.postTweet(content, media, props.postParentId)
                .then(() => {
                    props.refresh();
            });
            setContent('');
            setMedia(null);
        }
    };

    const onClickRemoveMedia = () => {
        setMedia(null);
    };

    const mediaNameDisplay = media !== null ? (
        <div>
            {media.name}&nbsp;
            <FontAwesomeIcon className="icon" icon="times" onClick={onClickRemoveMedia}/>
        </div>
        )
        : null;

    return (
        <Form className="form">
            <Row>
                <Input type="textarea" className="textarea" value={content} onChange={handleContentChange}/>
            </Row>
            <Row className="buttonSend">
                <Col md="6">
                    <Files
                        className="file"
                        onChange={handleMedia}
                        onError={handleMediaError}
                        accepts={['image/*', 'video/*']}
                        multiple={false}
                    >
                        <Button onClick={e => e.preventDefault()}>Sélectionner photo / vidéo</Button>
                    </Files>
                    {mediaNameDisplay}
                </Col>
                <Col md="6">
                    <Button disabled={content === ''} onClick={handleSubmitTweet}>Tweeter</Button>
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
        postTweet: (content, media, postParentId) => dispatch(actions.postTweet(content, media, postParentId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);
