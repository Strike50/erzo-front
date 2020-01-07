import React from 'react';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'
import {Card} from "reactstrap";

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchFollowers();
    };

    render() {
        const profileDetail = this.props.profileDetail !== null ? (
            <Card>
                <div>{this.props.profileDetail.username}</div>
                <div>{this.props.profileDetail.email}</div>
                <div>{this.props.profileDetail.firstName}</div>
                <div>{this.props.profileDetail.lastName}</div>
            </Card>
        ) : null;

        const followersDetail = this.props.followersDetail !== null ? (
            <Card>
                <div>{this.props.followersDetail.followers}</div>
            </Card>
        ) : null;

        return (
            <>
                {profileDetail}
                {followersDetail}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail,
        followersDetail: state.profile.followersDetail,
        errorMessage: state.profile.errorMessage
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(actions.fetchProfile()),
        fetchFollowers: () => dispatch(actions.fetchFollowers())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
