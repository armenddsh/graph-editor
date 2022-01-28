import React from "react";
import { Actions } from "./Actions";
import { Grammars } from "./Grammars";
import { NoInputs } from "./NoInputs";
import { NoMatchs } from "./NoMatchs";
import { Prompts } from "./Prompts";

export function SimpleInput(props) {
  return (
    <div className="atom" data-situation="simpleinput" data-id={props.data.id}>
      <div className="container">
        <div className="atom__name">
          <span>{props.data.id}</span>
        </div>

        {<Prompts prompts={props.data.config.prompts} />}

        <div className="divider"></div>

        {<Grammars grammars={props.data.config.grammars} />}

        <div className="divider"></div>

        {<NoInputs noinputs={props.data.config.noinput} />}

        <div className="divider"></div>

        {<NoMatchs nomatchs={props.data.config.nomatch} />}

        <div className="divider"></div>

        {<Actions actions={props.data.action} />}
      </div>
    </div>
  );
}
