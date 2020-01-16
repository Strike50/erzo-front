import './App.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {useKeycloak} from "react-keycloak";
import Routes from './component/routes/routes';
import Header from "./component/header/header";
import axiosOrder from "./axios-order";

function App() {

    const {keycloak, initialized} = useKeycloak();

    if (initialized) {
        axiosOrder.defaults.headers.common = {'Authorization': 'Bearer ' + keycloak.token};
    }

    return initialized ? (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes/>
            </BrowserRouter>
        </div>
    ) : null;
}

export default App;
