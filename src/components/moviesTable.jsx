import Like from "./common/like";
import React, { Component } from "react";
import Table from "./common/table";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class MoviesTable extends Component {
  columns = [
    { name: "Title", path: "title" },
    { name: "Genre", path: "genre.name" },
    { name: "Stock", path: "numberInStock" },
    { name: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          like={movie.like}
          onToggle={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortedColumn, onSort } = this.props;
    return (
      //   <Table
      //     data={movies}
      //     sortedColumn={sortedColumn}
      //     onSort={onSort}
      //     columns={this.columns}
      //   ></Table>
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortedColumn={sortedColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={movies} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default MoviesTable;
