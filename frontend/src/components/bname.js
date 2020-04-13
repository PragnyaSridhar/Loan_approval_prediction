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
        <header className = "section yellow darken-3">
            <div id = "title" className="brown-text text-darken-4">
            <h1><b>APD Bank</b></h1>
            </div> 
        </header> 
    )
    }
}

export default Bname;