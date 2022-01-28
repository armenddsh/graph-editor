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

  const handleChangeAction = (index, action) => {
    const actions = [...props.actions];
    actions[index] = action;

    props.onChange(actions);
  };

  return (
    <div className="section-container">
      <span className="section-name">Actions</span>
      <ul>
        {props.actions &&
          props.actions.map((action, i) => (
            <li key={i}>{<Action id={i} key={"action-" + i} action={action} onChange={handleChangeAction} />}</li>
          ))}
        <li>
          <div className="control">
            <input type="button" className="btn add-more" value="New Action" onClick={addNewAction} />
          </div>
        </li>
      </ul>
    </div>
  );
}
