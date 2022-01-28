import React from "react";
import { Prompts } from "./Prompts";

export function Exit(props) {
  return (
    <div className="atom" data-situation="exit" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Prompts prompts={props.data.config.prompts} />}
      </div>
    </div>
  );
}
