import React from "react";
import Table1 from "./common/table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Table, TableContainer } from "@material-ui/core";

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
        <Button
          style={{ maxHeight: "30px" }}
          variant="outlined"
          color="primary"
          onClick={() => {
            onUpdate(post.id);
          }}
        >
          Update
        </Button>
      ),
    },
    {
      key: "delete",
      content: (post) => (
        <Button
          style={{ maxHeight: "30px" }}
          onClick={() => {
            onDelete(post.id);
          }}
          variant="outlined"
          color="secondary"
        >
          Delete
        </Button>
      ),
    },
  ];
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <Table1
          className={classes.table}
          data={posts}
          sortedColumn={sortedColumn}
          onSort={onSort}
          columns={columns}
        ></Table1>
      </Table>
    </TableContainer>
  );
};

export default PostsTable;
