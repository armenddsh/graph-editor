import React from "react";
import { NoMatch } from "./NoMatch";

export function NoMatchs(props) {
  return (
    <div className="section-container">
      <span className="section-name">No Matches</span>
      <ul>
        {props.nomatchs &&
          props.nomatchs.map((prompts, i) =>
            prompts.prompt.map((prompt, j) => (
              <li>{<NoMatch key={`${i}-${j}`} text={prompt.text} />}</li>
            ))
          )}

        <li>
          <div className="control">
            <input
              type="button"
              className="btn add-more"
              value="New No Match"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
