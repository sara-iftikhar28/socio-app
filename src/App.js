import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Posts from "./components/posts";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import PostForm from "./components/postForm";
import NotFound from "./components/common/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/posts/new" component={PostForm}></Route>
          <Route path="/posts/:id" component={PostForm}></Route>
          <Route path="/posts" component={Posts}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/posts"></Redirect>
        </Switch>
      </main>
      ;
    </React.Fragment>
  );
}

export default App;
