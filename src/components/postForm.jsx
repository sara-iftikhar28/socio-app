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
    this.populatePost();
  }

  async populatePost() {
    try {
      if (this.props.match.path === "/posts/new") return;
      const postId = this.props.match.params.id;

      const { data: post } = await postService.getPost(postId);
      this.setState({ data: this.mapToViewModel(post) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
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
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("body", "Body")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default PostForm;
