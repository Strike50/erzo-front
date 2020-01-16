import './profile.css';
import React, {useEffect, useState,} from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions'
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";
import OwnTimeline from "./own-timeline/own-timeline";
import {Redirect, useParams} from "react-router";
import {useKeycloak} from "react-keycloak";
import EditProfile from "./edit-profile";
import Switch from "react-switch";
import {eTheme} from "../../enum/theme";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Files from "react-files";

export const Profile = props => {
    const {resetProfile, fetchProfile, postFollowSomeone, postUnfollowSomeone, loading, patchTheme, profileDetail} = props;
    const [wrongUsernameRedirect, setWrongUsernameRedirect] = useState(null);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const [theme, setTheme] = useState(eTheme.BASIC);
    const [move, setMove] = useState(false);
    const {username} = useParams();
    const {preferred_username} = useKeycloak().keycloak.tokenParsed;

    useEffect(() => {
        resetProfile();
        fetchProfile(username)
            .then(res => {
                checkSwitchThemeStatus(res.data.user.theme);
            })
            .catch(() => {
                setWrongUsernameRedirect(<Redirect to={"/"} />);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, loading]);

    const checkSwitchThemeStatus = themeParam => {
        if (themeParam !== undefined) {
            console.log(themeParam);
            themeParam === eTheme.DARK ? setMove(true): setMove(false);
            setTheme(themeParam === eTheme.DARK ? eTheme.DARK : eTheme.BASIC );

        }
        else {
            console.log('On est dans le ELSE');
        }
    };

    const checkProfileButtonStatus = isOwnProfile => {
        if (isOwnProfile) {
            return (<Button onClick={toggleEdit} id="modifprof">Modifier mon profil</Button>);
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
        postFollowSomeone(profileDetail.id);
        checkProfileButtonStatus(false);
    };

    const onClickUnfollow = () => {
        postUnfollowSomeone(profileDetail.id);
        checkProfileButtonStatus(false);
    };

    const handleChange = () => {
        setTheme(move ? eTheme.DARK : eTheme.BASIC);
        console.log("handle change theme " + theme);
        patchTheme(theme);
        setMove(!move);
    };

    const profileDetailDisplay = profileDetail !== null ? (
        <Card>
            <div className="editPictureClass">
                <img alt='' src={'../../emptyProfile.png'} width={100} height={100}/>
                <Files
                    className="file"
                    accepts={['image/*', 'video/*']}
                    multiple={false}
                >
                    <FontAwesomeIcon icon="file-image"/>
                </Files>
            </div>
            <CardBody>
                <CardTitle><h1 className="username">{profileDetail.username}</h1></CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    <h3>{profileDetail.firstName} {profileDetail.lastName}</h3>
                </CardSubtitle>
                <CardText>
                    {profileDetail.email}
                </CardText>
                <CardText>
                {profileDetail.description}{profileDetail.theme}
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
        <EditProfile profileDetail={profileDetailDisplay} editModal={editModal} toggleEdit={toggleEdit}/> : null;

    const changeTheme =
        <label>
        <span>Basic</span>
        <Switch onChange={handleChange} checked={move} onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"/>
        <span>Dark</span>
</label>;

    return (
        <Card className="test">
            {wrongUsernameRedirect}
            {profileDetailDisplay}
            {followersDetailDiv}
            {followingDetail}
            {subscriptions}
            {checkProfileButtonStatus(username === preferred_username)}
            {editProfile}
            {changeTheme}
            <OwnTimeline/>
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
        patchThemeDetail: state.profile.patchThemeDetail,
        patchPictureDetail: state.profile.patchPictureDetail,
        errorMessage: state.profile.errorMessage,
        loadingFollowers: state.profile.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: username => dispatch(actions.fetchProfile(username)),
        postFollowSomeone: username => dispatch(actions.postFollowSomeone(username)),
        postUnfollowSomeone: username => dispatch(actions.postUnfollowSomeone(username)),
        patchTheme: theme => dispatch(actions.patchTheme(theme)),
        patchPicture: picture => dispatch(actions.patchPicture(picture)),
        resetProfile: () => dispatch(actions.resetProfile())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
