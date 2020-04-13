import React from "react";

import M from "materialize-css";

class Carousel extends React.Component {
    componentDidMount(){
        M.AutoInit();  
        this.multi(1); 
    }

    show(){
        if(this.status === 200 && this.readyState === 4){
            // console.log("here");
            // var doc=document.getElementById("imgs");
            // var img = new Image();
            // var im = this.response;
            // var url = window.URL.createObjectURL(this.response);
            // console.log(im);
            // img.source = url;
            // doc.appendChild(img);
            // alert("done");

            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var d = document.getElementById("imgs");
            d.innerHTML += '<img class="image" height="350" width="450"/>';
            var im = document.querySelectorAll(".image");
            var l=im.length;
            console.log(l);
            im[l-1].src = imageUrl;
        }
        else{
            console.log("error");
        }
    }
    multi(i) {
        var max=7;
        var  xhr= new XMLHttpRequest();
        xhr.onreadystatechange = this.show;
        xhr.responseType="blob";
        xhr.open("GET","http://localhost:5000/loan/graph?num="+i);
        // if(i<max){
        //     setTimeout(function(){i=i+1;this.multi(i);},2000);
        // }
        xhr.send();
        this.f1(i);
    }
    f1(i){
        if(i<7){
            i=i+1;
            this.multi(i);
            setTimeout(function(){this.multi(i);},2000);
        }
    }

    render(){
        return(
        <div className="row">
            <div>
                {/* <button onClick={this.multi}>Render Graphs</button> */}
                <div id="imgs">
                    
                </div>
            </div>
        </div>
        );
    }
}

export default Carousel;