import React from "react";
// import ReactDOM from "react-dom";

import { NavLink } from "react-router-dom";
import M from "materialize-css";


class GenNav extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    delCookie(){
        console.log("deleted cookie");
        // var name = document.cookie["username"];
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    render() { 
        return(
            <header>
            <nav className = "nav-wrapper yellow darken-3 row center-align">
                <NavLink to="/dashboard" exact>
                <h4 id = "Navt" className="col s4 brown-text text-darken-4 top-align"><b>APD BANK</b></h4>
                </NavLink>
            <ul>
            <NavLink to="/predict" exact>
            <li className="waves-effect col s1 offset-s5 brown">
                    Predict
            </li>
            </NavLink>
            <NavLink to="/query" exact>
            <li className="col s1 brown">
                    Query
            </li>
            </NavLink>

            <NavLink to="/" exact>
            <li className="col s1 brown" onClick={this.delCookie}>
                    Logout
            </li>
            </NavLink>


            {/* <li className="col s1 center-align">
            <button className="logout" value="LOGOUT" className="hoverable waves-effect waves-light btn-small brown darken-4">
                  <NavLink to="/" exact>
                    Logout
                  </NavLink>
            </button>
            </li> */}
            </ul>
            {/* <button onClick = { window.location.href = "/predict" } id = { "b" } > Predict </button>  */}
            {/* <button onClick = { window.location.href = "/query" } id = { "b" } > Query </button>  */}
        </nav> 
        </header>
        )
    }
}

export default GenNav;