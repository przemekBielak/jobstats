import React, { Component } from 'react';
import './style.css';

const PresentComponent = props => {
    const data = props.data;
    if(typeof data != "undefined" && data.length > 0) {
        return (
            <div className="main-flex">
                {data.map((item) => (
                    <div className="data-flex">
                        <div className="data-group">
                            <p className="data-text">id</p>
                            <p className="data-value">{item.id}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">language</p>
                            <p className="data-value">{item.language}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">city</p>
                            <p className="data-value">{item.city}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">seniority</p>
                            <p className="data-value">{item.seniority}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">jobs number</p>
                            <p className="data-value">{item.count}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">min avg salary</p>
                            <p className="data-value">{item.salaryMinAvg}</p>
                        </div>

                        <div className="data-group">
                            <p className="data-text">max avg salary</p>
                            <p className="data-value">{item.salaryMaxAvg}</p>
                        </div>

                        {/* {item.mustHaveRequirements.map((req) => (
                            <div className="data-group">
                                <p className="data-text">{req[0]}</p>
                                <p className="data-value">{req[1]}</p>
                            </div>
                        ))} */}
                    </div>
                ))}
            
            </div>
        );
    }
    else {
        return (
            <h1></h1>
        );
    }
}

export default PresentComponent;
