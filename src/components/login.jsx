import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import authService from "../services/authService";
import { Redirect } from "react-router";
import { Button, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Input from "./common/input";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = (props) => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  };

  const validate = () => {
    const result = Joi.validate(data, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const validationSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, validationSchema);
    return result.error ? result.error.details[0].message : null;
  };

  const handleChange = (e) => {
    const errors1 = { ...errors };
    const errorMessage = validateProperty(e.currentTarget);
    if (errorMessage) {
      errors1[e.currentTarget.name] = errorMessage;
    } else delete errors1[e.currentTarget.name];

    const data1 = { ...data };
    data1[e.currentTarget.name] = e.currentTarget.value;
    setData(data1);
    setErrors(errors1);
  };

  const handleSubmit = (e) => {
    //prevent page reload
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    //Call to Server
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const { username, password } = data;
      await auth.login(username, password);
      const { state } = props.location;
      window.location.href = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorsList = { ...errors };
        errorsList.username = ex.response.data;
        setErrors(errorsList);
      }
    }
  };

  const renderButton = (label) => {
    return (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={validate() != null ? true : false}
        fullWidth
      >
        {label}
      </Button>
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
      ></Input>
    );
  };
  const classes = useStyles();

  if (authService.getCurrentUser()) return <Redirect to="/"></Redirect>;
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            {renderInput("username", "Username")}
            {renderInput("password", "Password", "password")}

            {renderButton("Login")}
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default LoginForm;
