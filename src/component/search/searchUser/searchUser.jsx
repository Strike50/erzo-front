import './searchUser.css';

import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Card, Col} from "reactstrap";
import {NavLink} from "react-router-dom";
import ExifOrientationImg from 'react-exif-orientation-img';

import * as actions from "../../../store/actions";
import {eMediaType} from "../../../enum/mediaType";

export const SearchUser = props => {
    const {user, getMedia} = props;

    const [mediaUrl, setMediaUrl] = useState('/emptyProfile.png');

    useEffect(() => {
        if (user.mediaId !== null) {
            getMedia(user.mediaId, eMediaType.IMAGE)
                .then(blob => {
                    setMediaUrl(blob);
                })
        }
        setMediaUrl('/emptyProfile.png');
    }, [user, getMedia]);

    return (
        <Card className="card-post" onClick={props.onClick}>
            <NavLink to={`/profil/${user.username}`}>
                <Col>
                    <ExifOrientationImg alt="" className="imgSearch" src={mediaUrl}/>
                </Col>
                <Col>
                    {user.firstName} {user.lastName} - {user.username}
                </Col>
            </NavLink>
        </Card>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        getMedia: (id, type) => dispatch(actions.getMedia(id, type))
    }
};

export default connect (
    null,
    mapDispatchToProps
)(SearchUser)
