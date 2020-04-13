import React from 'react';
import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';

class Dashboard extends React.Component{
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
    };
}
export default Dashboard;