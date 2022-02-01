import React, { createRef, useState } from "react";
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

  const [isDragging, setDragging] = useState({
    isDragging: false,
    from: {
      situation: "",
      actionId: 0,
      x: 0,
      y: 0
    },
    to: {
      situation: "",
      x: 0,
      y: 0
    },
    x: 0,
    y: 0
  });

  const handleChange = (data) => {
    props.onChange((oldData) => {
      return {
        ...oldData,
        [data.id]: data,
      };
    });
  };
  
  const handleStartDragging = ( data ) => {
    setDragging(dragging => {
      return {
        ...dragging,
        from: {
          ...dragging.from,
          situation: data.situationName,
          actionId: data.actionId,
          x: data.clientX,
          y: data.clientY
        },
        isDragging: true
      }
    });
  };

  const handleEndDragging = ( data ) => {
    setDragging(dragging => {
      return {
        ...dragging,
        to: {
          ...dragging.from,
          situation: data.situationName,
        },
        isDragging: false
      }
    });
  };

  const handleDragging = ( data ) => {
    setDragging(dragging => {
      return {
        ...dragging,
        x: data.clientX,
        y: data.clientY
      }
    });
  };

  const renderSituation = (situation, index) => {
    const situationName = situation.situation;
    if (situationName === "@textout") {
      return (
        <TextOutWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@callback") {
      return (
        <CallbackWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@switch") {
      return (
        <SwitchWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@exit") {
      return (
        <ExitWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@situation") {
      return (
        <SituationWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@simpleinput") {
      return (
        <SimpleInputWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
    if (situationName === "@hotword") {
      return (
        <HotwordWithDraggingComponent
          ref={refs.current[index]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
  };

  const situationsArray = Object.keys(props.data.situations);
  return (
    <div className="draw-container" onPointerMove={handleDragging}>
      {situationsArray.map((situationName, index) => (
        <React.Fragment key={situationName}>
          {renderSituation(props.data.situations[situationName], index)}
        </React.Fragment>
      ))}
      { isDragging.isDragging && (
          <svg height="100%" width="100%">
            <line
              className="draggable__line"
              x1={isDragging.from.x | 0}
              y1={isDragging.from.y | 0}
              x2={isDragging.x | 0}
              y2={isDragging.y | 0}
            />
          </svg>
        )}
    </div>
  );
}
