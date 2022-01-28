import React from "react";

export function Action(props) {
  return (
    <div className="control">
      <i className="fab fa-yandex-international action-icon"></i>
      <input
        type="text"
        placeholder="Action Condition"
        value={props.action.condition.eval}
        onChange={(e) => props.onChange(props.id, e.target.value)}
      />
      <i
        className="fas fa-times-circle remove-action-icon"
        onClick={() => props.onRemove(props.id)}
      ></i>
      <i className="far fa-circle circle-icon"></i>
    </div>
  );
}
