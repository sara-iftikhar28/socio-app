import React from "react";
import { Redirect, Route } from "react-router";
import authService from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authService.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            ></Redirect>
          );
        return Component ? <Component {...props}></Component> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
