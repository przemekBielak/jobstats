import React, { Component } from 'react';

const LangSelect = props => {
    var items = props.cities.map(it => <option value={it}>{it}</option>);

    return (
        <select 
          value={props.cityInput} 
          defaultValue="Warsaw"
          onChange={props.handleCityInput}
        >
          {items}
        </select>
    );
}

export default LangSelect;
