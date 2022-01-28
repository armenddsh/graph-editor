import React from "react";
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

export default function App() {
  const [data, _] = React.useState({
    name: "test_0001",
    description: "Test 0001. Play Prompt",
    start: "start",
    situations: {
      start: {
        situation: "@textout",
        config: {
          language: "'de-DE'",
          prompts: [
            {
              count: 1,
              bargein: false,
              prompt: [
                {
                  text: "Das ist der Test mit der Nummer 1."
                },
                {
                  audio: "jingle.wav"
                }
              ]
            }
          ]
        },
        action: [
         {
           condition: {
             eval: "x == 1"
           },
           next: "greeting"
         }
        ],
        position: {
          x: 100,
          y: 100,
          active: false,
          offset: {
            x: 48,
            y: 13
          },
          width: "100%",
          height: "100%",
          moving: false
        },
        id: "start"
      },
      greeting: {
        config: {
          prompts: [
            {
              prompt: [
                {
                  text: "Hallo"
                }
              ]
            }
          ]
        },
        action: [],
        id: "greeting",
        situation: "@textout",
        description: "",
        position: {
          x: 420,
          y: 100,
          active: false,
          offset: {
            x: 104,
            y: 27
          },
          width: "100%",
          height: "100%",
          moving: false
        }
      }
    }
  });

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
    console.log(data);
  };

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

  const situationsArray = Object.keys(data.situations);
  return (
    <div className="draw-container">
      {situationsArray.map((situationName) =>
        <React.Fragment key={situationName}>
          {
            renderSituation(data.situations[situationName])
          }
        </React.Fragment>
      )}
    </div>
  );
}
