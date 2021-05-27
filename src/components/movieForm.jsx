import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    if (this.props.match.path === "/movies/new") return;
    const movieId = this.props.match.params.id;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}

          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
