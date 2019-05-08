import React from "react";
import "./Select.css";

const Select = props => {
  let items = props.values.map(it => {
    if (it == props.default) {
      return (
        <option value={it} selected>
          {it}
        </option>
      );
    } else {
      return <option value={it}>{it}</option>;
    }
  });

  return (
    <div>
      <label htmlFor={props.name}>{props.name}</label>
      <select id={props.name} input={props.input} onChange={props.handleInput}>
        {items}
      </select>
    </div>
  );
};

export default Select;
