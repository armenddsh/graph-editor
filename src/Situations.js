import React from "react";
import {
  SimpleInputWithDraggingComponent,
  TextOutWithDraggingComponent,
  CallbackWithDraggingComponent,
  SwitchWithDraggingComponent,
  ExitWithDraggingComponent,
  SituationWithDraggingComponent
} from "./App";

export function Situations(props) {
  const situations = React.useMemo(
    () => ({
      "@textout": <TextOutWithDraggingComponent data={props} />,
      "@simpleinput": <SimpleInputWithDraggingComponent data={props} />,
      "@callback": <CallbackWithDraggingComponent data={props} />,
      "@switch": <SwitchWithDraggingComponent data={props} />,
      "@exit": <ExitWithDraggingComponent data={props} />,
      "@situation": <SituationWithDraggingComponent data={props} />
    }),
    [props]
  );

  return situations[props.situation];
}
