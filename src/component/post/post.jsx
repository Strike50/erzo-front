import './post.css';

import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import * as actions from '../../store/actions'
import {eMediaType} from "../../enum/mediaType";
import {eReactionType} from "../../enum/reactionType";
import {useKeycloak} from "react-keycloak";

export const Post = props => {
    const {media, author, getMedia, fetchProfileInfoById, reactions} = props;
    const [mediaURL, setMediaURL] = useState(null);
    const [idLike, setIdLike] = useState(null);
    const [idRT, setIdRT] = useState(null);
    const [nbComment, setNbComment] = useState(0);
    const [nbLike, setNbLike] = useState(0);
    const [nbRT, setNbRT] = useState(0);
    const [profileDetail, setProfileDetail] = useState(null);

    const {tokenParsed} = useKeycloak().keycloak;
    const idUser = tokenParsed.sub;

    useEffect(() => {
        if (reactions !== null) {
            checkReactionsStatus();
        }
        if (author !== null) {
            fetchProfileInfoById(author)
                .then(response => {
                    setProfileDetail(response.data.user);
                });
        }
        if (media !== null && media !== undefined) {
            const type = media.type === eMediaType.IMAGE.toString() ? eMediaType.IMAGE : eMediaType.VIDEO;
            getMedia(media.id, type)
                .then(blobUrl => {
                    setMediaURL(blobUrl);
                    });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reactions, author, media, fetchProfileInfoById, getMedia]);

    const checkReactionsStatus = () => {
        setNbComment(props.comments.length);
        setNbLike(reactions.filter(reaction => reaction.reactionType === eReactionType.LIKE).length);
        setNbRT(reactions.filter(reaction => reaction.reactionType === eReactionType.RETWEET).length);
        reactions.forEach(reaction => {
            if (reaction.userId === idUser) {
                if (reaction.reactionType === eReactionType.LIKE) {
                    setIdLike(reaction.id);
                }
                if (reaction.reactionType === eReactionType.RETWEET) {
                    setIdRT(reaction.id);
                }
            }
        });
    };

    const checkMediaPlayer = () => {
        if (media !== null && mediaURL !== null) {
            if (media.type === eMediaType.IMAGE) {
                return <img alt='post' src={mediaURL}/>
            } else {
                return <video controls src={mediaURL} />
            }
        }
    };

    const onClickDeletePost = () => {
        props.deletePost(props.id);
    };

    const onClickLike = () => {
        if (idLike !== null) {
            props.deleteReaction(idLike);
            setIdLike(null);
            setNbLike(nbLike - 1);
        } else {
            const reaction = {
                postId: props.id,
                reactionType: eReactionType.LIKE
            };
            props.postReaction(reaction)
                .then(response => {
                    setIdLike(response.headers['content-location']);
                    setNbLike(nbLike + 1);
                });
        }
    };

    const onClickRT = () => {
        if (idRT !== null) {
            props.deleteReaction(idRT);
            setIdRT(null);
            setNbRT(nbRT - 1);
        } else {
            const reaction = {
                postId: props.id,
                reactionType: eReactionType.RETWEET
            };
            props.postReaction(reaction)
                .then(response => {
                    setIdRT(response.headers['content-location']);
                    setNbRT(nbRT + 1);
                });
        }
    };

    const authorDetail = profileDetail !== null ? (
        <div>
            <NavLink to={`/profil/${profileDetail.username}`}>
                <strong>
                    {profileDetail.lastName} {profileDetail.firstName}
                </strong>
            </NavLink>
            &nbsp;
            {profileDetail.username}
        </div>
    ) : null;

    const creationDate = new Date(props.creationDate).toLocaleString();
    return (
        <Card className="card-post">
            <CardHeader>
                <div style={{float: "right", cursor: "pointer"}} onClick={onClickDeletePost}>&#x2716;</div>
                {authorDetail}
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
                <Row>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="comment"/>
                        <span>{nbComment}</span>
                    </Col>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="retweet" color={idRT !== null ? 'green' : null} onClick={onClickRT}/>
                        <span>{nbRT}</span>
                    </Col>
                    <Col md="4">
                        <FontAwesomeIcon className="icon" icon="heart" color={idLike !== null ? 'red' : null} onClick={onClickLike}/>
                        <span>{nbLike}</span>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    );
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchProfileInfoById: id => dispatch(actions.fetchProfileInfoById(id)),
        deletePost: id => dispatch(actions.deletePost(id)),
        getMedia: (id, type) => dispatch(actions.getMedia(id, type)),
        postReaction: reaction => dispatch(actions.postReaction(reaction)),
        deleteReaction: id => dispatch(actions.deleteReaction(id))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Post);

Post.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    media: PropTypes.object,
    reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape(Post.propTypes))
};
