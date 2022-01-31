import React, { useRef } from "react";
import { useDispatch } from "react-redux";

export function Action(props) {
  const dispatch = useDispatch();
  const ref = useRef();

  let top = 0;
  let left = 0;
  if (ref.current) {
    top = ref.current.parentNode.offsetTop + 15;
    left = ref.current.parentNode.offsetLeft + ref.current.clientWidth + 10;
  }

  return (
    <div className="action">
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
      className="far fa-circle circle-icon action-next" onPointerDown={(event) => dispatch({type: "START_DRAGGING", payload: {
      startSituation: props.situationName,
      actionId: props.id,
      positions: {
        startX: event.clientX,
        startY: event.clientY,
        endX: 0,
        endY: 0
      }
    }})}></i>
    </div>
  );
}
