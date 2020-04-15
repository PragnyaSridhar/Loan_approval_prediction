import React from "react";

import M from "materialize-css";

class Carousel extends React.Component {
    componentDidMount(){
        M.AutoInit();  
        // this.multi(1); 
        var t = this;
        setTimeout(function(){t.multi(1);},2000);
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
        // var max=7;
        var  xhr= new XMLHttpRequest();
        xhr.onreadystatechange = this.show;
        xhr.responseType="blob";
        xhr.open("GET","http://localhost:5000/loan/graph?num="+i);
        // if(i<max){
        //     setTimeout(function(){i=i+1;this.multi(i);},2000);
        // }
        xhr.send();
        this.f1(i);
        // setTimeout(function(){f1(i);},2000);
    }
    f1(i){
        if(i<7){
            i=i+1;
            // var x = this.multi;
            // function x(){
            //     this.multi(i+1);
            // }
            var t=this;
            setTimeout(function(){t.multi(i);console.log("hgh");},2000);
        }
    }

    render(){
        return(
            <>
            <div className = "row">
                <div className="col s10 offset-s1">
                <center><h3><b>Common Statistics of Loan Approval</b></h3></center>
                </div>
            </div>
            
        <div className="row">
                {/* <button onClick={this.multi}>Render Graphs</button> */}                
                <div id="imgs" className = "col s8 offset-s2">
                    
                </div>
        </div>
        </>
        );
    }
}

export default Carousel;