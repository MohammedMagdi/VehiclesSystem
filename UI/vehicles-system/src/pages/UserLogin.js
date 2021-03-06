import React, { Component } from 'react';
import $ from "jquery";
import DataModel from '../DataModel';
import StringsModel from '../resources/StringsModel';
import CallService from '../service/CallService';

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            formErrors: { email: '', password: '' },

            emailValid: false,
            passwordValid: false,

            formValid: false,
            ServerMsg: ''
        }
        this.OpenRegister = this.OpenRegister.bind(this);
        this.OpenAdmin = this.OpenAdmin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.CallbackSuccess = this.CallbackSuccess.bind(this);
        this.CallbackError = this.CallbackError.bind(this);
    }
    componentWillMount() {
        if (DataModel.UserId !== null) {
            this.props.history.push(StringsModel.HomeUrl);
        }
    }
    CallbackSuccess(data) {
        this.setState({
            ServerMsg: data.Msg
        });
        if (data.Msg === "success") {
            DataModel.UserId = data.UserId;
            this.props.history.push(StringsModel.HomeUrl);
        }
        $("#btnsignin").prop('disabled', false);
    }
    CallbackError() {
        $("#btnsignin").prop('disabled', false);
        this.setState({
            ServerMsg: 'failed! connecting to service'
        });
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? 'true' : 'invalid.';
                break;
            case 'password':
                passwordValid = value.length >= 8 && value.length <= 20;
                fieldValidationErrors.password = passwordValid ? 'true' : 'Must be 8-20 characters long';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({
            formValid: this.state.emailValid
                && this.state.passwordValid
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
        $("#btnsignin").prop('disabled', true);
        e.preventDefault();
        var user = {
            email: this.state.email
            , password: this.state.password
        };

        this.setState({
            ServerMsg: 'Loading...'
        });

        CallService(StringsModel.loginUserAPI, StringsModel.POST, user, this.CallbackSuccess, this.CallbackError);
    }
    OpenRegister(e) {
        e.preventDefault();
        this.props.history.push(StringsModel.RegisterUrl);
    }
    OpenAdmin(e) {
        e.preventDefault();
        this.props.history.push(StringsModel.AdminUrl);
    }

    //#region render
    render() {
        let ServerMessage = '';
        if (this.state.ServerMsg.length !== 0) {
            ServerMessage = (
                <div className="panel panel-default">
                    <small className="text-danger">{this.state.ServerMsg}</small>
                </div>
            );
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
                            <button className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.OpenRegister}>SignUp</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenAdmin}>Admin</button>
                        </form>
                    </div>
                </nav>

                <div className="container " style={{ marginTop: 60 }}>
                    <div id="loginForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                        <h2 className="form-signin-heading">Please sign in</h2>
                        {ServerMessage}
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.email)}`} htmlFor="email">Email*</label>
                            <div className="col-sm-6">
                                <input type="email" autoFocus className={`form-control ${this.errorClass(this.state.formErrors.email)}`} name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.email)}</small>
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.password)}`} htmlFor="password">Password*</label>
                            <div className="col-sm-6">
                                <input type="password" className={`form-control ${this.errorClass(this.state.formErrors.password)}`} name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.password)}</small>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <label onClick={this.OpenAdmin} ><a href="">Admin</a></label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <label onClick={this.OpenRegister} ><a href="">Register</a></label>
                        </div>
                        <button id="btnsignin" onClick={this.handleSubmit} type="submit" className="btn btn-lg btn-primary btn-block" disabled={!this.state.formValid}>Sign in</button>

                    </div>
                </div>
            </div>
        );
    }
    //#endregion


}

export default UserLogin;