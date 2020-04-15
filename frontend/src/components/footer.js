import React from "react";
// import ReactDOM from "react-dom";

// import { NavLink } from "react-router-dom";
import M from "materialize-css";

class Footer extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
        return(
        <footer className="page-footer yellow darken-4 brown-text text-darken-4">
                <h6 ><b> Web Technologies II Laboratory </b></h6> 
                <p > Deepika Karanji, Pragnya Sridhar, Aprameya Kulkarni </p> 
        </footer>
        )
    }
}

export default Footer;