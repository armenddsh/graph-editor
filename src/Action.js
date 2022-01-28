import React, {useState, useEffect} from "react";

export function Action(props) {
  const [value, setValue] = useState(props.action.condition.eval);

  useEffect(() => {
    const action = {
      condition: {
        eval: value
      },
      next: props.action.next
    };
    
    props.onChange(props.id, action);
  }, [value]);

  return (
    <div className="control">
      <i className="fab fa-yandex-international action-icon"></i>
      <input
        type="text"
        placeholder="Action Condition"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <i className="fas fa-times-circle remove-action-icon" onClick={() => props.onRemove(props.id)}></i>
      <i className="far fa-circle circle-icon"></i>
    </div>
  );
}
