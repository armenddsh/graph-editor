import React from "react";

export function NoMatch(props) {
  return (
    <div className="control">
      <i className="far fa-comment-dots comment-icon"></i>
      <input type="text" placeholder="NoMatch Text" value={props.text} />
      <i className="fas fa-times-circle remove-icon"></i>
    </div>
  );
}
