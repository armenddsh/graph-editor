import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./styles.css";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

const initialState = {
  situations: {},
  startDragging:{
    startSituation: "",
    endSituation: "",
    actionId: "",
    positions: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      x: 0,
      y: 0
    },
  }
};

const appReducer = function(state = initialState , action) {
  switch (action.type) {
    case "START_DRAGGING":
      return {
        ...state,
        startDragging: {
          ...state.startDragging,
          startSituation: action.payload.startSituation,
          actionId: action.payload.actionId,
          positions: {
            ...state.startDragging.positions,
            startX: action.payload.positions.startX,
            startY: action.payload.positions.startY,
          }
        }
      };
      case "END_DRAGGING": 
        return {
          ...state,
          situations:{
            ...state.situations,
            [action.payload.situationName]: action.payload.situation
          },
          startDragging: {}
        };
        case "MOUSE_DRAGGING":
          return {
            ...state,
            startDragging: {
              ...state.startDragging,
              positions: {
                ...state.startDragging.positions,
                x: action.payload.positions.x,
                y: action.payload.positions.y,
              }
            }
          };
    default:
      return state;
  }  
}

const rootReducer = combineReducers({
  app: appReducer
});

const rootElement = document.getElementById("root");
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
