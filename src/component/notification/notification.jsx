import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardHeader} from "reactstrap";

export const Notification = props => {
    const creationDate = new Date(props.notificationTimestamp).toLocaleString();

    const notificationBody = () => {
        if (props.notificationType === eNotificationType.FOLLOWS) {
            return (
                <p>
                    {props.notifierName} vous suit désormais !
                </p>
            );
        } else {
            const notificationVerb = props.notificationType === eNotificationType.LIKES ? 'aimé' : 'retweeté';
            return (
                <p>
                    <span>{props.notifierName} a {notificationVerb} votre post !</span>
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


export default Notification;

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
