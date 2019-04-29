import React, { Component } from 'react';
import './style.css';

const SelectComponent = props => {
    var items = props.values.map(it => <option value={it}>{it}</option>);

    return (
      <div>
        <label htmlFor={props.name}>{props.name}</label>
        <select 
          id={props.name}
          input={props.input} 
          onChange={props.handleInput}
        >
          {items}
        </select>
      </div>
    );
}

export default SelectComponent;
