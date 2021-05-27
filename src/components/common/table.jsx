import React from "react";
import TableHeader from "./tableBody";
import TableBody from "./tableBody";

const Table = (props) => {
  const { sortedColumn, onSort, data, columns } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
