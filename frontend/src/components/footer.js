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
        <footer>
            <div id = "footer" className="card-panel yellow darken-4">
                <h6 > Web Technologies II Laboratory </h6> 
                <p > Deepika Karanji, Pragnya Sridhar, Aprameya Sirwar </p> 
            </div> 
        </footer>
        )
    }
}

export default Footer;