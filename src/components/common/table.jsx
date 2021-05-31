import React from "react";
import TableHeader from "./tableHeader";
import TableBody1 from "./tableBody";

const Table1 = ({ data, sortedColumn, onSort, columns }) => {
  return (
    <React.Fragment>
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody1 data={data} columns={columns}></TableBody1>
    </React.Fragment>
  );
};

export default Table1;
