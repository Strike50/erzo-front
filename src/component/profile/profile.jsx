import './profile.css';

import React, {useEffect, useState,} from 'react';
import {connect} from "react-redux";
import ExifOrientationImg from 'react-exif-orientation-img';
import Files from "react-files";
import {Redirect, useParams} from "react-router";
import {useKeycloak} from "react-keycloak";
import Switch from "react-switch";
import {Button, Card, CardSubtitle, CardText, CardTitle, Col, Row,} from "reactstrap"

import Subscriptions from "./subscriptions/subscriptions";
import OwnTimeline from "./own-timeline/own-timeline";
import EditProfile from "./edit-profile";
import {eTheme} from "../../enum/theme";
import * as actions from '../../store/actions'
import {eMediaType} from "../../enum/mediaType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axiosOrder from "../../axios-order";

export const Profile = props => {
    const {resetProfile, fetchProfile, postFollowSomeone, postUnfollowSomeone, patchTheme, profileDetail, getMedia} = props;
    const [wrongUsernameRedirect, setWrongUsernameRedirect] = useState(null);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const [theme, setTheme] = useState(eTheme.BASIC);
    const [move, setMove] = useState(false);
    const [userId, setUserId] = useState(null);
    const [mediaURL, setMediaURL] = useState('/emptyProfile.png');
    const {username} = useParams();
    const {preferred_username} = useKeycloak().keycloak.tokenParsed;

    useEffect(() => {
        resetProfile();
        setMediaURL('/emptyProfile.png');
        fetchProfile(username)
            .then(res => {
                setUserId(res.data.user.id);
                const mediaId = res.data.user.mediaId;
                if (mediaId !== null) {
                    getMedia(mediaId, eMediaType.IMAGE)
                        .then(blobUrl => {
                            setMediaURL(blobUrl);
                        });
                }
                checkSwitchThemeStatus(undefined);
            })
            .catch(() => {
                setWrongUsernameRedirect(<Redirect to={"/"} />);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const signal = axiosOrder.CancelToken.source();

    useEffect(() => {
        return (() => {
            signal.cancel('Api is being canceled');
        })
    });

    const checkSwitchThemeStatus = themeParam => {
        if (themeParam !== undefined) {
            themeParam === eTheme.DARK ? setMove(true): setMove(false);
            setTheme(themeParam === eTheme.DARK ? eTheme.DARK : eTheme.BASIC );
          if (themeParam === "DARK"){
            document.body.className = "dark";
          } else {
            document.body.className = "basictheme";
          }
        }
    };

    const checkProfileButtonStatus = isOwnProfile => {
        if (isOwnProfile) {
            return (<Button onClick={toggleEdit} id="modifprof">Modifier mon profil</Button>);
        } else {
            if (props.followersDetail !== {}) {
                if (props.followersDetail.filter(follower => {
                    return follower.username.includes(preferred_username)
                }).length === 1) {
                    return (<Button onClick={onClickUnfollow}>Abonné</Button>);
                } else {
                    return (<Button onClick={onClickFollow}>M'abonner</Button>);
                }
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
        postFollowSomeone(profileDetail.id)
            .then(() => {
                props.fetchFollowers(profileDetail.id);
                checkProfileButtonStatus(false);
            });
    };

    const onClickUnfollow = () => {
        postUnfollowSomeone(profileDetail.id)
            .then(() => {
                props.fetchFollowers(profileDetail.id);
                checkProfileButtonStatus(false);
            });
    };

    const handleChange = () => {
        setTheme(move ? eTheme.DARK : eTheme.BASIC);
        patchTheme(theme);
        setMove(!move);
      if (theme === "DARK"){
        document.getElementById("root").className = "dark";
      } else {
        document.getElementById("root").className = "basictheme";
      }
    };

    const handleProfilePicture = e => {
        if (e.length === 1) {
            setMediaURL(e[0].preview.url);
            props.postMedia(e[0], eMediaType.IMAGE)
                .then(response => {
                    const objectPicture = {
                        id: response.headers['content-location'],
                        type: eMediaType.IMAGE
                    };
                    props.patchPicture(objectPicture);
                })
        }
    };

    const imgDisplay = username === preferred_username ? (
        <Files
            className="file"
            accepts={['image/*']}
            onChange={handleProfilePicture}
            multiple={false}
        >
            <ExifOrientationImg alt={`Profil de ${username}`} src={mediaURL} width={100} height={100}/>
        </Files>
    ) : (<ExifOrientationImg alt={`Profil de ${username}`} src={mediaURL} width={100} height={100}/>);

    const profileDetailDisplay = profileDetail !== null ? (
        <Card>
            <Row>
                <Col>
                    <div className="editPictureClass">
                        {imgDisplay}
                    </div>
                </Col>
                <Col>
                    <CardTitle><h1 className="username">{profileDetail.username}</h1></CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                        <h3>{profileDetail.firstName} {profileDetail.lastName}</h3>
                    </CardSubtitle>
                    <CardText>
                        {profileDetail.email}
                    </CardText>
                    <CardText>
                    {profileDetail.description}
                    </CardText>
                    <CardText>
                        <FontAwesomeIcon icon="birthday-cake" />
                        {new Date(profileDetail.dateOfBirth).toLocaleDateString('fr-FR')}
                    </CardText>
                </Col>
            </Row>
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

    const checkSwitchThemeButtonStatus = isOwnProfile => {
       if (false) {
           return (<label className="SwitchButton">
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
           </label>);
       } else {
           return null;
       }
    };

    return (
        <div>
            <Card className="test">
                {wrongUsernameRedirect}
                {profileDetailDisplay}
                {followersDetailDiv}
                {followingDetail}
                {subscriptions}
                {checkProfileButtonStatus(username === preferred_username)}
                {editProfile}
                {checkSwitchThemeButtonStatus(username === preferred_username)}
            </Card>
            <OwnTimeline userId={userId}/>
        </div>
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
        resetProfile: () => dispatch(actions.resetProfile()),
        getMedia: (id, type) => dispatch(actions.getMedia(id, type)),
        postMedia: (file, type) => dispatch(actions.postMedia(file, type)),
        fetchFollowers: id => dispatch(actions.fetchFollowers(id))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
