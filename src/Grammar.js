import React from "react";

export function Grammar(props) {
  return (
    <div className="control">
      <i className="far fa-comment-dots comment-icon"></i>
      <input type="text" placeholder="Grammar Text" value={props.grammar.src} />
      <i className="fas fa-times-circle remove-icon"></i>
    </div>
  );
}
