import React from 'react';
import M from "materialize-css";


import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';
import AppForm from '../components/appform.js';

class Predict extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
        return(
        <>
        <GenNav />
        <div className="row">
            <div className = "col s10 offset-s1">
            <h3>Predict Loan Approval</h3>
            </div>
        </div>
        
        <AppForm />
        <div></div>
        <Footer />
        </>
        )
    }
}

export default Predict;