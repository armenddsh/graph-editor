import React from "react";
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
    
    /*
        <TextOutWithDraggingComponent data={textout} />
        <SimpleInputWithDraggingComponent data={simpleInput} />,
        <HotwordWithDraggingComponent data={hotword} />,
        <CallbackWithDraggingComponent data={callback} />,
        <SwitchWithDraggingComponent data={switchc} />,
        <ExitWithDraggingComponent data={exit} />,
        <SituationWithDraggingComponent data={situation} />
    */
    
      const handleChange = (data) => {
        props.onChange(oldData => {
          return {
            ...oldData,
            [data.id]: data
          }
        });    
      };
    
      const state = useSelector(state => state);
      const dispatch = useDispatch();
    
      console.log("state", state);
    
      const renderSituation = (situation) => {
        const situationName = situation.situation;
        if (situationName === "@textout") {
          return <TextOutWithDraggingComponent data={situation} onChange={handleChange} /> 
        }
        if (situationName === "@callback") {
          return <CallbackWithDraggingComponent data={situation} onChange={handleChange} />
        }
        if (situationName === "@switch") {
          return <SwitchWithDraggingComponent data={situation} onChange={handleChange} />
        }
        if (situationName === "@exit") {
          return <ExitWithDraggingComponent data={situation} onChange={handleChange} />
        }
        if (situationName === "@situation") {
          return <SituationWithDraggingComponent data={situation} onChange={handleChange} />
        }
        if (situationName === "@simpleinput") {
          return <SimpleInputWithDraggingComponent data={situation} onChange={handleChange} />
        }
      }
    
      const handlePointerMove = (event) => {
        if (state.app.startDragging.positions.startX && state.app.startDragging.positions.startY) {
          dispatch({
            type: "MOUSE_DRAGGING",
            payload: {
              positions: {
                x: event.clientX,
                y: event.clientY
              } 
            }
          });
        }
      };

    const situationsArray = Object.keys(props.data.situations);
    return (
        <div className="draw-container" onPointerMove={handlePointerMove}>
      {situationsArray.map((situationName) =>
        <React.Fragment key={situationName}>
          {
            renderSituation(props.data.situations[situationName])
          }
        </React.Fragment>
      )}
      {
        state.app.startDragging.startSituation &&
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
        )
      }
    </div>
    );
}