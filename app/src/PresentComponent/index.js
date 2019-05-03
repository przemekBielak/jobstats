import React from 'react';
import './style.css';

const PresentComponent = props => {
    const data = props.data;
    if(typeof data != "undefined" && data.length > 0) {
        return (
            <div>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Seniority</th>
                        <th>City</th>
                        <th>Technology</th>
                        <th>Contract</th>
                    </tr>
                    {data.map(item => (
                        <tr>
                            <th>{item.id}</th>
                            <th>{item.seniority}</th>
                            <th>{item.city}</th>
                            <th>{item.language}</th>
                            <th>{item.contract}</th>
                        </tr>
                    ))}

                </table> 
            </div>
        );
    }
    else {
        return (null);
    }
}

export default PresentComponent;
