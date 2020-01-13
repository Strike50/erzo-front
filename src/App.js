import React from 'react';
import './App.css';
import Routes from './component/routes/routes';
import Header from "./component/header/header";
import {BrowserRouter as Router} from "react-router-dom";
import {useKeycloak} from "react-keycloak";
import axiosOrder from "./axios-order";

function App() {

    const {keycloak, initialized} = useKeycloak();

    if (initialized) {
        axiosOrder.defaults.headers.common = {'Authorization': 'Bearer ' + keycloak.token};
    }

    return initialized ? (
        <div className="App">
            <Router>
                <Header/>
                <Routes/>
            </Router>
        </div>
    ) : null;
}

export default App;
