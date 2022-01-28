import React from "react";
import { Prompt } from "./Prompt";

export function Prompts(props) {

  const addNewPrompt = () => {
    const prompts = [
      ...props.prompts,
    ];

    prompts.push({
      count: 1,
      bargein: false,
      prompt: [{
        text: ""
      }]
    });

    props.onChange(prompts);
  };

  const handleChangePrompt = (parentIndex, index, prompt) => {
    const prompts = [
      ...props.prompts,
    ];
    prompts[parentIndex].prompt[index] = prompt;

    props.onChange(prompts);
  };

  const handleRemove = (parentIndex, index) => {
    const prompts = [
      ...props.prompts,
    ];

    prompts[parentIndex].prompt.splice(index, 1);

    props.onChange(prompts);
  }

  return (
    <div className="section-container">
      <span className="section-name">Prompts</span>
      <ul>
        {props.prompts &&
          props.prompts.map((prompts, i) =>
            prompts.prompt.map((prompt, j) => (
              <li key={`${i}-${j}`}>{
                <Prompt 
                  parentId={i} 
                  id={j}
                  prompt={prompt} 
                  onChange={handleChangePrompt}
                  onRemove={handleRemove}
                />}
              </li>
            ))
          )}

        <li key="add-new-prompt">
          <div className="control">
            <input type="button" className="btn add-more" value="New Prompt" onClick={addNewPrompt} />
          </div>
        </li>
      </ul>
    </div>
  );
}
