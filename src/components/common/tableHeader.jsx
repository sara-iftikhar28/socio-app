import { TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortedColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.order = "asc";
      sortColumn.path = path;
    }
    return this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    if (column.path === this.props.sortedColumn.path)
      if (this.props.sortedColumn.order === "asc")
        return <i className="fa fa-sort-asc"></i>;
      else return <i className="fa fa-sort-desc"></i>;
    return null;
  };

  render() {
    const { columns } = this.props;
    return (
      <TableHead display="grid">
        <TableRow style={{ background: "lightgray" }}>
          {columns.map((x) => (
            <TableCell
              key={x.path || x.key}
              onClick={() => this.raiseSort(x.path)}
            >
              <Typography variant="subtitle1">
                {x.name} {this.renderSortIcon(x)}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
