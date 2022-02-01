import React, { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Callback } from "./Callback";
import { Exit } from "./Exit";
import { withDragging } from "./hoc/withDragging";
import { Hotword } from "./Hotword";
import { SimpleInput } from "./SimpleInput";
import { Situation } from "./Situation";
import { Switch } from "./Switch";
import { Textout } from "./Textout";

export const TextOutWithDraggingComponent = withDragging(Textout);
export const SimpleInputWithDraggingComponent = withDragging(SimpleInput);
export const HotwordWithDraggingComponent = withDragging(Hotword);
export const CallbackWithDraggingComponent = withDragging(Callback);
export const SwitchWithDraggingComponent = withDragging(Switch);
export const SituationWithDraggingComponent = withDragging(Situation);
export const ExitWithDraggingComponent = withDragging(Exit);

export default function GraphEditor(props) {
  const refs = React.useRef(Object.keys(props.data.situations).map(() => createRef()));

  const handleChange = (data) => {
    props.onChange((oldData) => {
      return {
        ...oldData,
        [data.id]: data,
      };
    });
  };

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const renderSituation = (situation, index) => {
    const situationName = situation.situation;
    if (situationName === "@textout") {
      return (
        <TextOutWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@callback") {
      return (
        <CallbackWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@switch") {
      return (
        <SwitchWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@exit") {
      return (
        <ExitWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@situation") {
      return (
        <SituationWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@simpleinput") {
      return (
        <SimpleInputWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
    if (situationName === "@hotword") {
      return (
        <HotwordWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          situations={props.data.situations}
          change={handleChange}
        />
      );
    }
  };

  const handlePointerMove = (event) => {
    if (
      state.app.startDragging.positions.startX &&
      state.app.startDragging.positions.startY
    ) {
      dispatch({
        type: "MOUSE_DRAGGING",
        payload: {
          positions: {
            x: event.clientX,
            y: event.clientY,
          },
        },
      });
    }
  };

  const situationsArray = Object.keys(props.data.situations);
  return (
    <div className="draw-container" onPointerMove={handlePointerMove}>
      {situationsArray.map((situationName, index) => (
        <React.Fragment key={situationName}>
          {renderSituation(props.data.situations[situationName], index)}
        </React.Fragment>
      ))}
      {state.app.startDragging.startSituation &&
        state.app.startDragging.positions.x > 0 &&
        state.app.startDragging.positions.y > 0 && (
          <svg height="100%" width="100%">
            <line
              className="draggable__line"
              x1={state.app.startDragging.positions.startX | 0}
              y1={state.app.startDragging.positions.startY | 0}
              x2={state.app.startDragging.positions.x | 0}
              y2={state.app.startDragging.positions.y | 0}
            />
          </svg>
        )}
    </div>
  );
}
