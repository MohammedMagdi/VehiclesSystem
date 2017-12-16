import React, { Component } from 'react';
import DataModel from '../DataModel';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.OpenRegister = this.OpenRegister.bind(this);
        this.OpenUserLogin = this.OpenRegister.bind(this);
        this.OpenAdmin = this.OpenRegister.bind(this);
        this.LogOut = this.LogOut.bind(this);
    }

    OpenRegister(e) {
        e.preventDefault();
        this.props.history.push('/register');
    }
    OpenUserLogin(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    OpenAdmin(e) {
        e.preventDefault();
        this.props.history.push('/admin');
    }
    LogOut(e) {
        e.preventDefault();
        DataModel.UserId = null;
        this.props.history.push('/');
    }
    render() {
        let RightForm = '';
        let Title = 'Vehicles System';
        if (this.props.CurrentComponent === "UserLogin") {
            RightForm = (
                <form className="form-inline mt-2 mt-md-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.OpenRegister}>SignUp</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenAdmin}>Admin</button>
                </form>
            );
        } else if (this.props.CurrentComponent === "AddNewVehicle") {
            RightForm = (
                <form className="form-inline mt-2 mt-md-0">
                    <button className="btn btn-outline-danger my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.LogOut}>Logout</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenAdmin}>Admin</button>
                </form>
            );
        }
        else if (this.props.CurrentComponent === "RegisterUser") {
            RightForm = (
                <form className="form-inline mt-2 mt-md-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.OpenUserLogin}>Login</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenAdmin}>Admin</button>
                </form>
            );
        }
        else if (this.props.CurrentComponent === "AdminPage") {
            Title = 'Admin';
            RightForm = (
                <form className="form-inline mt-2 mt-md-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: 5 }}>Login</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" >SignUp</button>
                </form>
            );
        }
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="">{Title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="">Disabled</a>
                        </li>
                    </ul>
                    {RightForm}
                </div>
            </nav>
        );
    }
}
export default Navbar;