import React from "react";
import { Actions } from "./Actions";
import { Mappings } from "./Mappings";

export function Situation(props) {
  return (
    <div className="atom" data-situation="situation" data-id={props.data.id}>
      <div className="container">
        <div className="atom-input"></div>
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>
        <div>
          <span className="section-name">Reference filename</span>
          <ul>
            <li>
              <div className="control">
                <i className="far fa-comment-dots comment-icon"></i>
                <input
                  type="text"
                  placeholder="Reference filename"
                  value={props.data.situation}
                />
              </div>
            </li>
          </ul>
        </div>

        <div className="divider"></div>

        {<Mappings mappings={props.data.config.mappings} />}

        <div className="divider"></div>

        {<Actions actions={props.data.action} />}
      </div>
    </div>
  );
}
