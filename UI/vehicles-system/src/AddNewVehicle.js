import React, { Component } from 'react';
import $ from "jquery";

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
        if(this.state.isPlateText === 'yes'){
            finalPlateText = this.state.platetext;
        }
        var Vehicles = [{
            PlateNumber: this.state.platenumber
            , PlateText: finalPlateText
            , PlateModel: this.state.platemodel
            , PlateColor: this.state.platecolor
        }];
        var model = { Vehicles, UserId: this.props.UserId };
        this.setState({
            ServerMsg: ''
        });
        var ThisComponent = this;
        var BaseUrl = 'http://localhost:49949';
        $.ajax({
            url: BaseUrl + '/vehicles/addnew',
            type: 'POST',
            dataType: "json",
            data: model ,
            success: function (data, textStatus, xhr) {
                ThisComponent.setState({
                    ServerMsg: data.Msg
                });
                if (data.Msg === "success") {
                    //
                }
                $("#submitVehicle").prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                $("#submitVehicle").prop('disabled', false);
                ThisComponent.setState({
                    ServerMsg: 'failed! connecting to service'
                });
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
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
            <div className="container ">
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
                </div>
            </div>
        );
    }
    //#endregion


}

export default AddNewVehicle;