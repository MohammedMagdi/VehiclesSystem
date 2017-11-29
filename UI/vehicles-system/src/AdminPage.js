import React, { Component } from 'react';
import $ from "jquery";

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
    }
    componentDidMount() {
        this.getNewVehicles();
    }
    getNewVehicles() {
        var Message = '';
        var BaseUrl = 'http://localhost:49949';
        var ThisComponent = this;
        $.ajax({
            url: BaseUrl + '/vehicles/getNewVehicles',
            type: 'POST',
            dataType: "json",
            success: function (data, textStatus, xhr) {
                if (data.Msg === "success") {
                    if(data.Vehicles.length === 0){
                        Message = 'No new vehicles';
                    }
                    ThisComponent.setState({
                        NewVehicles: data.Vehicles,
                        ServerMsg: Message
                    });
                }
                else {
                    ThisComponent.setState({
                        ServerMsg: data.Msg
                    });
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                ThisComponent.setState({
                    ServerMsg: 'failed! connecting to service'
                });
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
    }
    handleVehicleOperation(id, index, isApproved) {
        var model = { VehicleId: id };
        var NewData = this.state.NewVehicles;
        this.setState({
            NewVehicles: NewData,
            ServerMsg: 'Loading...'
        });
        var BaseUrl = 'http://localhost:49949';
        var URL = '';
        URL = isApproved ? 'approve' : 'reject';
        var ThisComponent = this;
        $(".btn").prop('disabled', true);
        $.ajax({
            url: BaseUrl + '/vehicles/' + URL,
            type: 'POST',
            data: model,
            dataType: "json",
            success: function (data, textStatus, xhr) {
                if (data.Msg === "success") {
                    NewData.splice(index, 1);
                }
                ThisComponent.setState({
                    NewVehicles: NewData,
                    ServerMsg: data.Msg
                });
                $(".btn").prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                ThisComponent.setState({
                    NewVehicles: NewData,
                    ServerMsg: 'failed! connecting to service'
                });
                $(".btn").prop('disabled', false);
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
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
            <div className="container">
                <div id="AdminForm" style={{ maxWidth: 800, padding: 15, margin: '0 auto' }}>
                    <h2 >New Vehicles requests..</h2>
                    {this.errorMessage()}
                    {this.drawVehicles()}
                </div>
            </div>
        );
    }
}

export default AdminPage;