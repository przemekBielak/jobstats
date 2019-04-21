import React, { Component } from 'react';

const SelectComponent = props => {
    var items = props.values.map(it => <option value={it}>{it}</option>);

    return (
        <select 
          input={props.input} 
          defaultValue={props.defaultValue}
          onChange={props.handleInput}
        >
          {items}
        </select>
    );
}

export default SelectComponent;
