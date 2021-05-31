import React from "react";
import TableHeader from "./tableBody";
import TableBody1 from "./tableBody";

const Table = ({ data, sortedColumn, onSort, columns }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody1 data={data} columns={columns}></TableBody1>
    </table>
  );
};

export default Table;
