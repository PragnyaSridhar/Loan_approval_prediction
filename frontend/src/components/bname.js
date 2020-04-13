import React from "react";
import "materialize-css/dist/css/materialize.min.css";
// import { NavLink } from "react-router-dom";
import M from "materialize-css";

class Bname extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
    return(
    <header >
        <nav className = "nav-wrapper yellow darken-3">
            <div id = "title" >
            <h1><a href ="#top" > APD Bank </a></h1>
            </div> 
        </nav> 
    </header> 
    )
    }
}

export default Bname;