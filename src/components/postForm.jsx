import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import postService from "../services/postService";
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./common/input";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));
const PostForm = (props) => {
  const [data, setData] = useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({});
  const [currentRoute, setCurrentRoute] = useState("");

  const schema = {
    id: Joi.number(),
    userId: Joi.number(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  };

  useEffect(() => {
    setCurrentRoute(props.match.path);
    try {
      populatePost();
    } catch (ex) {}
  }, [setData]);

  const populatePost = async () => {
    try {
      if (props.match.path === "/posts/new") return;
      const postId = props.match.params.id;

      const { data } = await postService.getPost(postId);
      setData(mapToViewModel(data));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        props.history.replace("/not-found");
    }
  };

  const mapToViewModel = (post) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    };
  };

  const doSubmit = async () => {
    try {
      const { data: post } = await postService.savePost(data);
      toast.success("Post updated successfully");
      return props.history.push({
        pathname: "/posts",
        post: post,
      });
    } catch (ex) {
      toast.error("Error updating post");
    }
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

  const renderInput = (name, label, type = "text", multiline = false) => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        multiline={multiline}
        error={errors[name]}
      ></Input>
    );
  };

  const classes = useStyles();
  const isDetailPage = currentRoute === "/posts/detail/:id" ? true : false;
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <form
              autoComplete="off"
              className={classes.form}
              onSubmit={handleSubmit}
            >
              {renderInput("title", "Title")}
              {renderInput("body", "Body", "text", true)}
              {!isDetailPage && renderButton("Save")}
            </form>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PostForm;
