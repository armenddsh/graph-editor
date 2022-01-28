import React, { useState, useEffect } from "react";

export function Prompt(props) {
  const key = Object.getOwnPropertyNames(props.prompt)[0];

  const [value, setValue] = useState(props.prompt);
  useEffect(() => {
    const prompt = {
        [key]: value
    };

    props.onChange(props.parentId, props.id, prompt);
  }, [value]);

  return (
    <div className="control">
      <i className="far fa-comment-dots comment-icon"></i>
      <input type="text" placeholder="Prompt Text" value={value[key]} onChange={(e) => setValue(e.target.value)} />
      <i className="fas fa-times-circle remove-icon" onClick={() => props.onRemove(props.parentId, props.id)}></i>
    </div>
  );
}
