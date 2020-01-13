import './profile.css';
import React, {useEffect, useState,} from 'react';
import Switch from "react-switch";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody
} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";
import {useParams} from "react-router";
import {useKeycloak} from "react-keycloak";

export const Profile = props => {
    const {fetchProfile, postFollowSomeone, postUnfollowSomeone, loading, putEditProfile} = props;
    const [modal, setModal] = useState(false);
    const [state, setState] = useState(false);
    const [moove, setMoove] = useState(false);
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
    const handleChange = () => {
        setMoove(!moove);
    }
    const toggleEdit = () => {
        setEditModal(!editModal);
    };

    const onClickEdit = () => {
        putEditProfile(props.editProfileDetail.user);
        handleSubmit();
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

    const handleInputChange = e => {
        setState({
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (state.pseudo.trim() && state.prenom.trim() && state.nom.trim() && state.mail.trim() && state.description.trim() && state.naissance.trim()) {
            console.log(state);
            handleReset();
        }
    };

    const handleReset = () => {
        setState({
            pseudo: '',
            prenom: '',
            nom: '',
            mail: '',
            description: '',
            naissance: ''
        });
    };
    const editProfile = (
        <Modal isOpen={editModal} toggle={toggleEdit}>
            <ModalBody>
                <FormGroup>
                    <Form onSubmit={ handleSubmit }>
                    <h6>Pseudo</h6><Input type="text" defaultValue={props.profileDetail.username}  onChange={ handleInputChange } name="pseudo"/>
                    <h6>Prénom</h6><Input type="text" defaultValue={props.profileDetail.firstName} onChange={ handleInputChange } name="prenom"/>
                    <h6>Nom</h6><Input type="text" defaultValue={props.profileDetail.lastName} onChange={ handleInputChange } name="nom"/>
                    <h6>Email</h6><Input type="text" defaultValue={props.profileDetail.email} onChange={ handleInputChange } name="mail"/>
                    <h6>Description</h6><Input type="text" defaultValue={props.profileDetail.description}  onChange={ handleInputChange }name="description"/>
                    <h6>Date de naissance</h6><Input type="text" defaultValue={props.profileDetail.dateOfBirth} onChange={ handleInputChange } name="naissance"/>
                    <h6>Theme</h6>
                    <label>
                        <span>Light</span>
                        <Switch onChange={handleChange} checked={moove.valueOf()} onColor="#86d3ff"
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
                        {console.log(moove.valueOf())}
                        <span>Dark</span>
                    </label>
                    <button type="submit" onClick={console.log("State de tes morts "+ state)}>Valider</button>
                    </Form>
                </FormGroup>
            </ModalBody>
        </Modal> );

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
        putEditProfile: user => dispatch(actions.putEditProfile())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
