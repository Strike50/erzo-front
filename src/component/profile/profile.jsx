import React, {useEffect} from 'react';
import {fetchProfile} from './profile.reducer';
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import {connect} from "react-redux";
export const Profile = props => {

    useEffect(() => {
        props.fetchProfile();
    });
        return props.listProfile.map((profile,i) => (
            <Card id="$i">
                <div>
                    <div>{profile.description}</div>
                    <div>{profile.birthday}</div>
                    <div>{profile.picture}</div>
                </div>
            </Card>
        ));
};
const mapStateToProps = (storeState) => ({
    listProfile: storeState.profile.listProfile});

const mapDispatchToProps = { fetchProfile };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

Profile.propTypes = {
    description: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};