import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import postService from "../services/postService";

class PostForm extends Form {
  state = {
    data: {
      title: "",
      body: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    userId: Joi.number(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  };

  async componentDidMount() {
    if (this.props.match.path === "/posts/new") return;
    const postId = this.props.match.params.id;

    const { data: post } = await postService.getPost(postId);
    if (!post) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(post) });
  }

  mapToViewModel = (post) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    };
  };

  doSubmit = async () => {
    const postId = this.props.match.params.id;
    if (postId) {
      const { data: post } = await postService.updatePost(this.state.data);
      return this.props.history.push({
        pathname: "/posts",
        post: post,
      });
    }

    const { data: post } = await postService.savePost(this.state.data);
    return this.props.history.push({
      pathname: "/posts",
      post: post,
    });
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
