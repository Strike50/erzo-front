import React from 'react';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'
import {Card} from "reactstrap";

class Profile extends React.Component {

    componentDidMount() {
        this.props.fetchProfile();
    };

    render() {
        const profileDetail = this.props.profileDetail;
        console.log(this.props);
        return profileDetail != null? (
            <Card>
                <div>
                    <div>{profileDetail.username}</div>
                    <div>{profileDetail.email}</div>
                    <div>{profileDetail.firstName}</div>
                    <div>{profileDetail.lastName}</div>
                </div>
            </Card>
        ) :null;
    }
}

const mapStateToProps = state => {
    return {
        profileDetail: state.profile.profileDetail,
        errorMessage: state.profile.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(actions.fetchProfile())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
