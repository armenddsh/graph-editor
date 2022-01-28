import React from "react";
import { Mapping } from "./Mapping";

export function Mappings(props) {
  return (
    <div className="section-container">
      <span className="section-name">Mappings</span>
      <ul>
        {props.mappings &&
          props.mappings.map((mapping, i) => (
            <li>{<Mapping key={i} mapping={mapping} />}</li>
          ))}

        <li>
          <div className="control">
            <input type="button" className="btn add-more" value="New Mapping" />
          </div>
        </li>
      </ul>
    </div>
  );
}
