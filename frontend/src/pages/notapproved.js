import React from "react";
// import ReactDOM from "react-dom";

// import { NavLink } from "react-router-dom";
import M from "materialize-css";
import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';

class NotApproved extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
        return(
        <>
        <GenNav />
        <h2>We are sorry to inform you that your loan has <b>not</b> been approved. Thank you for your time and patience.
        Any inconvinience is highly regretted.</h2>
        <Footer />
        </>
        )
    }
}

export default NotApproved;