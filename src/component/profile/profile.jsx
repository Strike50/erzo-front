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
        return (
            <Card>
                <div>
                    <div>{profileDetail.description}</div>
                    <div>{profileDetail.birthday}</div>
                    <div>{profileDetail.picture}</div>
                </div>
            </Card>
        );
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
