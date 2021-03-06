import React from "react";
import { Action } from "./Action";

export function Actions(props) {

  const addNewAction = () => {
    const actions = [...props.actions];

    actions.push({
      condition: { eval: "" },
      next: ""
    });

    props.onChange(actions);
  };

  const handleChangeAction = (index, text) => {
    const actions = [...props.actions];
    const currentAction = actions[index];
    currentAction.condition.eval = text;

    props.onChange(actions);
  };

  const handleRemove = (index) => {
    const actions = [...props.actions];
    actions.splice(index, 1);

    props.onChange(actions);
  };

  return (
    <div data-id="actions" className="section-container">
      <span className="section-name">Actions</span>
      <ul data-id="actionList">
        {props.actions &&
          props.actions.map((action, i) => (
            <li data-id="action" key={i}>
              {
                <Action
                  id={i}
                  action={action}
                  situationName={props.situationName}
                  onChange={handleChangeAction}
                  onRemove={handleRemove}
                  startDragging={props.startDragging}
                  endDragging={props.endDragging}
                />
              }
            </li>
          ))}
        <li key="add-new-action">
          <div className="control">
            <input type="button" className="btn add-more" value="New Action" onClick={addNewAction} />
          </div>
        </li>
      </ul>
    </div>
  );
}
