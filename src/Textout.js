import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export const Textout = React.forwardRef((props, ref) => {
  const { situation, situations, change } = props;

  const [state, setState] = React.useState(situation);
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

  useEffect(() => {
    change(state);
  }, [state]);

  return (
    <div ref={ref} className="atom" data-situation="texout" data-id={situation.id}>
      <i
        className="far fa-circle atom-input"
        onPointerUp={(event) => {
          const situationName = state.startDragging.startSituation;
          const actionId = state.startDragging.actionId;
          
          const newSituation = JSON.parse(JSON.stringify(situation))
          newSituation.actions[actionId].next = situation.id;

          dispatch({
            type: "END_DRAGGING",
            payload: {
              situationName: situationName,
              situation: newSituation,
            },
          })
        }}
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
            situationName={situation.id}
          />
        }
      </div>
    </div>
  );
});
