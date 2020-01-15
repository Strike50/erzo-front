import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import {useKeycloak} from "react-keycloak";

export const EditProfile = props => {

    const [firstName, setFirstName] = useState(props.profileDetail.firstName);
    const [lastName, setLastName] = useState(props.profileDetail.lastName);
    const [description, setDescription] = useState(props.profileDetail.description);
    const [dateOfBirth, setDateOfBirth] = useState(props.profileDetail.dateOfBirth);
    const {sub} = useKeycloak().keycloak.tokenParsed;

    const handleInputChange = e => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'firstName':
                setFirstName(value);break;
            case 'lastName':
                setLastName(value);break;
            case 'description':
                setDescription(value);break;
            case 'naissance':
                setDateOfBirth(value);break;
            default:
                break;
        }
    };

    const handleSubmit = e => {
        const user = {
            id: sub,
            firstName,
            lastName,
            description,
            dateOfBirth,
        };
        props.putEditProfile(user);
        e.preventDefault();
    };
    
    return (
        <Modal isOpen={props.editModal} toggle={props.toggleEdit}>
            <ModalBody>
                <FormGroup>
                    <Form onSubmit={handleSubmit}>
                        <h6>Prénom</h6>
                        <Input type="text" value={firstName} onChange={handleInputChange} name="firstName"/>
                        <h6>Nom</h6>
                        <Input type="text" value={lastName} onChange={handleInputChange} name="lastName"/>
                        <h6>Description</h6>
                        <Input type="text" value={description}  onChange={handleInputChange} name="description"/>
                        <h6>Date de naissance</h6>
                        <Input type="text" value={dateOfBirth} onChange={handleInputChange} name="dateOfBirth"/>
                        <Button type="submit">Valider</Button>
                    </Form>
                </FormGroup>
            </ModalBody>
        </Modal>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        putEditProfile: user => dispatch (actions.putEditProfile(user)),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(EditProfile);
