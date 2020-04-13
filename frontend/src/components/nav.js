import React from "react";
// import ReactDOM from "react-dom";

import { NavLink } from "react-router-dom";
import M from "materialize-css";

class GenNav extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
        return(
        <div classname="navb" >
            <h1>APD BANK</h1>
            <a className="logout" href="#">
                  <NavLink to="/" exact>
                    Logout
                  </NavLink>
            </a>
            <button onClick = { window.location.href = "/predict" } id = { "b" } > Predict </button> 
            <button onClick = { window.location.href = "/query" } id = { "b" } > Query </button> 
        </div > 
        )
    }
}

export default GenNav;