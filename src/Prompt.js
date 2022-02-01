import React from "react";

export function Prompt(props) {
  const key = Object.getOwnPropertyNames(props.prompt)[0];

  return (
    <div data-id="prompt" className="control">
      <i className="far fa-comment-dots comment-icon"></i>
      <input
        type="text"
        placeholder="Prompt Text"
        value={props.prompt[key]}
        onChange={(e) => props.onChange(props.parentId, props.id, { [key]: e.target.value })}
      />
      <i
        className="fas fa-times-circle remove-icon"
        onClick={() => props.onRemove(props.parentId, props.id)}
      ></i>
    </div>
  );
}
