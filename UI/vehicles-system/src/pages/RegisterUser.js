import React, { Component } from 'react';
import $ from "jquery";
import DataModel from '../DataModel';
import Navbar from './Navbar';

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            age: '',
            mobilenumber: '',

            formErrors: { firstname: '', lastname: '', email: '', password: '', confirmpassword: '', age: '', mobilenumber: '' },

            firstnameValid: false,
            lastnameValid: false,
            emailValid: false,
            passwordValid: false,
            confirmpasswordValid: false,
            ageValid: false,
            mobilenumberValid: false,

            formValid: false,
            ServerMsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.OpenSignin = this.OpenSignin.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmpasswordValid = this.state.confirmpasswordValid;
        let ageValid = this.state.ageValid;
        let mobilenumberValid = this.state.mobilenumberValid;

        switch (fieldName) {
            case 'firstname':
                firstnameValid = value.length > 0;
                fieldValidationErrors.firstname = firstnameValid ? 'true' : 'required.';
                break;
            case 'lastname':
                lastnameValid = value.length > 0;
                fieldValidationErrors.lastname = lastnameValid ? 'true' : 'required.';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? 'true' : 'invalid.';
                break;
            case 'password':
                passwordValid = value.length >= 8 && value.length <= 20;
                fieldValidationErrors.password = passwordValid ? 'true' : 'Must be 8-20 characters long';
                break;
            case 'confirmpassword':
                confirmpasswordValid = value === this.state.password;
                fieldValidationErrors.confirmpassword = confirmpasswordValid ? 'true' : "don't match.";
                break;
            case 'age':
                ageValid = value.length >= 1 && value.length <= 2 && /^\d{1}|[1-9]\d{1}$/.test(+value);
                fieldValidationErrors.age = ageValid ? 'true' : 'invalid.';
                break;
            case 'mobilenumber':
                mobilenumberValid = value.length === 11;
                fieldValidationErrors.mobilenumber = mobilenumberValid ? 'true' : 'Must be 11 number long.';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid,
            emailValid: emailValid,
            passwordValid: passwordValid,
            confirmpasswordValid: confirmpasswordValid,
            ageValid: ageValid,
            mobilenumberValid: mobilenumberValid

        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.firstnameValid
                && this.state.lastnameValid
                && this.state.emailValid
                && this.state.passwordValid
                && this.state.confirmpasswordValid
                && this.state.ageValid
                && this.state.mobilenumberValid
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
    OpenSignin() {
        this.props.history.push('/login');
    }

    handleSubmit(e) {
        $("#register").prop('disabled', true);
        e.preventDefault();
        var user = {
            firstName: this.state.firstname
            , lastName: this.state.lastname
            , email: this.state.email
            , password: this.state.password
            , age: this.state.age
            , mobileNumber: this.state.mobilenumber
        };

        this.setState({
            ServerMsg: 'Loading...'
        });
        var ThisComponent = this;
        $.ajax({
            url: DataModel.BaseUrl + '/users/register',
            type: 'POST',
            dataType: "json",
            data: user,
            success: function (data, textStatus, xhr) {
                ThisComponent.setState({
                    ServerMsg: data.Msg
                });
                if (data.Msg === "success") {
                    DataModel.UserId = data.UserId;
                    this.props.history.push('/');
                }
                $("#register").prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                $("#register").prop('disabled', false);
                ThisComponent.setState({
                    ServerMsg: 'failed! connecting to service'
                });
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
    }

    render() {
        let ServerMessage = '';
        if (DataModel.UserId === null) {
            if (this.state.ServerMsg.length !== 0) {
                ServerMessage = (
                    <div className="panel panel-default">
                        <small className="text-danger">{this.state.ServerMsg}</small>
                    </div>
                );
            }
        }
        else {
            this.props.history.push('/');
        }
        return (
            <div>
                <Navbar history={this.props.history} CurrentComponent="RegisterUser" />
                <div className="container " style={{ marginTop: 60 }}>
                    <div id="registerForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                        <h2 className="form-signin-heading">Register new user</h2>
                        {ServerMessage}
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.firstname)}`} htmlFor="firstname">First name*</label>
                            <div className="col-sm-6">
                                <input type="text" autoFocus className={`form-control ${this.errorClass(this.state.formErrors.firstname)}`} name="firstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.firstname)}</small>
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.lastname)}`} htmlFor="lastname">Last name*</label>
                            <div className="col-sm-6">
                                <input type="text" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="lastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.lastname)}</small>
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.email)}`} htmlFor="email">Email*</label>
                            <div className="col-sm-6">
                                <input type="email" className={`form-control ${this.errorClass(this.state.formErrors.email)}`} name="email"
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
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.confirmpassword)}`} htmlFor="confirmpassword">Confirm password*</label>
                            <div className="col-sm-6">
                                <input type="password" className={`form-control ${this.errorClass(this.state.formErrors.confirmpassword)}`} name="confirmpassword"
                                    placeholder="Confirm password"
                                    value={this.state.confirmpassword}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.confirmpassword)}</small>
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.age)}`} htmlFor="age">Age*</label>
                            <div className="col-sm-6">
                                <input type="number" min="1" max="99" className={`form-control ${this.errorClass(this.state.formErrors.age)}`} name="age"
                                    placeholder="Age"
                                    value={this.state.age}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.age)}</small>
                            </div>
                        </div>
                        <div className={`form-group row`}>
                            <label className={`col-sm-3 col-form-label ${this.errorLabelClass(this.state.formErrors.mobilenumber)}`} htmlFor="mobilenumber">Mobile number*</label>
                            <div className="col-sm-6">
                                <input type="number" min="1" max="99999999999" className={`form-control ${this.errorClass(this.state.formErrors.mobilenumber)}`} name="mobilenumber"
                                    placeholder="Mobile number"
                                    value={this.state.mobilenumber}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="col-sm-3">
                                <small className="text-danger">{this.errorMsg(this.state.formErrors.mobilenumber)}</small>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <label onClick={this.OpenSignin} className="col-md-2 col-md-offset-5" style={{ display: 'inline-block' }}><a href="">signin</a></label>
                        </div>
                        <button id="register" onClick={this.handleSubmit} type="submit" className="btn btn-lg btn-primary btn-block" disabled={!this.state.formValid}>Sign up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;