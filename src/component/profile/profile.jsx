import './profile.css';
import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'
import {Button, Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";
import {useParams} from "react-router";
import {useKeycloak} from "react-keycloak";

export const Profile = props => {
    const {fetchProfileInfo,fetchFollowing, fetchFollowers, postFollowSomeone, postUnfollowSomeone} = props;
    const [modal, setModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const {username} = useParams();
    const {preferred_username} = useKeycloak().keycloak.tokenParsed;
    let followSomeone = null;

    checkProfileButtonStatus
    useEffect(() => {
        if (username === preferred_username) {
            fetchProfileInfo("/me");
            fetchFollowing("");
            fetchFollowers("");
            checkProfileButtonStatus(true);
        } else {
            fetchProfileInfo(`/${username}`);
            fetchFollowing(`/${username}`);
            fetchFollowers(`/${username}`);
            checkProfileButtonStatus(false)
        }
    }, [username, preferred_username, fetchProfileInfo, fetchFollowing, fetchFollowers, checkProfileButtonStatus]);

    const checkProfileButtonStatus = isOwnProfile => {
        if (isOwnProfile) {
            followSomeone = <Button>Modifier mon profil</Button>;
        } else {
            if (username === 'remi') {
                followSomeone = <Button onClick={onClickUnfollow}>Abonné</Button>
            } else {
                followSomeone = <Button onClick={onClickFollow}>M'abonner</Button>;
            }
        }
    };

    const toggle = type => {
        if (typeof type === "string") {
            setIsFollowing(type === 'following');
        }
        setModal(!modal);
    };

    const onClickFollow = () => {
        postFollowSomeone(username);
    };

    const onClickUnfollow = () => {
        postUnfollowSomeone(username);
    };

    const profileDetail = props.profileDetail !== null ? (
        <Card>
            <CardBody>
                <CardTitle><h1 className="username">{props.profileDetail.username}</h1></CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    <h3>{props.profileDetail.firstName} {props.profileDetail.lastName}</h3>
                </CardSubtitle>
                <CardText>
                    {props.profileDetail.email}
                </CardText>
            </CardBody>
        </Card>
    ) : null;

    const followersDetail = props.followersDetail !== null ? (
        <div className="followers">
            Abonnés :
            <div>
                <Button name="followers" onClick={() => toggle("followers")}>
                    {props.followersDetail.length}
                </Button>
            </div>
        </div>
    ) : null;

    const followingDetail = props.followingDetail !== null ? (
        <div className="following">
            Abonnements:
            <div>
                <Button name="following" onClick={() => toggle("following")}>
                    {props.followingDetail.length}
                </Button>
            </div>
        </div>
    ) : null;

    const sub = isFollowing !== null ?
            <Subscriptions profileList={isFollowing ? props.followingDetail : props.followersDetail}
                           isOpen={modal}
                           toggle={toggle}
                           isFollowing={isFollowing}/> : null;

    return (
        <Card className="test">
            {profileDetail}
            {followersDetail}
            {followingDetail}
            {sub}
            {followSomeone}
        </Card>
    )
};

const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail,
        followersDetail: state.profile.followersDetail,
        followingDetail: state.profile.followingDetail,
        followSomeone: state.profile.followSomeoneDetail,
        unfollowSomeone: state.profile.unfollowSomeoneDetail,
        errorMessage: state.profile.errorMessage
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchProfileInfo: username => dispatch(actions.fetchProfileInfo(username)),
        fetchFollowing: username => dispatch(actions.fetchFollowing(username)),
        fetchFollowers: username => dispatch(actions.fetchFollowers(username)),
        postFollowSomeone: username => dispatch(actions.postFollowSomeone(username)),
        postUnfollowSomeone: username => dispatch(actions.postUnfollowSomeone(username)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
