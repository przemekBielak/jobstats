import React, { Component } from 'react';

const PresentComponent = props => {
    const data = props.data;
    if(typeof data != "undefined" && data.length > 0) {
        return (
            <div>
                {data.map((item) => (
                    <div>
                        <h2>id: {item.id} language: {item.language} city: {item.city} seniority: {item.seniority}</h2>
                        <h2>jobs number: {item.count} minimum avarage salary: {item.salaryMinAvg} maximum avarage salary: {item.salaryMaxAvg}</h2>

                        <ul>
                            {item.mustHaveRequirements.map((req) => (
                                <li>{req[0]}: {req[1]}</li>
                            ))}
                        </ul>
                    </div>
                ))}
           </div>
        );
    }
    else {
        return (
            <h1>empty</h1>
        );
    }
}

export default PresentComponent;
