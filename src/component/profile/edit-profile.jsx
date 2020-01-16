import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import {useKeycloak} from "react-keycloak";
import Calendar from 'react-calendar';
export const EditProfile = props => {

    const [firstName, setFirstName] = useState(props.profileDetail.firstName);
    const [lastName, setLastName] = useState(props.profileDetail.lastName);
    const [description, setDescription] = useState(props.profileDetail.description);
    const {sub} = useKeycloak().keycloak.tokenParsed;
    const [pickDate, setPickDate] = useState(props.profileDetail.dateOfBirth);
    const handleInputChange = e => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'firstName':
                setFirstName(value);break;
            case 'lastName':
                setLastName(value);break;
            case 'description':
                setDescription(value);break;
            default:
                break;
        }
    };
     const onChange = () => {
         setPickDate(pickDate)
     }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            id: sub,
            firstName,
            lastName,
            description,
            dateOfBirth: pickDate.toISOString(),
        };
        props.putEditProfile(user);
    };
    return (
        <Modal isOpen={props.editModal} toggle={props.toggleEdit}>
            <ModalBody>
                <FormGroup>
                    <Form>
                        <h6>Prénom</h6>
                        <Input type="text" value={firstName} onChange={handleInputChange} name="firstName"/>
                        <h6>Nom</h6>
                        <Input type="text" value={lastName} onChange={handleInputChange} name="lastName"/>
                        <h6>Description</h6>
                        <Input type="text" value={description}  onChange={handleInputChange} name="description"/>
                        <h6>Date de naissance</h6>
                        <Calendar
                            onChange={onChange}
                            value={pickDate}
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
        putEditProfile: user => dispatch (actions.putEditProfile(user)),
    }
};

export default connect(
    mapDispatchToProps
)(EditProfile);
