import React from "react";
import { Grammar } from "./Grammar";

export function Grammars(props) {
  return (
    <div className="section-container">
      <span className="section-name">Grammars</span>
      <ul>
        {props.grammars &&
          props.grammars.map((grammar, i) => (
            <li>{<Grammar key={i} grammar={grammar} />}</li>
          ))}

        <li>
          <div className="control">
            <input type="button" className="btn add-more" value="New Grammar" />
          </div>
        </li>
      </ul>
    </div>
  );
}
