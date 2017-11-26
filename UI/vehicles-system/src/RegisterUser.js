import React, { Component } from 'react';

class RegisterUser extends Component {
    render() {
        return (
            <div className="container">
                <div id="registerForm">
                    <form id="formregister" className="form-signin" style={{ maxWidth: 500, padding: 15, margin: '0 auto' }}>
                        <h2 className="form-signin-heading">Register new user</h2>
                        <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                        <input type="text" id="inputFirstName" className="form-control" placeholder="First Name" required autoFocus style={{ marginTop: 2 }} />
                        <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                        <input type="text" id="inputLastName" className="form-control" placeholder="Last Name" required style={{ marginTop: 2 }} />
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required style={{ marginTop: 2 }} />
                        <label htmlFor="inputAge" className="sr-only">Age</label>
                        <input type="number" min={1} max={100} id="inputAge" className="form-control" placeholder="Age" required style={{ marginTop: 2 }} />
                        <label htmlFor="inputMobileNumber" className="sr-only">Mobile Number</label>
                        <input type="number" min={0} max={99999999999} id="inputMobileNumber" className="form-control" placeholder="Mobile Number" required style={{ marginTop: 2 }} />
                        <button id="register" type="submit" className="btn btn-lg btn-primary btn-block" style={{ marginTop: 20 }}>Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterUser;