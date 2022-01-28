import React from "react";
import { Prompt } from "./Prompt";

export function Prompts(props) {
  return (
    <div className="section-container">
      <span className="section-name">Prompts</span>
      <ul>
        {props.prompts &&
          props.prompts.map((prompts, i) =>
            prompts.prompt.map((prompt, j) => (
              <li>{<Prompt key={`${i}-${j}`} text={prompt.text} />}</li>
            ))
          )}

        <li>
          <div className="control">
            <input type="button" className="btn add-more" value="New Prompt" />
          </div>
        </li>
      </ul>
    </div>
  );
}
