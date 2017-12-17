import React, { Component } from 'react';
import $ from "jquery";
import DataModel from '../DataModel';
import StringsModel from '../resources/StringsModel';
import CallService from '../service/CallService';

class AddNewVehicle extends Component {

    constructor(props) {
        super(props);
        super(props);
        this.state = {
            platenumber: '',
            platetext: '',
            platemodel: '',
            platecolor: '',
            isPlateText: 'yes',

            formErrors: { platenumber: '', platetext: '', platemodel: '', platecolor: '' },

            platenumberValid: false,
            platetextValid: false,
            platemodelValid: false,
            platecolorValid: false,

            formValid: false,
            ServerMsg: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.OpenAdmin = this.OpenAdmin.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.CallbackSuccess = this.CallbackSuccess.bind(this);
        this.CallbackError = this.CallbackError.bind(this);
    }
    componentWillMount() {
        if (DataModel.UserId === null) {
            this.props.history.push(StringsModel.LoginUrl);
        }
    }
    CallbackSuccess(data) {
        this.setState({
            ServerMsg: data.Msg
        });
        if (data.Msg === "success") {
            //
        }
        $("#submitVehicle").prop('disabled', false);
    }
    CallbackError() {
        $("#submitVehicle").prop('disabled', false);
        this.setState({
            ServerMsg: 'failed! connecting to service'
        });
    }
    
    LogOut(e) {
        DataModel.UserId = null;
        this.props.history.replace(StringsModel.LoginUrl);
    }
    OpenAdmin(e) {
        e.preventDefault();
        this.props.history.push(StringsModel.AdminUrl);
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let platenumberValid = this.state.platenumberValid;
        let platetextValid = this.state.platetextValid;
        let platemodelValid = this.state.platemodelValid;
        let platecolorValid = this.state.platecolorValid;


        switch (fieldName) {
            case 'platenumber':
                platenumberValid = value.length >= 1 && /^-?\d+\.?\d*$/.test(+value);
                fieldValidationErrors.platenumber = platenumberValid ? 'true' : 'required numbers only.';
                break;
            case 'isPlateText':
                if (this.state.isPlateText === 'yes') {
                    platetextValid = this.state.platetext.length >= 1;
                    fieldValidationErrors.platetext = platetextValid ? 'true' : 'required.';
                }
                else {
                    platetextValid = true;
                    fieldValidationErrors.platetext = 'true';
                }
                break;
            case 'platetext':
                platetextValid = value.length >= 1;
                fieldValidationErrors.platetext = platetextValid ? 'true' : 'required.';
                break;
            case 'platemodel':
                platemodelValid = value.length >= 1;
                fieldValidationErrors.platemodel = platemodelValid ? 'true' : 'required.';
                break;
            case 'platecolor':
                platecolorValid = value.length >= 1;
                fieldValidationErrors.platecolor = platecolorValid ? 'true' : 'required.';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            platenumberValid: platenumberValid,
            platetextValid: platetextValid,
            platemodelValid: platemodelValid,
            platecolorValid: platecolorValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.platenumberValid
                && this.state.platetextValid
                && this.state.platemodelValid
                && this.state.platecolorValid
        });
    }

    errorClass(Msg) {
        if (Msg === '') {
            return '';
        }
        else if (Msg === 'true') {
            return 'is-valid';
        }
        else {
            return 'is-invalid';
        }

    }
    errorMsg(Msg) {
        if (Msg.length > 0 && Msg !== "true") {
            return Msg;
        }
        else {
            return '';
        }
    }
    errorLabelClass(Msg) {
        if (Msg === '') {
            return '';
        }
        else if (Msg === 'true') {
            return 'text-success';
        }
        else {
            return 'text-danger';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        $("#submitVehicle").prop('disabled', true);
        e.preventDefault();
        var finalPlateText = '';
        if (this.state.isPlateText === 'yes') {
            finalPlateText = this.state.platetext;
        }
        var Vehicles = [{
            PlateNumber: this.state.platenumber
            , PlateText: finalPlateText
            , PlateModel: this.state.platemodel
            , PlateColor: this.state.platecolor
        }];

        var model = { Vehicles, UserId: DataModel.UserId };
        this.setState({
            ServerMsg: ''
        });

        CallService(StringsModel.AddNewVehicleAPi, StringsModel.POST, model, this.CallbackSuccess , this.CallbackError);

    }


    //#region render
    render() {
        let ServerMessage = '';
        var classMsg = '';
        if (this.state.ServerMsg.length !== 0) {
            if (this.state.ServerMsg === 'success') {
                classMsg = 'text-success';
            }
            else {
                classMsg = 'text-danger';
            }
            ServerMessage = (
                <div className="panel panel-default">
                    <small className={classMsg}>{this.state.ServerMsg}</small>
                </div>
            );
        }

        if (this.state.isPlateText === 'no') {
            $("#plateTextInput").prop('disabled', true);
        }
        else {
            $("#plateTextInput").prop('disabled', false);
        }
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">Vehicles System</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-danger my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.LogOut}>Logout</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenAdmin}>Admin</button>
                        </form>
                    </div>
                </nav>

                <div className="container " style={{ marginTop: 60 }}>
                    <div id="registerForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                        <h2 className="form-signin-heading">Vehicle detailes</h2>
                        {ServerMessage}
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.platenumber)}`} htmlFor="platenumber">Plate number*</label>
                            <div className="col-sm-6">
                                <input type="number" min="1" autoFocus className={`form-control ${this.errorClass(this.state.formErrors.platenumber)}`} name="platenumber"
                                    placeholder="Plate number"
                                    value={this.state.platenumber}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.platenumber)}</small>
                            </div>
                        </div>

                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label`} htmlFor="platetext">Plate contain text</label>
                            <div className='col-sm-6' >
                                <input className='' type="radio" name="isPlateText" value="yes" defaultChecked onChange={this.handleUserInput} /> Yes<br />
                                <input className='' type="radio" name="isPlateText" value="no" onChange={this.handleUserInput} /> No<br />
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.platetext)}`} htmlFor="platetext"></label>
                            <div className="col-sm-6">
                                <input id='plateTextInput' type="text" className={`form-control ${this.errorClass(this.state.formErrors.platetext)}`} name="platetext"
                                    placeholder="Plate text"
                                    value={this.state.platetext}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.platetext)}</small>
                            </div>
                        </div>

                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.platemodel)}`} htmlFor="platemodel">Plate model*</label>
                            <div className="col-sm-6">
                                <input type="text" className={`form-control ${this.errorClass(this.state.formErrors.platemodel)}`} name="platemodel"
                                    placeholder="Plate model"
                                    value={this.state.platemodel}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.platemodel)}</small>
                            </div>
                        </div>

                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.platecolor)}`} htmlFor="platecolor">Plate color*</label>
                            <div className="col-sm-6">
                                <input type="text" className={`form-control ${this.errorClass(this.state.formErrors.platecolor)}`} name="platecolor"
                                    placeholder="Plate color"
                                    value={this.state.platecolor}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.platecolor)}</small>
                            </div>
                        </div>
                        <button id="submitVehicle" onClick={this.handleSubmit} type="submit" className="btn btn-lg btn-primary btn-block" disabled={!this.state.formValid}>Submit</button>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <button type="button" className="btn btn-danger" onClick={e => this.LogOut()}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //#endregion


}

export default AddNewVehicle;