import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../utils/API"
import { Input, TextArea, FormBtn } from "../components/input";
import { Col, Row, Container } from "../components/grid";

class Login extends Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.email && this.state.password) {
            console.log(this.state.username)
            API.signupUser({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            })
              .then(res => {console.log(res); window.location.href="/user"})
              .catch(err => console.log(err));
          }
    }
    
    render() {
        return (
            <Wrapper>
                <h1 className="text-center">SignUp to Macklist!</h1><br/>
                <div className="mx-5">
                <Col>
                <form>
                    <Input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                    />
                    <Input
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                    />
                    <Input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                    />
                    <FormBtn
                        disabled={!(this.state.username && this.state.password && this.state.email)}
                        onClick={this.handleFormSubmit}
                    >
                        SignUp
              </FormBtn>
                </form>
                <a className="btn btn-success" href="/login">LogIn</a><br/>
                <a className="btn btn-success mt-2" href="/forgotPassword">Forgot Password</a><br/>
                <a href="/" className="btn btn-success mt-2">Home Page</a>
                </Col>
                </div>
            </Wrapper>
        )
    }
}

export default Login;