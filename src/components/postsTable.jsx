import React, { Component } from "react";
import Table from "./common/table";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { Link, Redirect } from "react-router-dom";

class PostsTable extends Component {
  columns = [
    { name: "Title", path: "title" },
    {
      key: "update",
      content: (post) => (
        <button
          onClick={() => {
            this.props.onUpdate(post.id);
          }}
          className="btn btn-primary btn-sm"
        >
          Update
        </button>
      ),
    },
    {
      key: "delete",
      content: (post) => (
        <button
          onClick={() => {
            this.props.onDelete(post.id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { posts, sortedColumn, onSort } = this.props;
    return (
      <Table
        data={posts}
        sortedColumn={sortedColumn}
        onSort={onSort}
        columns={this.columns}
      ></Table>
      // <table className="table">
      //   <TableHeader
      //     columns={this.columns}
      //     sortedColumn={sortedColumn}
      //     onSort={onSort}
      //   ></TableHeader>
      //   <TableBody data={posts} columns={this.columns}></TableBody>
      // </table>
    );
  }
}

export default PostsTable;
