import React, { Component } from "react";
import { TableCell, TableBody, TableRow } from "@material-ui/core";
import _ from "lodash";

class TableBody1 extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <TableBody>
        {data &&
          data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((x) => (
                <TableCell key={this.createKey(item, x)}>
                  {this.renderCell(item, x)}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    );
  }
}

export default TableBody1;
