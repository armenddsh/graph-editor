import React from "react";
import { Prompts } from "./Prompts";

export const Exit = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="atom" data-situation="exit" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Prompts prompts={props.data.config.prompts} />}
      </div>
    </div>
  );
});