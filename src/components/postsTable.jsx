import React, { Component } from "react";
import Table from "./common/table";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class PostsTable extends Component {
  columns = [
    { name: "Title", path: "title" },
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
      // <Table
      //   data={posts}
      //   sortedColumn={sortedColumn}
      //   onSort={onSort}
      //   columns={this.columns}
      // ></Table>
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortedColumn={sortedColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={posts} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default PostsTable;
