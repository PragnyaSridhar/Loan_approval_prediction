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
        <footer className="footer">
                <h6 ><b> Web Technologies II Laboratory </b></h6> 
                <p > Deepika Karanji, Pragnya Sridhar, Aprameya Kulkarni </p> 
        </footer>
        )
    }
}

export default Footer;