import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import onEnterKey from "utils/onEnterKey";

function Input({ value, onValueChange, onEnterPress, ...props }) {
  return (
    <TextField
      value={value}
      onChange={e => onValueChange(e.target.value)}
      onKeyPress={onEnterKey(onEnterPress)}
      margin="normal"
      fullWidth={true}
      autoFocus={true}
      {...props}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func
};
Input.defaultProps = {
  onEnterPress: () => {}
};

export default Input;
