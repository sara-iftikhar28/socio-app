import { TextField } from "@material-ui/core";
import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <TextField name={name} id={name} {...rest} variant="outlined">
        <option>Type to select</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </TextField>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
