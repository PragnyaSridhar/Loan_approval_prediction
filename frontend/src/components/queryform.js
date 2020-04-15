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

    printrows(resp,num){
        var tab = document.getElementById("tab");
        var i;
        for(i=num;i<num+10;i++){
            var res="<tr>";
            var r = resp[i].split(",");
            var j;
            var o=1;
            for(j=0;j<r.length;j++){
                if(j!=0){
                    res+="<span className='col s1 offset-s"+toString(o)+"'><th>"+r[j]+"</th></span>";
                }
                else{
                    res+="<span className='col s1'"+toString(o)+"><th>"+r[j]+"</th></span>";
                    // console.log("0000");
                }
                o++;
            }
            res+="</tr>";
            tab.innerHTML+=res;
        }
        
    }

    show(){
        var t = this;
            if (this.status === 200 && this.readyState === 4) {
                var resp = this.responseText;
                resp = resp.split(";");
                console.log(resp.length);
                var hf = document.getElementById("hf");
                hf.style.display="block";
                // t.printrows(resp,0);

                var tab = document.getElementById("tab");
                var i;
                t.printrows(resp,0);

                console.log(resp[0]);
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

        var  xhr= new XMLHttpRequest();
        xhr.onreadystatechange = this.show;
        xhr.open("POST", "http://localhost:5000/loan/query");
        xhr.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
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
            <div className="col s6 offset-s3 center-align">
                <h3><b>Results:</b></h3>
            </div>
        </div>
        <div>
            <div id="hf" style={{fontSize:"80%"}}>
            <table id="tab">
                <tr   className="row" >
                   <span className="col s1"><th>Gender</th></span>
                   <span className="col s1 offset-s1"><th >Married</th></span>
                   <span className="col s1 offset-s2"><th >No of dependents</th></span>
                   <span className="col s1 offset-s3"><th >Graduate</th></span>
                   <span className="col s1 offset-s4"><th >Self employed</th></span>
                   <span className="col s1 offset-s6"><th >Coapplicant income</th></span>
                   <span className="col s1 offset-s5"><th >Applicant income</th></span>
                   <span className="col s1 offset-s7"><th >Loan amount</th></span>
                   <span className="col s1 offset-s8"><th >Loan term</th></span>
                   <span className="col s1 offset-s9"><th >Credit history</th></span>
                   <span className="col s1 offset-s10"><th >Property area</th> </span>
                   <span className="col s1 offset-s11"><th >Approved</th> </span>
                </tr>
            </table>
            </div>
        </div>
        </div>
        </>

        )
    }
}

export default QueryForm;