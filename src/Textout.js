import React, { useEffect } from "react";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export const Textout = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState(props.situation);
  
  const handlePromptsChange = React.useCallback(
    (prompts) => {
      const newObj = Object.assign({}, state, {
        config: Object.assign({}, state.config, { prompts }),
      });
      setState(newObj);
    },
    [state]
  );

  const handleActionsChange = React.useCallback(
    (action) => {
      const newObj = Object.assign({}, state, { action });
      setState(newObj);
    },
    [state]
  );

  useEffect(() => {
    props.change(state);
  }, [state]);

  const handleEndDragging = () => {
    const situationName = state.id;

    props.endDragging({
      situationName
    });
  };

  return (
    <div ref={ref} className="atom" data-situation="texout" data-id={state.id}>
      <i
        className="far fa-circle atom-input"
        onPointerUp={handleEndDragging}
      ></i>

      <div className="container">
        <div className="atom__name">
          <span>{state.id}</span>
        </div>

        {
          <Prompts
            prompts={state.config.prompts}
            onChange={handlePromptsChange}
          />
        }

        <div className="divider"></div>

        {
          <Actions
            actions={state.action}
            onChange={handleActionsChange}
            situationName={state.id}
            startDragging={props.startDragging}
            endDragging={props.endDragging}
          />
        }
      </div>
    </div>
  );
});
