import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardHeader} from "reactstrap";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

export const Notification = props => {
    const {postId, notifierId, fetchProfileInfoById, getPostById} = props;

    const [post, setPost] = useState(null);

    const creationDate = new Date(props.notificationTimestamp).toLocaleString();

    useEffect(() => {
        if (notifierId !== null && notifierId !== undefined) {
            fetchProfileInfoById(notifierId);
        } if (postId !== null && postId !== undefined) {
            getPostById(postId)
                .then(postApi => {
                        setPost(postApi);
                    }
                );
        }
    },[notifierId, fetchProfileInfoById, getPostById, postId]);

    const postDisplay = post !== null ? post.content : null;

    const notificationBody = () => {
        if (props.notificationType === eNotificationType.FOLLOWS) {
            return (
                <CardBody>
                    <p>
                        <NavLink to={`/profil/${props.profileDetail.username}`}>
                            <span>{props.profileDetail.username} </span>
                        </NavLink>
                        <span>vous suit désormais !</span>
                    </p>
                </CardBody>
            );
        } else {
            const notificationVerb = props.notificationType === eNotificationType.LIKES ? 'aimé' : 'retweeté';
            return (
                <CardBody>
                    <p>
                        <p>
                            <NavLink to={`/profil/${props.profileDetail.username}`}>
                                <span>{props.profileDetail.username} </span>
                            </NavLink>
                            <span>a {notificationVerb} votre post !</span>
                        </p>
                        <p>{postDisplay}</p>
                    </p>
                </CardBody>
            );
        }
    };

    return (
        <Card>
            <CardHeader>
                <div>{props.notifierName}</div>
                <div>{creationDate}</div>
            </CardHeader>
            {notificationBody()}
        </Card>
    );
};

const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileInfoById: id => dispatch(actions.fetchProfileInfoById(id)),
        getPostById: id => dispatch(actions.getPostById(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);

const eNotificationType = {
    LIKES: 'LIKES',
    RETWEETS: 'RETWEETS',
    FOLLOWS: 'FOLLOWS',
};

/*
const eNotificationStatus = {
    NOT_SEEN: 'NOT_SEEN',
    SEEN: 'SEEN',
}; */

Notification.propTypes = {
    notificationType: PropTypes.string.isRequired,
    notifierId: PropTypes.string.isRequired,
    notifierName: PropTypes.string,
    postId: PropTypes.string,
    notificationTimestamp: PropTypes.number.isRequired,
    notificationStatus: PropTypes.string.isRequired,
};
