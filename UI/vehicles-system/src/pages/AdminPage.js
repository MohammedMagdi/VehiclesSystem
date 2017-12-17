import React, { Component } from 'react';
import $ from "jquery";
import StringsModel from '../resources/StringsModel';
import CallService from '../service/CallService';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NewVehicles: [],
            ServerMsg: 'Loading...'
        }
        this.getNewVehicles = this.getNewVehicles.bind(this);
        this.handleVehicleOperation = this.handleVehicleOperation.bind(this);
        this.drawVehicles = this.drawVehicles.bind(this);
        this.OpenRegister = this.OpenRegister.bind(this);
        this.OpenUserLogin = this.OpenUserLogin.bind(this);
        this.getVehiclesCallbackSuccess = this.getVehiclesCallbackSuccess.bind(this);
        this.getVehiclesCallbackError = this.getVehiclesCallbackError.bind(this);
        this.ApproveOrRejectCallbackSuccess = this.ApproveOrRejectCallbackSuccess.bind(this);
        this.ApproveOrRejectCallbackError = this.ApproveOrRejectCallbackError.bind(this);

    }
    getVehiclesCallbackSuccess(data) {
        var Message = '';
        if (data.Msg === "success") {
            if (data.Vehicles.length === 0) {
                Message = 'No new vehicles';
            }
            this.setState({
                NewVehicles: data.Vehicles,
                ServerMsg: Message
            });
        }
        else {
            this.setState({
                ServerMsg: data.Msg
            });
        }
    }
    getVehiclesCallbackError() {
        this.setState({
            ServerMsg: 'failed! connecting to service'
        });
    }
    ApproveOrRejectCallbackSuccess(data, VehicleIndex) {
        var NewData = this.state.NewVehicles;
        if (data.Msg === "success") {
            NewData.splice(VehicleIndex, 1);
        }
        this.setState({
            NewVehicles: NewData,
            ServerMsg: data.Msg
        });
        $(".btn").prop('disabled', false);
    }
    ApproveOrRejectCallbackError() {
        var NewData = this.state.NewVehicles;
        this.setState({
            NewVehicles: NewData,
            ServerMsg: 'failed! connecting to service'
        });
        $(".btn").prop('disabled', false);
    }

    componentDidMount() {
        this.getNewVehicles();
    }
    OpenRegister(e) {
        e.preventDefault();
        this.props.history.push(StringsModel.RegisterUrl);
    }
    OpenUserLogin(e) {
        e.preventDefault();
        this.props.history.push(StringsModel.LoginUrl);
    }
    getNewVehicles() {
        var model = {};
        CallService(StringsModel.getNewVehiclesAPI, StringsModel.POST, model, this.getVehiclesCallbackSuccess, this.getVehiclesCallbackError);
    }
    handleVehicleOperation(id, index, isApproved) {
        var model = { VehicleId: id };
        var NewData = this.state.NewVehicles;
        this.setState({
            NewVehicles: NewData,
            ServerMsg: 'Loading...'
        });
        var URL = '';
        URL = isApproved ? StringsModel.approveVehicleAPI : StringsModel.regictVehicleAPI;
        $(".btn").prop('disabled', true);

        CallService(URL, StringsModel.POST, model, this.ApproveOrRejectCallbackSuccess, this.ApproveOrRejectCallbackError, index);

    }
    drawVehicles() {
        let Result = '';
        if (this.state.NewVehicles.length >= 1) {
            Result = this.state.NewVehicles.map((Vehicle, index) =>
                <div className="card" key={index}>
                    <div className="card-body">
                        <h4 className="card-title">{Vehicle.PlateModel}</h4>
                        <p className="card-text">Plate Number: " {Vehicle.PlateNumber}</p>
                        <p className="card-text">Plate Text: " {Vehicle.PlateText}</p>
                        <p className="card-text">Plate Model: " {Vehicle.PlateModel}</p>
                        <p className="card-text">Plate Color: " {Vehicle.PlateColor}</p>
                        <p>
                            <button type="button" className="btn btn-success" onClick={e => this.handleVehicleOperation(Vehicle.VehicleId, index, true)}>Approve</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: 5 }} onClick={e => this.handleVehicleOperation(Vehicle.VehicleId, index, false)}>Reject</button>
                        </p>
                    </div>
                </div>
            );
        }

        return Result;
    }
    errorMessage() {
        let Result = '';
        var classMsg = '';
        if (this.state.ServerMsg.length >= 1) {
            if (this.state.ServerMsg === 'success') {
                classMsg = 'text-success';
            }
            else {
                classMsg = 'text-danger';
            }

            Result = (<small className={classMsg}>{this.state.ServerMsg}</small>)
        }
        return Result;
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">Admin</a>
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
                            <button className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: 5 }} onClick={this.OpenUserLogin}>Login</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.OpenRegister}>SignUp</button>
                        </form>
                    </div>
                </nav>

                <div className="container " style={{ marginTop: 60 }}>
                    <div id="AdminForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                        <h2 >New Vehicles requests..</h2>
                        {this.errorMessage()}
                        {this.drawVehicles()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;