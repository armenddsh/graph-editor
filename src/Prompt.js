import React, { useState, useEffect } from "react";

export function Prompt(props) {
  const [value, setValue] = useState(props.prompt);

  useEffect(() => {
    const prompt = {
        text: value
    };

    props.onChange(props.parentId, props.id, prompt);
  }, [value]);

  return (
    <div className="control">
      <i className="far fa-comment-dots comment-icon"></i>
      <input type="text" placeholder="Prompt Text" value={value.text} onChange={(e) => setValue(e.target.value)} />
      <i className="fas fa-times-circle remove-icon"></i>
    </div>
  );
}
