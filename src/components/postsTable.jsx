import React from "react";
import Table from "./common/table";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TableContainer } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PostsTable = ({ posts, sortedColumn, onSort, onDelete, onUpdate }) => {
  const columns = [
    { name: "Title", path: "title" },
    {
      key: "update",
      content: (post) => (
        <button
          onClick={() => {
            onUpdate(post.id);
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
            onDelete(post.id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        data={posts}
        sortedColumn={sortedColumn}
        onSort={onSort}
        columns={columns}
      ></Table>
    </TableContainer>
  );
};

export default PostsTable;
