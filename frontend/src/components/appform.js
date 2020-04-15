import React from 'react';
import M from "materialize-css";


class AppForm extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }

    get_val(name){
        var e=document.getElementsByName(name);
        var i;
        for(i=0;i<e.length;i++){
            if(e[i].checked=== true){
                return(e[i].value);
            }
        }
    }

    get_num(name){
        var e=document.getElementsByName(name);
        return (e[0].value);
    }

    show(){
            if (this.status === 200 && this.readyState === 4) {
                // navigate to dashboard
                var res = this.responseText;
                console.log(res);
                if(res==="0"){
                    // alert("NOT APPROVED!");
                    window.location.href="/notapproved";
                }
                else{
                    // alert("APPROVED!");
                    window.location.href="/approved";
                }
                //window.location.href = "/dashboard";
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
        var appinc = this.get_num("applicant income");
        var cappinc = this.get_num("coapplicant income");
        var lnamt = this.get_num("loan amount");
        var lnterm = this.get_num("loan term");
        var credhist = this.get_val("credit history");
        var propAr = this.get_val("property area");

        var data={"gender":gender,"married":married,"dependents":dependents,"education":education,
    "self employed":selfemployed,"applicant income": appinc, "coapplicant income":cappinc,"loan amount":lnamt,
"loan term":lnterm,"credit history":credhist,"property area":propAr};
        
        console.log(JSON.stringify(data));

        if(appinc==="" || cappinc==="" || lnamt==="" || lnterm===""){
            alert("Please fill all the details");
        }
        else{
            var  xhr= new XMLHttpRequest();
            xhr.onreadystatechange = this.show;
            xhr.open("POST", "http://localhost:5000/loan/predict");
            xhr.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(data));
        }
    }
    
    render() { 
        return(
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
                            <label><input name="gender" type="radio" className="with-gap" value="0"  defaultChecked />
                            <span>Male</span></label>
                        </td>
                        <td>
                            <label><input name="gender" type="radio" className="with-gap" value="1" />
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
                            <label><input name="married" type="radio" className="with-gap" value="1"  defaultChecked />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="married" type="radio" className="with-gap" value="0" />
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
                            <label><input name="dependents" type="radio" className="with-gap" value="0"  defaultChecked />
                            <span>0</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="radio" className="with-gap" value="1" />
                            <span>1</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="radio" className="with-gap" value="2" />
                            <span>2</span></label>
                        </td>
                        <td>
                            <label><input name="dependents" type="radio" className="with-gap" value="3" />
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
                            <label><input name="education" type="radio" className="with-gap" value="1"  defaultChecked />
                            <span>Graduate</span></label>
                        </td>
                        <td>
                            <label><input name="education" type="radio" className="with-gap" value="0" />
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
                            <label><input name="self employed" type="radio" className="with-gap" value="1"  defaultChecked />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="self employed" type="radio" className="with-gap" value="0" />
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
                    <input className="col s4" type="number" placeholder="Applicant Income" name="applicant income"  required/>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Co-applicant income($) :</p>
                    <input className="col s4" type="number" placeholder="Coapplicant Income" name="coapplicant income"  required/>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan amount($):</p>
                    <input className="col s4" type="number" placeholder="Loan amount" name="loan amount"  required/>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan term (months):</p>
                    <input className="col s4" type="number" placeholder="Loan term" name="loan term"  required/>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Credit history:</p>
                <table className="col s4">
                    <tbody>
                    <tr>
                        <td>
                            <label><input name="credit history" type="radio" className="with-gap" value="1"  defaultChecked />
                            <span>Yes</span></label>
                        </td>
                        <td>
                            <label><input name="credit history" type="radio" className="with-gap" value="0" />
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
                            <label><input name="property area" type="radio" className="with-gap" value="1"  defaultChecked />
                            <span>Urban</span></label>
                        </td>
                        <td>
                            <label><input name="property area" type="radio" className="with-gap" value="2" />
                            <span>Rural</span></label>
                        </td>
                        <td>
                            <label><input name="property area" type="radio" className="with-gap" value="3" />
                            <span>Semi urban</span></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </li>
            </ul>
            <button type="submit" className="hoverable waves-effect waves-light btn brown darken-4" onClick={this.onSubmit}>Predict</button>
            <br></br>
        </form>
        </div>

        )
    }
}

export default AppForm;