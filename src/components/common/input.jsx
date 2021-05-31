import React from "react";
import { Grid, TextField } from "@material-ui/core";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Grid item xs={12}>
      <TextField
        label={label}
        variant="outlined"
        name={name}
        id={name}
        {...rest}
        helperText={error ? error : null}
        error={error}
      />
    </Grid>
  );
};

export default Input;
