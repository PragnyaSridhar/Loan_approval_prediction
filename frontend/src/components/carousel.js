import React from "react";
import M from "materialize-css";

class Carousel extends React.Component {
    componentDidMount(){
        var instance = M.Carousel.init({
            fullWidth: true
        });      
    }

    render(){
        return(
        <div id="carousel">
            
        </div>
        );
    }
}

export default Carousel;