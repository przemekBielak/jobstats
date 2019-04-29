import React from 'react';
import './style.css';

const LegeComponent = props => {
    const data = props.data;
    if(typeof data != "undefined" && data.length > 0) {
        return (
            <div>
                <h2>Legend</h2>
                {data.map((item) => (
                    <p>
                        id {item.id}: {item.language}, {item.city}, {item.seniority}
                    </p>
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

export default LegeComponent;
