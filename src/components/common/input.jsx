import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      id={name}
      {...rest}
      helperText={error ? error : null}
      error={error}
    />
  );
};

export default Input;
