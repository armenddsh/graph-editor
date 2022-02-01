import React, { createRef, useCallback, useState } from "react";
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

function createRefs(situations) {
  const newObj = {};
  for (const situationName of Object.keys(situations)) {
    newObj[situationName] = createRef();
  }
  return newObj;
}

export default function GraphEditor(props) {
  const [data, setData] = useState(props.data);
  const refs = React.useRef(createRefs(data.situations));

  const [isDragging, setDragging] = useState({
    isDragging: false,
    from: {
      situation: "",
      actionId: 0,
      x: 0,
      y: 0,
    },
    to: {
      situation: "",
      x: 0,
      y: 0,
    },
    x: 0,
    y: 0,
  });

  const handleChange = useCallback(
    (ev) => {
      setData((oldData) => {
        return {
          ...oldData,
          situations: {
            ...oldData.situations,
            [ev.id]: ev,
          },
        };
      });
    },
    [data]
  );

  const handleStartDragging = useCallback(
    (event) => {
      if (event.situationName) {
        setDragging((dragging) => {
          return {
            ...dragging,
            from: {
              ...dragging.from,
              situation: event.situationName,
              actionId: event.actionId,
              x: event.clientX,
              y: event.clientY,
            },
            isDragging: true,
          };
        });
      }
    },
    [isDragging]
  );

  const handleEndDragging = useCallback(
    (event) => {
      if (isDragging.from && isDragging.from.situation) {
        setDragging({
          from: {
            situation: "",
            actionId: 0,
            x: 0,
            y: 0,
          },
          to: {
            situation: "",
            x: 0,
            y: 0,
          },
          x: 0,
          y: 0,
          isDragging: false,
        });
  
        setData((oldData) => {
          const situations = oldData.situations;
          const situation = situations[isDragging.from.situation];
          situation.action[isDragging.from.actionId].next = event.situationName;
  
          return {
            ...oldData,
            situations: {
              ...oldData.situations,
              [isDragging.from.situation]: situation,
            },
          };
        });
      }
    },
    [isDragging, data]
  );

  const handleDragging = useCallback(
    (event) => {
      setDragging((dragging) => {
        return {
          ...dragging,
          x: event.clientX,
          y: event.clientY,
        };
      });
    },
    [isDragging]
  );

  const renderSituation = (situation) => {
    const situationName = situation.situation;
    if (situationName === "@textout") {
      return (
        <TextOutWithDraggingComponent
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
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
          ref={refs.current[situation.id]}
          situation={situation}
          change={handleChange}
          startDragging={handleStartDragging}
          endDragging={handleEndDragging}
        />
      );
    }
  };

  const situationsArray = Object.keys(data.situations);

  const connectSituations = (situationsArray) => {
    const connections = [];
    for (const situationName of situationsArray) {
      const situation = data.situations[situationName];
      for (
        let actionIndex = 0;
        actionIndex < situation.action.length;
        actionIndex++
      ) {
        const next = situation.action[actionIndex].next;
        const toSituation = data.situations[next];
        if (situationName && next && toSituation) {
          const fromSituationRef = refs.current[situationName].current;
          const toSituationRef = refs.current[next].current;

          const fromRect = fromSituationRef.getBoundingClientRect();
          const toRect = toSituationRef.getBoundingClientRect();

          const containerElement = fromSituationRef.childNodes[1];

          for (const containerChildNode of containerElement.childNodes) {
            const containerId = containerChildNode.getAttribute("data-id");
            if (containerId === "actions") {
              for (const actionList of containerChildNode.childNodes) {
                const actionListId = actionList.getAttribute("data-id");

                if (actionListId === "actionList") {
                  const actionLi = actionList.childNodes[actionIndex];
                  const offsetTop = actionLi.offsetTop;

                  connections.push(
                    <line
                      key={`${situation.id}-action[${actionIndex}]-${next}`}
                      className="draggable__line"
                      x1={(fromRect.left + fromRect.width + 0) | 0}
                      y1={(fromRect.top + offsetTop + 23) | 0}
                      x2={toRect.left | 0}
                      y2={toRect.top + toRect.height / 2 + 8 || 0}
                    />
                  );
                }
              }
            }
          }
        }
      }
    }

    return connections;
  };

  return (
    <div className="draw-container" onPointerMove={handleDragging}>
      {situationsArray.map((situationName) => (
        <React.Fragment key={situationName}>
          {renderSituation(data.situations[situationName])}
        </React.Fragment>
      ))}

      <svg height="100%" width="100%">
        {isDragging.isDragging && (
          <svg height="100%" width="100%">
            <line
              className="dragging__line"
              x1={isDragging.from.x | 0}
              y1={isDragging.from.y | 0}
              x2={isDragging.x | 0}
              y2={isDragging.y | 0}
            />
          </svg>
        )}
        {connectSituations(situationsArray).map((connection) => connection)}
      </svg>
    </div>
  );
}
