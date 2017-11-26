import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RegisterUser from './RegisterUser';
import AdminLogin from './AdminLogin';

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.OpenRegister = this.OpenRegister.bind(this);
        this.OpenAdmin = this.OpenAdmin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

//#region render
    render() {
        return (
            <div className="container">
                <div id="login">
                    <form className="form-signin" style={{ maxWidth: 330, padding: 15, margin: '0 auto' }}>
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <div style={{ "marginLeft": 15, "marginRight": 15 }}>
                            <label onClick={this.OpenRegister} style={{ "float": "left" }}><a href="">Register</a></label>
                            <label onClick={this.OpenAdmin} style={{ "float": "right" }}><a href="">Admin</a></label>
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
//#endregion

    handleSubmit(e) {
        e.preventDefault();
        alert("submit");
    }
    OpenRegister(e) {
        e.preventDefault();
        ReactDOM.render(<RegisterUser />, document.getElementById('root'));
    }
    OpenAdmin(e) {
        e.preventDefault();
        ReactDOM.render(<AdminLogin />, document.getElementById('root'));
    }
}

export default UserLogin;