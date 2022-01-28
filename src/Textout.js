import React from "react";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export function Textout(props) {
  return (
    <div className="atom" data-situation="texout" data-id={props.data.id}>
      <div className="atom-input"></div>

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
