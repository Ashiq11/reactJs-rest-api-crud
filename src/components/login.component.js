import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        const { username, password } = this.state;

        // axios.post(
        //         "http://localhost:3000/login",
        //         {
        //             user: {
        //                 username: username,
        //                 password: password
        //             }
        //         },
        //         { withCredentials: true }
        //     )
        //     .then(response => {
        //         if (response.data.logged_in) {
        //             this.props.handleSuccessfulAuth(response.data);
        //             this.props.history.push('/user');
        //         }
        //     })
        //     .catch(error => {
        //         console.log("login error", error);
        //     });
        // event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2 className="d-flex justify-content-center">User Course Management System</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="col-sm-6 offset-sm-3">
                        <input type="text" placeholder="username"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                            className="form-control" />
                        <br />
                        <input type="password" placeholder="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="form-control" />
                        <br />
                        <span className="input-group-btn">
                            <Link to={"/user"}>Click to login</Link>
                        </span>
                        {/* <button className="btn btn-primary">Login</button> */}
                        {/* <button className="btn btn-primary" onClick={() => this.props.history.push('/user')}>Login</button> */}
                    </div>
                </form>
            </div >
        );
    }

}