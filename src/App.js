import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import jwtDecode from "jwt-decode";
import Posts from "./components/posts";
import LoginForm from "./components/login";
import RegisterForm from "./components/registerForm";
import PostForm from "./components/postForm";
import NotFound from "./components/common/notFound";
import Navbar from "./components/common/navbar";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <Navbar user={user}></Navbar>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route
              path="/posts/new"
              render={(props) => {
                if (!user) return <Redirect to="/login"></Redirect>;
                return <PostForm {...props}></PostForm>;
              }}
            ></Route>
            <ProtectedRoute
              path="/posts/:id"
              component={PostForm}
            ></ProtectedRoute>
            <Route
              path="/posts"
              render={(props) => {
                if (!user) return <Redirect to="/login"></Redirect>;
                return <Posts {...props} user={this.state.user}></Posts>;
              }}
            ></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/posts"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
