import './profile.css';
import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'
import {Button, Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";
import {useParams} from "react-router";
import {useKeycloak} from "react-keycloak";

export const Profile = props => {
    const {fetchProfileInfo,fetchFollowing, fetchFollowers, postFollowSomeone, postUnfollowSomeone, loading} = props;
    const [modal, setModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const [followSomeone, setFollowSomeone] = useState(null);
    const {username} = useParams();
    const {preferred_username} = useKeycloak().keycloak.tokenParsed;

    useEffect(() => {
        console.log('oui');
        if (username === preferred_username) {
            console.log('me');
            fetchProfileInfo("/me");
            fetchFollowing("");
            checkProfileButtonStatus(true);
        } else {
            console.log('distant');
            fetchProfileInfo(`/${username}`);
            fetchFollowing(`/${username}`);
            checkProfileButtonStatus(false);
        }
    }, [username, loading]);

    const checkProfileButtonStatus =  async isOwnProfile => {
        if (isOwnProfile) {
            fetchFollowers('');
            setFollowSomeone(<Button>Modifier mon profil</Button>);
        } else {
            await fetchFollowers(`/${username}`);
            if (props.followersDetail.filter(follower => {
                return follower.username.includes(preferred_username)
            }).length === 1) {
                setFollowSomeone(<Button onClick={onClickUnfollow}>Abonné</Button>);
            } else {
                setFollowSomeone(<Button onClick={onClickFollow}>M'abonner</Button>);
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
        errorMessage: state.profile.errorMessage,
        loadingFollowers: state.profile.loading
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