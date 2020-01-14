import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import * as actions from '../../store/actions'
import {eMediaType} from "../../enum/mediaType";
import axiosOrder from "../../axios-order";

export const Post = props => {
    const {media, author, fetchProfileInfo} = props;

    useEffect(() => {
        if (author !== null) {
            fetchProfileInfo(author);
        }
    },[author, fetchProfileInfo]);

    const checkMediaPlayer = () => {
        if (media !== null) {
            const baseURL = axiosOrder.defaults.baseURL;
            if (media.type === eMediaType.IMAGE) {
                const src = process.env.NODE_ENV === 'production' ? `${baseURL}/images/${media.id}`
                : `http://localhost:3002/images/${media.id}`;
                return <img alt='post' src={src}/>
            } else {
                const src = process.env.NODE_ENV === 'production' ? `${baseURL}/videos/${media.id}`
                    : `http://localhost:3002/videos/${media.id}`;
                return <video controls src={src} />
            }
        }
    };

    const creationDate = new Date(props.creationDate).toLocaleString();
    return (
        <Card>
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
        fetchProfileInfo: id => dispatch(actions.fetchProfileInfo(id)),
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
