import React from "react";

export function Mapping(props) {
  return (
    <div>
      <div className="control">
        <i className="far fa-comment-dots comment-icon"></i>
        <input
          type="text"
          placeholder="Description"
          value={props.mapping.description}
        />
      </div>
      <div className="control">
        <i className="far fa-comment-dots comment-icon"></i>
        <input type="text" placeholder="Name" value={props.mapping.name} />
      </div>
      <div className="control">
        <i className="far fa-comment-dots comment-icon"></i>
        <input type="text" placeholder="Value" value={props.mapping.value} />
      </div>
    </div>
  );
}
