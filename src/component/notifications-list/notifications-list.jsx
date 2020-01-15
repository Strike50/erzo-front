import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import * as actions from '../../store/actions/index'
import Notification from '../notification/notification';

export const NotificationsList = props => {

    const { fetchNotifications } = props;

    useEffect (() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const notifications = [];
    if (props.listNotifications !== null) {
        Object.keys(props.listNotifications).forEach((key) => {
            notifications.push(props.listNotifications[key]);
        });
    }
    const listNotifications = notifications.length > 0 ? (
        notifications.map((notification, i) => (
            <Notification key={`notification-${i}`}
                          notificationType={notification.notificationType}
                          notifierId={notification.notifierId}
                          notifierName={notification.notifierName}
                          postId={notification.postId}
                          postContent={notification.postContent}
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
        fetchNotifications: () => dispatch(actions.fetchNotifications())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsList);
