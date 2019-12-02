import React, {useEffect} from 'react';
import Card from "react-bootstrap/Card";
import {connect} from "react-redux";

import * as actions from '../../store/actions/index'

export const Profile = props => {

    useEffect(() => {
        props.fetchProfile();
    });

    const profileDetail = props.profileDetail;

    console.log(props);

    return (
        <Card>
            <div>
                <div>{profileDetail.description}</div>
                <div>{profileDetail.birthday}</div>
                <div>{profileDetail.picture}</div>
            </div>
        </Card>
    );
};
const mapStateToProps = state => ({
    profileDetail: state.profile.profileDetail,
    errorMessage: state.profile.errorMessage
});

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(actions.fetchProfile())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
