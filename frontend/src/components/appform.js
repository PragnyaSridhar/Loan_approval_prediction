import React from 'react';
import M from "materialize-css";


import GenNav from '../components/nav.js';
import Footer from '../components/footer.js';

class AppForm extends React.Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() { 
        return(
        <div className="row">
        <form action="#" className=" col s6 offset-s3 amber lighten-4">
            <h5><b>Please enter your details:</b></h5>
            <ul>
                <li>
                <div className="row">
                    <p className="col s3">Gender:</p>
                <table className="col s4">
                    <tr>
                        <td>
                            <input name="Gender" type="radio" className="with-gap" value="1" checked />
                            <span>Male</span>
                        </td>
                        <td>
                            <input name="Gender" type="radio" className="with-gap" value="0"/>
                            <span>Female</span>
                        </td>
                    </tr>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Marital Status:</p>
                <table className="col s4">
                    <tr>
                        <td>
                            <input name="Married" type="radio" className="with-gap" value="1" checked />
                            <span>Yes</span>
                        </td>
                        <td>
                            <input name="Married" type="radio" className="with-gap" value="0"/>
                            <span>No</span>
                        </td>
                    </tr>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Number of Dependants:</p>
                <table className="col s8">
                    <tr>
                        <td>
                            <input name="Dependants" type="radio" className="with-gap" value="0" checked />
                            <span>0</span>
                        </td>
                        <td>
                            <input name="Dependants" type="radio" className="with-gap" value="1"/>
                            <span>1</span>
                        </td>
                        <td>
                            <input name="Dependants" type="radio" className="with-gap" value="2"/>
                            <span>2</span>
                        </td>
                        <td>
                            <input name="Dependants" type="radio" className="with-gap" value="3"/>
                            <span>3+</span>
                        </td>
                    </tr>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Education:</p>
                <table className="col s6">
                    <tr>
                        <td>
                            <input name="Education" type="radio" className="with-gap" value="1" checked />
                            <span>Graduate</span>
                        </td>
                        <td>
                            <input name="Education" type="radio" className="with-gap" value="0"/>
                            <span>Non Graduate</span>
                        </td>
                    </tr>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Self Employed:</p>
                <table className="col s4">
                    <tr>
                        <td>
                            <input name="Self employed" type="radio" className="with-gap" value="1" checked />
                            <span>Yes</span>
                        </td>
                        <td>
                            <input name="Self employed" type="radio" className="with-gap" value="0"/>
                            <span>No</span>
                        </td>
                    </tr>
                </table>
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Applicant income($) :</p>
                    <input className="col s4" type="text" placeholder="Applicant Income" />
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Co-applicant income($) :</p>
                    <input className="col s4" type="text" placeholder="C0-applicant Income" />
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan amount($) :</p>
                    <input className="col s4" type="text" placeholder="Loan amount" />
                </div>
                </li>

                <li>
                <div className="row">
                    <p className="col s3">Loan term (months):</p>
                    <input className="col s4" type="text" placeholder="Loan term" />
                </div>
                </li>


            </ul>
        </form>
        </div>

        )
    }
}

export default AppForm;