import React, { Component } from 'react';

class AdminLogin extends Component {
    render() {
        return (
            <div id="login">
                <form className="form-signin" style={{ maxWidth: 330, padding: 15, margin: '0 auto' }}>
                    <h2 className="form-signin-heading">Sign in as..</h2>
                    <button id="admin" className="btn btn-lg btn-primary btn-block">Admin</button>
                    <label style={{ width: '100%', textAlign: 'center' }}>Or</label>
                    <button id="register" className="btn btn-lg btn-primary btn-block">User</button>
                </form>
            </div>
        );
    }
}

export default AdminLogin;