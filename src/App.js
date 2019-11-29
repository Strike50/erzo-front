import React from 'react';
import './App.css';
import Routes from './component/routes/routes';
import Header from "./component/header/header";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
