import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import Switch from "react-switch";
import * as actions from '../../store/actions/index'
import {eTheme} from './theme/theme';
import {connect} from "react-redux";
import {useKeycloak} from "react-keycloak";

export const EditProfile = props => {
    
    const [move, setMove] = useState(false);
    const [username, setUsername] = useState(props.profileDetail.username);
    const [firstName, setFirstName] = useState(props.profileDetail.firstName);
    const [lastName, setLastName] = useState(props.profileDetail.lastName);
    const [email, setEmail] = useState(props.profileDetail.email);
    const [description, setDescription] = useState(props.profileDetail.description);
    const [dateOfBirth, setDateOfBirth] = useState(props.profileDetail.dateOfBirth);
    const [theme, setTheme] = useState(eTheme.BASIC);
    const {sub} = useKeycloak().keycloak.tokenParsed;

    const handleChange = () => {
        setTheme(move ? eTheme.DARK : eTheme.BASIC);
        setMove(!move);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'username':
                setUsername(value);break;
            case 'firstName':
                setFirstName(value);break;
            case 'lastName':
                setLastName(value);break;
            case 'email':
                setEmail(value);break;
            case 'description':
                setDescription(value);break;
            case 'naissance':
                setDateOfBirth(value);break;
        }
    };

    const handleSubmit = e => {
        console.log("Pseudo : "+ username + " Nom : "+ lastName+ " Prenom : " + firstName + " mail : " + email + " description : " + description + " naissance : "+ dateOfBirth);
        e.preventDefault();
        if (username && firstName && lastName && email && description && dateOfBirth) {
            const user = {
                id: sub,
                username,
                firstName,
                lastName,
                email,
                description,
                dateOfBirth,
                theme,
                pictureId: props.profileDetail.pictureId
            };
            console.log('user', user);
            props.putEditProfile(user)
        }
    };
    
    return (
        <Modal isOpen={props.editModal} toggle={props.toggleEdit}>
            <ModalBody>
                <FormGroup>
                    <Form onSubmit={handleSubmit}>
                        <h6>Pseudo</h6>
                        <Input type="text" value={username}  onChange={handleInputChange} name="username"/>
                        <h6>Prénom</h6>
                        <Input type="text" value={firstName} onChange={handleInputChange} name="firstName"/>
                        <h6>Nom</h6>
                        <Input type="text" value={lastName} onChange={handleInputChange} name="lastName"/>
                        <h6>Email</h6>
                        <Input type="text" value={email} onChange={handleInputChange} name="email"/>
                        <h6>Description</h6>
                        <Input type="text" value={description}  onChange={handleInputChange} name="description"/>
                        <h6>Date de naissance</h6
                        ><Input type="text" value={dateOfBirth} onChange={handleInputChange} name="dateOfBirth"/>
                        <h6>Theme</h6>
                        <label>
                            <span>Light</span>
                            <Switch onChange={handleChange} checked={move} onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={30}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={20}
                                    width={48}
                                    className="react-switch"
                                    id="material-switch"/>
                            <span>Dark</span>
                        </label>
                        <div className="editPictureClass">
                        <img alt='Photo de profil' src={ require('./emptyProfile.png') } width={100} height={100} />
                        <Input type="file" accept="image/*,video/*"/>
                        <Button type="submit">Valider</Button>
                        </div>
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