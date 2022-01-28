import React from "react";
import { Action } from "./Action";

export function Actions(props) {
  return (
    <div className="section-container">
      <span className="section-name">Actions</span>
      <ul>
        {props.actions &&
          props.actions.map((action, i) => (
            <li>{<Action key={i} action={action} />}</li>
          ))}
        <li>
          <div className="control">
            <input type="button" className="btn add-more" value="New Action" />
          </div>
        </li>
      </ul>
    </div>
  );
}
