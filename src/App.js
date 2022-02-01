import React from "react";
import GraphEditor from "./GraphEditor";

export default function App() {
  const [data, setData] = React.useState({
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
      demo: {
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
          x: 500,
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
        id: "demo"
      },
    },
  });

  return (
    <GraphEditor data={data} onChange={(data) => setData(data)} />
  );
}
