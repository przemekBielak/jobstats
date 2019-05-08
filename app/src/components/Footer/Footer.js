import React from "react";
import "./Footer.css";

const Footer = props => {
  if (typeof props.data != "undefined" && props.data.length > 0) {
    return (
      <div className="table-center">
        <table>
          <caption>Details</caption>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Seniority</th>
              <th scope="col">City</th>
              <th scope="col">Technology</th>
              <th scope="col">Contract</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map(item => (
              <tr>
                <td data-label="id">{item.id}</td>
                <td data-label="Seniority">{item.seniority}</td>
                <td data-label="City">{item.city}</td>
                <td data-label="Technology">{item.language}</td>
                <td data-label="Contract">{item.contract}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return null;
  }
};

export default Footer;
