import React from "react";
import PropTypes from "prop-types";
// Components
import Button from "@material-ui/core/Button";
import Input from "components/Input";
// Icons
import Clear from "@material-ui/icons/Clear";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";

export function OptionRow({
  value,
  onValueChange,
  onEnterPress,
  onUp,
  onDown,
  onDelete
}) {
  return (
    <div className="option-row">
      <span className="arrows">
        <KeyboardArrowUp onClick={onUp} />
        <KeyboardArrowDown onClick={onDown} />
      </span>
      <span>
        <RadioButtonUnchecked className="circle" />
      </span>
      <span className="text">
        <Input
          value={value}
          onValueChange={onValueChange}
          onEnterPress={onEnterPress}
          margin="none"
          className="option-row-input"
        />
      </span>
      <span className="delete">
        <Clear onClick={onDelete} />
      </span>
    </div>
  );
}

OptionRow.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
OptionRow.defaultProps = {
  onEnterPress: () => {}
};

export function AddOptionRow({ onAdd }) {
  return (
    <div className="option-row add-option">
      <span className="arrows" />
      <span>
        <RadioButtonUnchecked className="circle" />
      </span>
      <span className="text" onClick={onAdd}>
        <Button>Add option</Button>
      </span>
      <span className="delete" />
    </div>
  );
}

AddOptionRow.propTypes = {
  onAdd: PropTypes.func.isRequired
};
