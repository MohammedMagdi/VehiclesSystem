import React, { Component } from 'react';
import { FormErrors } from './FormErrors';

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

            formValid: false
        }
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
                firstnameValid = value.length >= 0;
                fieldValidationErrors.firstname = firstnameValid ? 'true' : ' required';
                break;
            case 'lastname':
                lastnameValid = value.length >= 0;
                fieldValidationErrors.lastname = lastnameValid ? 'true' : ' required';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? 'true' : ' is invalid';
                break;
            case 'password':
                passwordValid = 20 >= value.length >= 6;
                fieldValidationErrors.password = passwordValid ? 'true' : ' Must be 8-20 characters long';
                break;
            case 'confirmpassword':
                confirmpasswordValid = value === this.state.password;
                fieldValidationErrors.confirmpassword = confirmpasswordValid ? 'true' : " don't match";
                break;
            case 'age':
                ageValid = 2 >= value.length >= 1;
                fieldValidationErrors.age = ageValid ? 'true' : ' is invalid';
                break;
            case 'mobilenumber':
                mobilenumberValid = value.length === 11;
                fieldValidationErrors.mobilenumber = mobilenumberValid ? 'true' : ' is invalid';
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
            formValid: this.state.firstname
                && this.state.lastnameValid
                && this.state.emailValid
                && this.state.passwordValid
                && this.state.confirmpasswordValid
                && this.state.ageValid
                && this.state.mobilenumberValid
        });
    }

    errorClass(error) {
        console.log(error);
        if (error.length > 0) {
            if (error === 'true') {
                return 'is-valid';
            }
            else {
                return 'is-invalid';
            }
        }
        else {
            return '';
        }
        //return (error.length === 0 ? '' : 'is-invalid');
    }

    render() {
        return (
            <div className="container ">
                <div id="registerForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                    <h2 className="form-signin-heading">Register new user</h2>
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="firstname">First name*</label>
                        <div className="col-sm-6">
                            <input type="text" autoFocus className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="firstname"
                                placeholder="First Name"
                                value={this.state.firstname}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="lastname">Last name*</label>
                        <div className="col-sm-6">
                            <input type="text" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="lastname"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="email">Email*</label>
                        <div className="col-sm-6">
                            <input type="email" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="password">Password*</label>
                        <div className="col-sm-6">
                            <input type="password" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleUserInput} />
                        </div>
                        <div className="col-sm-4">
                            <small id="passwordHelp" class="text-danger">Must be 8-20 characters long.</small>
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="confirmpassword">Confirm password*</label>
                        <div className="col-sm-6">
                            <input type="password" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="confirmpassword"
                                placeholder="Confirm password"
                                value={this.state.confirmpassword}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="age">Age*</label>
                        <div className="col-sm-6">
                            <input type="number" min="1" max="99" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="age"
                                placeholder="Age"
                                value={this.state.age}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div className={`form-group row`}>
                        <label className={'col-sm-2 col-form-label'} htmlFor="mobilenumber">Mobile number*</label>
                        <div className="col-sm-6">
                            <input type="number" min="1" max="99999999999" className={`form-control ${this.errorClass(this.state.formErrors.lastname)}`} name="mobilenumber"
                                placeholder="Mobile number"
                                value={this.state.mobilenumber}
                                onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={!this.state.formValid}>Sign up</button>
                </div>
            </div>
        );
    }
}

export default RegisterUser;