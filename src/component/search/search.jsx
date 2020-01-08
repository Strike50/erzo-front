import React from 'react';
import {Form, FormGroup, Input, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {NavLink} from "react-router-dom";

class Search extends React.Component {

    state = {
        contentSearch: ''
    };

    handleSearch = e => {
        const contentSearch = e.target.value;
        this.setState({
            ...this.state,
            contentSearch
        });
        if (contentSearch !== '') {
            this.props.searchUser(contentSearch);
            e.preventDefault();
        }
    };

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <Input type="text" value={this.state.contentSearch} onChange={this.handleSearch}
                           placeholder="Rechercher un utilisateur ..." className="mr-sm-2" />
                           <ListGroup>
                               {this.props.userList !== null && this.state.contentSearch !== '' ? this.props.userList.map((user, i) => (
                                   <ListGroupItem key={`userSearch-${i}`}>
                                       <NavLink to={`/profil/${user.username}`}>
                                           {user.firstName} {user.lastName} - {user.username}
                                       </NavLink>
                                   </ListGroupItem>
                               )) : null}
                           </ListGroup>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = (storeState) => ({
    userList: storeState.search.userList
});

const mapDispatchToProps = dispatch => {
    return {
        searchUser: contentSearch => dispatch(actions.searchUser(contentSearch))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);
