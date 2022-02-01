import React from "react";
import { useDispatch } from "react-redux";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export const Textout = React.forwardRef((props, ref) => {

  const [state, setState] = React.useState(props);
  const dispatch = useDispatch();
  
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

  return (
    <div ref={ref} className="atom" data-situation="texout" data-id={props.id}>
      <i
        className="far fa-circle atom-input"
        onPointerUp={(event) =>
          dispatch({
            type: "END_DRAGGING",
            payload: {
              endSituation: props.id,
              positions: {
                endX: event.clientX,
                endY: event.clientY,
              },
            },
          })
        }
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
            situationName={props.id}
          />
        }
      </div>
    </div>
  );
});
