import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import config from "../config.json";
import { getMovie } from "../services/fakeMovieService";

class PostForm extends Form {
  state = {
    data: {
      title: "",
      body: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.string(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  };

  async componentDidMount() {
    if (this.props.match.path === "/posts/new") return;
    const postId = this.props.match.params.id;

    const { data: post } = await http.get(config.apiEndpoint + "/" + postId);
    if (!post) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(post) });
  }

  mapToViewModel = (post) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
    };
  };

  doSubmit = () => {
    const { data: post } = http.post(config.apiEndpoint, this.state.data);
    // return <Redirect to={{ pathname: "/posts", data: { post } }} />;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Post Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("body", "Body")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default PostForm;
