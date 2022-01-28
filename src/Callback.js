import React from "react";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export function Callback(props) {
  return (
    <div className="atom" data-situation="callback" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Prompts prompts={props.data.config.prompts} />}

        <div className="divider"></div>

        {<Actions actions={props.data.action} />}
      </div>
    </div>
  );
}
