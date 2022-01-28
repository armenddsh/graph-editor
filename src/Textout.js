import React from "react";
import { Actions } from "./Actions";
import { Prompts } from "./Prompts";

export function Textout(props) {
  const [state, setState] = React.useState(props.data);
  console.log(state);
  const handlePromptsChange = React.useCallback((prompts) => {
    const newObj = Object.assign({}, state, {
        config: Object.assign({}, state.config, { prompts })
    });
    setState(newObj);
  }, [state]);

  const handleActionsChange = React.useCallback((action) => {
      const newObj = Object.assign({}, state, { action });
      setState(newObj);
    }, [state]);
  
  return (
    <div className="atom" data-situation="texout" data-id={props.data.id}>
      <i className="far fa-circle atom-input"></i>

      <div className="container">
        <div className="atom__name">
          <span>{state.id}</span>
        </div>

        {<Prompts
          prompts={state.config.prompts}
          onChange={handlePromptsChange}
        />}

        <div className="divider"></div>

        {<Actions
          actions={state.action}
          onChange={handleActionsChange}
        />}
      </div>
    </div>
  );
}
