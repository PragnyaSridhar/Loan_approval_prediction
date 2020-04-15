import React from 'react';
import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';
import Carousel from '../components/carousel.js';

class Dashboard extends React.Component{
    render() {
        if(document.cookie!==""){
        return ( 
            <>
            <GenNav />
            <div className="bod">
            <Carousel />
            </div>
            <Footer />
            </>
        )
        }
        else{
            alert("Please login to continue");
            window.location.href="/";
        }
    };
}
export default Dashboard;