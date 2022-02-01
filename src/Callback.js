import React from "react";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export const Callback = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="atom" data-situation="callback" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Prompts prompts={props.data.config.prompts} />}

        <div className="divider"></div>

        {<Actions actions={props.data.action} situationName={props.data.id} />}
      </div>
    </div>
  );
});