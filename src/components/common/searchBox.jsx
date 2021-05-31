import { TextField } from "@material-ui/core";
import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    ></TextField>
  );
};

export default SearchBox;
