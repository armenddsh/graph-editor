import React from "react";
import { Actions } from "./Actions";

export const Switch = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="atom" data-situation="switch" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Actions actions={props.data.action} />}
      </div>
    </div>
  );
});