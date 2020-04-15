import React from 'react';
import M from "materialize-css";


class QueryForm extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }

    get_val(name){
        var e=document.getElementsByName(name);
        var i;
        var res=[];
        for(i=0;i<e.length;i++){
            if(e[i].checked=== true){
                res.push(parseInt(e[i].value));
            }
        }
        if(res.length!=0){
            return res;
        }
        return "";
    }

    get_num(name){
        var e=document.getElementsByName(name);
        return (parseInt(e[0].value));
    }

    make_row(row){
        var res="<tr>";
        var r = row.split(",");
        var i;
        for(i=0;i<r.length;i++){
            res+="<th>"+r[i]+"</th>";
        }
        res+="</tr>";
        return res;
    }

    

    show(){
            if (this.status === 200 && this.readyState === 4) {
                var resp = this.responseText;
                console.log(resp.length);
                if(resp.length!==3){
                resp = resp.substring(1,resp.length-2);
                resp = resp.split(";");
                var l = resp.length;
                console.log(l);
                var hf = document.getElementById("hf");
                hf.style.display="block";
                var d = document.getElementById("content");
                d.style.display="block";
                d.innerHTML = `
                <table id="tab" className="centered highlight responsive-table brown lighten-4" style={{fontSize:"70%"}}>
                <tr   className="row" >
                       <span className="col s1 "><th><center>Sl no</center></th></span>
                       <span className="col s1 offset-s1"><th><center>Gender</center></th></span>
                       <span className="col s1 offset-s2 "><th ><center>Married</center></th></span>
                       <span className="col s1 offset-s3 "><th ><center>No of dependents</center></th></span>
                       <span className="col s1 offset-s4 "><th ><center>Graduate</center></th></span>
                       <span className="col s1 offset-s5 "><th ><center>Self employed</center></th></span>
                       <span className="col s1 offset-s6 "><th ><center>Coapplicant income</center></th></span>
                       <span className="col s1 offset-s7 "><th ><center>Applicant income</center></th></span>
                       <span className="col s1 offset-s8 "><th ><center>Loan amount</center></th></span>
                       <span className="col s1 offset-s9 "><th ><center>Loan term</center></th></span>
                       <span className="col s1 offset-s10 "><th ><center>Credit history</center></th></span>
                       <span className="col s1 offset-s11 "><th ><center>Property area</center></th> </span>
                       <span className="col s1 offset-s12 "><th ><center>Approved</center></th> </span>
                    </tr>
                <div id="rows"></div>
                </table>
                ` ;
                // t.printrows(resp,0);

                // var tab = document.getElementById("tab");
                // var i;
                var ct = document.getElementById("con");
                ct.innerHTML="";
                var c=`
                <div className="row">
                <div classname = "col s6 offset-s3">
                <h6>Found `;
                c+=l-1;
                c+=` records</h6> 
                </div></div>`;
                ct.innerHTML=c;
                function printrows(resp,num){
                    var tab = document.getElementById("tab");
                    var i;
                    for(i=num;i<resp.length-1;i++){
                        var res="<tr>";
                        var r = resp[i].split(",");
                        var j;
                        var o=1;
                        res+="<span className='col s1 '><td><center>"+(i+1)+"</center></td></span>";
                        for(j=0;j<r.length;j++){
                            if(1){
                                res+="<span className='col s1 offset-s"+toString(o)+" '><td><center>"+r[j]+"</center></td></span>";
                            }
                            // else{
                            //     res+="<span className='col s1 '"+toString(o)+"><td>"+r[j]+"</td></span>";
                            //     // console.log("0000");
                            // }
                            o++;
                        }
                        res+="</tr>";
                        tab.innerHTML+=res;
                    }
                    
                }
                printrows(resp,0);


                console.log(resp[0]);}
                else{
                console.log("here");
                var ct = document.getElementById("con");
                var c=`
                <div className="row">
                <div classname = "col s6 offset-s3">
                <h6>Found `;
                c+="0";
                c+=` records</h6> 
                </div></div>`;
                ct.innerHTML=c;
                var hf = document.getElementById("hf");
                hf.style.display="block";
                var ct = document.getElementById("content");
                ct.innerHTML='';
                }
            } else {
                // console.log("try again");
                // window.location.href = "/";
                // navigate to same page
            }
    }

    onSubmit = (event) =>{
        event.preventDefault();
        var gender = this.get_val("gender");
        var married = this.get_val("married");
        var dependents = this.get_val("dependents");
        var education = this.get_val("education");
        var selfemployed = this.get_val("self employed");
        var appinclb = this.get_num("applicant income lb");
        var appincub = this.get_num("applicant income ub");
        var cappinclb = this.get_num("coapplicant income lb");
        var cappincub = this.get_num("coapplicant income ub");
        var lnamtlb = this.get_num("loan amount lb");
        var lnamtub = this.get_num("loan amount ub");
        var lntermlb = this.get_num("loan term lb");
        var lntermub = this.get_num("loan term ub");
        var credhist = this.get_val("credit history");
        var propAr = this.get_val("property area");
        var loanst = this.get_val("loan_stat");

        var appinc = [appinclb,appincub];
        var cappinc = [cappinclb,cappincub];
        var lnamt = [lnamtlb,lnamtub];
        var lnterm = [lntermlb,lntermub];

        var data={"gender":gender,"married":married,"dependents":dependents,"education":education,
    "self employed":selfemployed,"applicant income": appinc, "coapplicant income":cappinc,"loan amount":lnamt,
"loan term":lnterm,"credit history":credhist,"property area":propAr,"approval":loanst};
        
        console.log(JSON.stringify(data));

        var t=this;
        function xhr_call(data){
            var  xhr= new XMLHttpRequest();
            xhr.onreadystatechange = t.show;
            xhr.open("POST", "http://localhost:5000/loan/query");
            xhr.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(data));
        }

        xhr_call(data);
        
        // var run = setInterval((data) => {                 //NOT WORKING!!!!
        //     console.log("*******************");
        //     xhr.open("POST", "http://localhost:5000/loan/query");
        //     xhr.send(JSON.stringify(data));
        // },10000);

        setTimeout(function(){xhr_call(data);},10000);
    }
    
    render() { 
        return(
        <>
        <div className="row">
        <form className=" col s10 offset-s1 amber lighten-4">
            <h5><b>Please enter your details:</b></h5>
            <ul>
                <li>
                <div className="row">
                    <p className="col s3">Gender:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="gender" type="checkbox" className="with-gap" value="0"   />
                            <span>Male</span></label>
                        </td>
                        <td>
                            <label><input name="gender" type="checkbox" className="with-gap" value="1" />
                            <span>Female</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Marital Status:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="married" type="checkbox" className="with-gap" value="1"   />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="married" type="checkbox" className="with-gap" value="0" />
                            <span>No</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Number of dependents:</p>
                <table className="col s8">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="dependents" type="checkbox" className="with-gap" value="0"   />
                            <span>0</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="checkbox" className="with-gap" value="1" />
                            <span>1</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="checkbox" className="with-gap" value="2" />
                            <span>2</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="checkbox" className="with-gap" value="3" />
                            <span>3+</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Education:</p>
                <table className="col s6">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="education" type="checkbox" className="with-gap" value="1"   />
                            <span>Graduate</span></label>
                        </td>
                        <td>
                            <label><input name="education" type="checkbox" className="with-gap" value="0" />
                            <span>Non Graduate</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Self Employed:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="self employed" type="checkbox" className="with-gap" value="1"   />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="self employed" type="checkbox" className="with-gap" value="0" />
                            <span>No</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Applicant income($) :</p>
                    <input className="col s4" type="number" placeholder="Lower bound" name="applicant income lb"  />
                    <input className="col s4" type="number" placeholder="Upper bound" name="applicant income ub"  />
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Co-applicant income($) :</p>
                    <input className="col s4" type="number" placeholder="Lower Bound" name="coapplicant income lb"  />
                    <input className="col s4" type="number" placeholder="Upper Bound" name="coapplicant income ub"  />

                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan amount($):</p>
                    <input className="col s4" type="number" placeholder="Lower Bound" name="loan amount lb"  />
                    <input className="col s4" type="number" placeholder="Upper Bound" name="loan amount ub"  />

                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan term (months):</p>
                    <input className="col s4" type="number" placeholder="Lower bound" name="loan term lb"  />
                    <input className="col s4" type="number" placeholder="Upper bound" name="loan term ub"  />
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Credit history:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="credit history" type="checkbox" className="with-gap" value="1"   />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="credit history" type="checkbox" className="with-gap" value="0" />
                            <span>No</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Property area:</p>
                <table className="col s8">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="property area" type="checkbox" className="with-gap" value="1"   />
                            <span>Urban</span></label>
                        </td>
                        <td>
                            <label><input name="property area" type="checkbox" className="with-gap" value="2" />
                            <span>Rural</span></label>
                        </td>
                        <td>
                            <label><input name="property area" type="checkbox" className="with-gap" value="3" />
                            <span>Semi urban</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan Approved:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="loan_stat" type="checkbox" className="with-gap" value="1"   />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="loan_stat" type="checkbox" className="with-gap" value="0" />
                            <span>No</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>
            </ul>
            <button type="submit" className="hoverable waves-effect waves-light btn brown darken-4" onClick={this.onSubmit}>Submit</button>
            <br></br>
        </form>
        </div>
        
        <div id="hf" style={{display:"none"}}>
        <div className="row">
            <div className="col s6 offset-s3 ">
                <h3><b>Results:</b></h3>
                <div id="con"></div>
            </div>
        </div>
        {/* <div className="row"> */}
        <div id="content" style={{display:"none"}}>
        
        </div>
        </div>
        {/* </div> */}
        </>

        )
    }
}

export default QueryForm;