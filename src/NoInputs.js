import React from "react";
import { NoInput } from "./NoInput";

export function NoInputs(props) {
  return (
    <div className="section-container">
      <span className="section-name">No Inputs</span>
      <ul>
        {props.noinputs &&
          props.noinputs.map((prompts, i) =>
            prompts.prompt.map((prompt, j) => (
              <li>{<NoInput key={`${i}-${j}`} text={prompt.text} />}</li>
            ))
          )}

        <li>
          <div className="control">
            <input
              type="button"
              className="btn add-more"
              value="New No Input"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
