import React from 'react';
import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';
import Carousel from '../components/carousel.js';


import M from "materialize-css";


class Dashboard extends React.Component{
    render() {
        return ( 
            <>
            <GenNav />
            <body>
            <Carousel />
            </body>
            <Footer />
            


            </>
        )
    };
}
export default Dashboard;