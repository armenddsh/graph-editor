import React, { useRef } from "react";

export function Action(props) {
  const ref = useRef();

  let top = 0;
  let left = 0;
  if (ref.current) {
    top = ref.current.parentNode.offsetTop + 15;
    left = ref.current.parentNode.offsetLeft + ref.current.clientWidth + 10;
  }

  const handleStartDragging = (event) => {
    const situationName = props.situationName;
    const actionId = props.id;
    const clientX = event.clientX;
    const clientY = event.clientY;

    props.startDragging({
      situationName,
      actionId,
      clientX,
      clientY
    });
  };

  return (
    <div data-id="action" className="action">
      <div className="control">
      <i className="fab fa-yandex-international action-icon"></i>
      <input
        ref={ref}
        type="text"
        placeholder="Action Condition"
        value={props.action.condition.eval}
        onChange={(e) => props.onChange(props.id, e.target.value)}
      />
      <i
        className="fas fa-times-circle remove-action-icon"
        onClick={() => props.onRemove(props.id)}
      ></i>
    </div>
    <i
      style={{top: top, left: left}}
      className="far fa-circle circle-icon action-next"
      onPointerDown={handleStartDragging}
    ></i>
    </div>
  );
}
