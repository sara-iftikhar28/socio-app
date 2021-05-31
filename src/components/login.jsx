import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import authService from "../services/authService";
import { Redirect } from "react-router";
import { Typography } from "@material-ui/core";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location.href = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
