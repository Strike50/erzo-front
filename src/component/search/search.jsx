import React from 'react';
import {Form, FormGroup, Input, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import SearchUser from "./searchUser/searchUser";

class Search extends React.Component {

    state = {
        contentSearch: '',
        typingTimeout: 0
    };

    handleSearch = e => {
        const contentSearch = e.target.value;
        if (contentSearch === "") {
            this.props.resetUserListSearch();
        }
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
        this.setState({
            ...this.state,
            contentSearch,
            typingTimeout: setTimeout(() => {
                if (contentSearch !== '') {
                    this.props.searchUser(contentSearch);
                }
            }, 700)
        });

    };

    onClickClearSearch = () => {
        console.log('oui')
        this.setState({
            ...this.state,
            contentSearch: ''
        });
        this.props.resetUserListSearch();
    };

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <Input type="text" value={this.state.contentSearch} onChange={this.handleSearch}
                           placeholder="Rechercher un utilisateur ..." className="mr-sm-2" />
                           <ListGroup>
                               {this.props.userList !== [] ? this.props.userList.map((user, i) => (
                                   <ListGroupItem key={`userSearch-${i}`}>
                                       <SearchUser user={user} onClick={this.onClickClearSearch}/>
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
        searchUser: contentSearch => dispatch(actions.searchUser(contentSearch)),
        resetUserListSearch: () => dispatch(actions.resetUserListSearch())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);
