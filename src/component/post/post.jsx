import './post.css';

import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import * as actions from '../../store/actions'
import {eMediaType} from "../../enum/mediaType";

export const Post = props => {
    const {media, author, getMedia, fetchProfileInfoById} = props;
    const [mediaURL, setMediaURL] = useState(null);

    useEffect(() => {
        if (author !== null) {
            fetchProfileInfoById(author);
            const type = media.type === eMediaType.IMAGE.toString() ? eMediaType.IMAGE : eMediaType.VIDEO;
            getMedia(media.id, type)
                .then(blobUrl => {
                    setMediaURL(blobUrl);
                    }
                );
        }
    },[author, media, fetchProfileInfoById, getMedia]);

    const checkMediaPlayer = () => {
        if (media !== null && mediaURL !== null) {
            if (media.type === eMediaType.IMAGE) {
                return <img alt='post' src={mediaURL}/>
            } else {
                return <video controls src={mediaURL} />
            }
        }
    };

    const creationDate = new Date(props.creationDate).toLocaleString();
    console.log(props.profileDetail);
    return (
        <Card className="card-post">
            <CardHeader>
                <div>
                    <NavLink to={`/profil/${props.profileDetail.username}`}>
                        <strong>
                            {props.profileDetail.lastName} {props.profileDetail.firstName}
                        </strong>
                    </NavLink>
                    &nbsp;
                    {props.profileDetail.username}
                </div>
                <div>{`Publié le ${creationDate}`}</div>
            </CardHeader>
            <CardBody>
                <Row>{props.content}</Row>
                <Row>
                    <Col>
                        {checkMediaPlayer()}
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <div textalign="left">
                    <FontAwesomeIcon marginleft="5%" icon="comment"/>
                    <FontAwesomeIcon marginleft="33%" icon="retweet"/>
                    <FontAwesomeIcon marginleft="33%" icon="heart"/>
                </div>
            </CardFooter>
        </Card>
    );
};

export const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail
    }
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchProfileInfoById: id => dispatch(actions.fetchProfileInfoById(id)),
        getMedia: (id, type) => dispatch(actions.getMedia(id, type))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);

Post.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    media: PropTypes.object,
    reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape(Post.propTypes))
};
