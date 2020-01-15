import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardHeader} from "reactstrap";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

export const Notification = props => {
    const {notifierId, fetchProfileInfoById} = props;

    const creationDate = new Date(props.notificationTimestamp).toLocaleString();

    useEffect(() => {
        if (notifierId !== null) {
            fetchProfileInfoById(notifierId);
        }
    },[notifierId, fetchProfileInfoById]);

    const notificationBody = () => {
        if (props.notificationType === eNotificationType.FOLLOWS) {
            return (
                <p>
                    {props.profileDetail.username} vous suit désormais !
                </p>
            );
        } else {
            const notificationVerb = props.notificationType === eNotificationType.LIKES ? 'aimé' : 'retweeté';
            return (
                <p>
                    <span>{props.profileDetail.username} a {notificationVerb} votre post !</span>
                    <span>{props.postContent}</span>
                </p>
            );
        }
    };

    return (
        <Card>
            <CardHeader>
                <div>{props.notifierName}</div>
                <div>{creationDate}</div>
            </CardHeader>
            <CardBody>
                {notificationBody()}
            </CardBody>
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
        fetchProfileInfoById: id => dispatch(actions.fetchProfileInfoById(id))
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
    postContent: PropTypes.string,
    notificationTimestamp: PropTypes.number.isRequired,
    notificationStatus: PropTypes.string.isRequired,
};
