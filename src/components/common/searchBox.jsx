import { Grid, TextField } from "@material-ui/core";
import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        fullWidth
        style={{
          background: "#fff",
          marginTop: "10px",
        }}
        onChange={(e) => onChange(e.currentTarget.value)}
      ></TextField>
    </Grid>
  );
};

export default SearchBox;
