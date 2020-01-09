import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom";


export const Subscriptions = props => {
    const title = props.isFollowing ? 'Abonnements': 'Abonnés';
    return(
        <Modal isOpen={props.isOpen} toggle={props.toggle} className="">
            <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
            <ModalBody>
                <ListGroup>
                    {props.profileList.map((user, i) => (
                        <ListGroupItem key={`userSearch-${i}`}>
                            <NavLink to={`/profil/${user.username}`} exact>
                                {user.firstName} {user.lastName} - {user.username}
                            </NavLink>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </ModalBody>
        </Modal>
    );

};

export default Subscriptions;

Subscriptions.propTypes = {
    profileList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    isFollowing: PropTypes.bool.isRequired,
};