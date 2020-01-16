import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import * as actions from '../../../store/actions/index'
import Notification from '../../notification/notification';
import {eNotificationStatus} from "../../../enum/notificationStatus";

export const NotificationsList = props => {

    const [notifications, setNotifications] = useState([]);

    const { fetchNotifications, putNotifications } = props;

    const getNotifications = data => {
        const notifications = [];
        if (data !== null) {
            Object.keys(data).forEach((key) => {
                notifications.push(data[key]);
            });
        }
        return notifications;
    };

    useEffect (() => {
        fetchNotifications().then((res) => {
            setNotifications(getNotifications(res.data));
                setTimeout(() => {
                    const resNotifs = getNotifications(res.data);
                    const seenNotifications = resNotifs.filter(notification => {
                        return notification.notificationStatus === eNotificationStatus.NOT_SEEN
                    });
                    const seenNotificationsId = [];
                    seenNotifications.forEach((notification) => seenNotificationsId.push(notification));
                    putNotifications(seenNotificationsId);
                    notifications.forEach(notification => notification.notificationStatus = eNotificationStatus.SEEN);
                }, 5000);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    notifications.sort((a, b) => {
        return (b.notificationTimestamp - a.notificationTimestamp);
    });

    const listNotifications = notifications.length > 0 ? (
        notifications.map((notification, i) => (
            <Notification key={`notification-${i}`}
                          notificationType={notification.notificationType}
                          notifierId={notification.notifierId}
                          postId={notification.postId}
                          notificationTimestamp={notification.notificationTimestamp}
                          notificationStatus={notification.notificationStatus}/>
        ))
    ) : null;

    return (
        <Row>
            <Col/>
            <Col>
                {listNotifications}
            </Col>
            <Col/>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        listNotifications: state.notificationsList.listNotifications
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNotifications: () => dispatch(actions.fetchNotifications()),
        putNotifications: (notifications) => dispatch(actions.putNotifications(notifications))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsList);
