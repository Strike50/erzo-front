import './profile.css';
import React, {useEffect, useState,} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";
import {useParams} from "react-router";
import {useKeycloak} from "react-keycloak";
import EditProfile from "./edit-profile";

export const Profile = props => {
    const {fetchProfile, postFollowSomeone, postUnfollowSomeone, loading} = props;
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const {username} = useParams();
    const {preferred_username} = useKeycloak().keycloak.tokenParsed;

    useEffect(() => {
        fetchProfile(username);
    }, [username, loading]);

    const checkProfileButtonStatus = isOwnProfile => {
        if (isOwnProfile) {
            return (<Button onClick={toggleEdit}>Modifier mon profil</Button>);
        } else {
            if (props.followersDetail.filter(follower => {
                return follower.username.includes(preferred_username)
            }).length === 1) {
                return (<Button onClick={onClickUnfollow}>Abonné</Button>);
            } else {
                return (<Button onClick={onClickFollow}>M'abonner</Button>);
            }
        }
    };

    const toggle = type => {
        if (typeof type === "string") {
            setIsFollowing(type === 'following');
        }
        setModal(!modal);
    };
    const toggleEdit = () => {
        setEditModal(!editModal);
    };



    const onClickFollow = () => {
        postFollowSomeone(props.profileDetail.id);
        checkProfileButtonStatus(false);
    };

    const onClickUnfollow = () => {
        postUnfollowSomeone(props.profileDetail.id);
        checkProfileButtonStatus(false);
    };
    const profileDetail = props.profileDetail !== null ? (
        <Card>
            <CardBody>
                <img alt="Photo de profil" src={ require('./emptyProfile.png') } width={100} height={100} className="profilePicture"/>
                <CardTitle><h1 className="username">{props.profileDetail.username}</h1></CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    <h3>{props.profileDetail.firstName} {props.profileDetail.lastName}</h3>
                </CardSubtitle>
                <CardText>
                    {props.profileDetail.email}
                    {props.profileDetail.description}
                </CardText>
            </CardBody>
        </Card>
    ) : null;

    const followersDetailDiv = props.followersDetail !== null ? (
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

    const subscriptions = isFollowing !== null ?
        <Subscriptions profileList={isFollowing ? props.followingDetail : props.followersDetail}
                       isOpen={modal}
                       toggle={toggle}
                       isFollowing={isFollowing}/> : null;

    const editProfile = editModal ?
        <EditProfile profileDetail={props.profileDetail} editModal={editModal} toggleEdit={toggleEdit}/> : null;

    return (
        <Card className="test">
            {profileDetail}
            {followersDetailDiv}
            {followingDetail}
            {subscriptions}
            {checkProfileButtonStatus(username === preferred_username)}
            {editProfile}
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
        editProfileDetail: state.profile.editProfileDetail,
        errorMessage: state.profile.errorMessage,
        loadingFollowers: state.profile.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: username => dispatch(actions.fetchProfile(username)),
        postFollowSomeone: username => dispatch(actions.postFollowSomeone(username)),
        postUnfollowSomeone: username => dispatch(actions.postUnfollowSomeone(username)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
