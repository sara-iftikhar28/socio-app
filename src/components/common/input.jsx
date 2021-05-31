import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      variant="outlined"
      name={name}
      id={name}
      autoComplete={label}
      {...rest}
      helperText={error ? error : null}
      error={error}
    />
  );
};

export default Input;
