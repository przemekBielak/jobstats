import React, { Component } from 'react';

const PresentComponent = props => {
    if(typeof props.data != "undefined") {
        return (
            <div>
                <h1>id: {props.data.id} technology: {props.data.language} city: {props.data.city} seniority: {props.data.seniority} contract: {props.data.contract}</h1>
                <h2>jobs number: {props.data.count} minimum avarage salary: {props.data.salaryMinAvg} maximum avarage salary: {props.data.salaryMaxAvg}</h2>
            </div>
        );
    }
    else {
        return (
            <h1>empty data[0]</h1>
        );
    }
}

export default PresentComponent;
