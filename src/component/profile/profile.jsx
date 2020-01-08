import './profile.css';
import React from 'react';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap"
import Subscriptions from "./subscriptions/subscriptions";

class Profile extends React.Component {
    state = {
        modal: false,
        isFollowing: null
    };
    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchFollowers();
        this.props.fetchFollowing();
        // Test des routes existantes
    };

    toggle = type => {
        let isFollowing = null;
        if (typeof type === "string") {
            isFollowing = type === 'following';
        }
        const modal = !this.state.modal;
        this.setState({
            ...this.state,
            modal,
            isFollowing
        })
    };

    render() {
        const profileDetail = this.props.profileDetail !== null ? (
            <Card>
                <CardBody>
                    <CardTitle><h1 className="username">{this.props.profileDetail.username}</h1></CardTitle>
                    <CardSubtitle className="mb-2 text-muted"><h3>{this.props.profileDetail.firstName} {this.props.profileDetail.lastName}</h3></CardSubtitle>
                    <CardText>
                        {this.props.profileDetail.email}
                    </CardText>
                </CardBody>
            </Card>
        ) : null;

        const followersDetail = this.props.followersDetail !== null ? (
                <div className="followers">
                    Abonnés :
                    <div className="number">
                        <button name="followers" onClick={() => this.toggle("followers")}>
                            {this.props.followersDetail.length}
                        </button>
                    </div>
                </div>
        ) : null;

        const followingDetail = this.props.followingDetail !== null ? (
                <div className="following">
                    Abonnements:
                    <div className="number">
                        <button name="following" onClick={() => this.toggle("following")}>
                            {this.props.followingDetail.length}
                        </button>
                    </div>
                </div>
        ) : null;

        const sub = this.state.isFollowing !== null ?
            <Subscriptions profileList={this.state.isFollowing ? this.props.followingDetail : this.props.followersDetail}
                           isOpen={this.state.modal}
                           toggle={this.toggle}
                           isFollowing={this.state.isFollowing}/> : null;

        return (
            <Card className="test">
                {profileDetail}
                {followersDetail}
                {followingDetail}
                {sub}
            </Card>
        )
    }
}
const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail,
        followersDetail: state.profile.followersDetail,
        followingDetail: state.profile.followingDetail,
        errorMessage: state.profile.errorMessage
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(actions.fetchProfile()),
        fetchFollowers: () => dispatch(actions.fetchFollowers()),
        fetchFollowing: () => dispatch(actions.fetchFollowing())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
