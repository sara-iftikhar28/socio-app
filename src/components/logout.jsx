import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    auth.logout();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
