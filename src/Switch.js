import React from "react";
import { Actions } from "./Actions";

export function Switch(props) {
  return (
    <div className="atom" data-situation="switch" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Actions actions={props.data.action} />}
      </div>
    </div>
  );
}
