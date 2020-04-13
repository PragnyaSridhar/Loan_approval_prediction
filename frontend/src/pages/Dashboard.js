import React from 'react';
import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';

class Dashboard {
    logout() {
        console.log("logout");
    }
    approval() {
        // go to the big form page
    }
    query() {
        // go to the query page
    }
    render() {
        return ( 
            <>
            <GenNav />
            <div id = { "images" } > 
            { /* get images and put it here - multistage download */ }
            </div> 
            <Footer />
            </>
        )
    }
}

export default Dashboard;