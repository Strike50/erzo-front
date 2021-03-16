import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import SearchUser from "./searchUser/searchUser";
import axiosOrder from "../../axios-order";

const Search = props => {

    const [contentSearch, setContentSearch] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(0);

    const signal = axiosOrder.CancelToken.source();

    useEffect(() => {
        return (() => {
            signal.cancel('Api is being canceled');
        })
    });

    const handleSearch = e => {
        const contentSearchEvent = e.target.value;
        if (contentSearchEvent === "") {
            props.resetUserListSearch();
        }
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setContentSearch(contentSearchEvent);
        setTypingTimeout( setTimeout(() => {
                if (contentSearch !== '') {
                    this.props.searchUser(contentSearch);
                }
            }, 700));
    };

    const onClickClearSearch = () => {
        setContentSearch('');
        props.resetUserListSearch();
    };

    return (
        <Form inline>
            <FormGroup>
                <Input type="text" value={contentSearch} onChange={handleSearch}
                       placeholder="Rechercher un utilisateur ..." className="mr-sm-2" />
                       <ListGroup>
                           {props.userList !== [] ? props.userList.map((user, i) => (
                               <ListGroupItem key={`userSearch-${i}`}>
                                   <SearchUser user={user} onClick={onClickClearSearch}/>
                               </ListGroupItem>
                           )) : null}
                       </ListGroup>
            </FormGroup>
        </Form>
    )
};

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
