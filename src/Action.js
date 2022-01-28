import React from "react";

export function Action(props) {
  return (
    <div className="control">
      <i className="fab fa-yandex-international action-icon"></i>
      <input
        type="text"
        placeholder="Action Condition"
        value={props.action.condition.eval}
      />
      <i className="fas fa-times-circle remove-action-icon"></i>
      <i className="far fa-circle circle-icon"></i>
    </div>
  );
}
