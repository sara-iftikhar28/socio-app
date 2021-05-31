import React from "react";
import PropTypes from "prop-types";
import { TablePagination } from "@material-ui/core";

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;

  return (
    <TablePagination
      component="div"
      count={itemCount}
      page={currentPage}
      onChangePage={(x, page) => onPageChange(page)}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[]}
    />
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
