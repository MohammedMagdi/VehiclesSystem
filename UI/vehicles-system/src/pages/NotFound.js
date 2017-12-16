import React, { Component } from 'react';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            < div className="container" >
                <div className="error-template">
                    <h1>Oops!</h1>
                    <h2>404 Not Found</h2>
                    <div className="error-details">
                        Sorry, an error has occured, Requested page not found!<br />
                    </div>
                    <div className="error-actions">
                        <a href="" className="btn btn-primary" onClick={this.handleSubmit}>
                            <i className="icon-home icon-white" /> Take Me Home </a>
                        <a href="mailto:dev.mmagdi@gmail.com" className="btn btn-default">
                            <i className="icon-envelope" /> Contact Support </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFound;