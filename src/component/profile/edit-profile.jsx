import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {connect} from "react-redux";
import {useKeycloak} from "react-keycloak";
import Calendar from 'react-calendar';
import * as actions from '../../store/actions/index';

export const EditProfile = props => {
    const {profileDetail} = props;
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [pseudoValue, setPseudoValue] = useState(profileDetail.username);
    const {sub} = useKeycloak().keycloak.tokenParsed;
    const [pickDateValue, setPickDateValue] = useState(new Date());

    useEffect(() => {
        if(profileDetail !== undefined && profileDetail !== null) {
            setFirstNameValue(profileDetail.firstName !== null ? profileDetail.firstName : '');
            setLastNameValue(profileDetail.lastName !== null ? profileDetail.lastName : '');
            setDescriptionValue(profileDetail.description !== null ? profileDetail.description : '');
            setPseudoValue(profileDetail.username);
        }
    },[profileDetail]);

    const handleInputChange = e => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'firstNameValue':
                setFirstNameValue(value);break;
            case 'lastNameValue':
                setLastNameValue(value);break;
            case 'descriptionValue':
                setDescriptionValue(value);break;
            case 'pseudoValue':
                setPseudoValue(value);break;
            default:
                break;
        }
    };
     const onChange = () => {
         setPickDateValue(pickDateValue);
     };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            id: sub,
            username: pseudoValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            description: descriptionValue,
            dateOfBirth: pickDateValue.toLocaleDateString(),
        };
        props.putEditProfile(user)
            .then(response => {
                if (response.response !== undefined && response.response.status !== undefined) {
                    const status = response.response.status;
                    if (status === 409 ) {
                        alert('Les informations n\'ont pas été mis à jour car le pseudo est déjà utilisé par un autre utilisateur');
                    }
                } else {
                    props.toggleEdit();
                }
            });
    };
    return (

        <Modal isOpen={props.editModal} toggle={props.toggleEdit}>
            <ModalBody>
                <FormGroup>
                    <Form>
                        <h6>Prénom</h6>
                        <Input type="text" value={firstNameValue} onChange={handleInputChange} name="firstNameValue"/>
                        <h6>Nom</h6>
                        <Input type="text" value={lastNameValue} onChange={handleInputChange} name="lastNameValue"/>
                        <h6>Pseudo</h6>
                        <Input type="text" value={pseudoValue} onChange={handleInputChange} name="pseudoValue"/>
                        <h6>Description</h6>
                        <Input type="text" value={descriptionValue}  onChange={handleInputChange} name="descriptionValue"/>
                        <h6>Date de naissance</h6>
                        <Calendar
                            onChange={onChange}
                            value={pickDateValue}
                        />
                        <Button onClick={handleSubmit}>Valider</Button>
                    </Form>
                </FormGroup>
            </ModalBody>
        </Modal>
    )
};


const mapDispatchToProps = dispatch => {
    return {
        putEditProfile: user => dispatch(actions.putEditProfile(user)),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(EditProfile);
