import { FormEvent, ReactNode } from "react";
import Button from "./Button";
import React from "react";

type Props = {
  onSubmit: (event: FormEvent<Element>) => void;
  children: ReactNode;
  submitLabel: string;
};

const Form = ({ onSubmit, submitLabel, children }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto"
    >
      
      {React.Children.map(children, (child: ReactNode, i) => (
        <div className="flex flex-col py-2" key={i}>{child}</div>
      ))}
      <Button cta label={submitLabel} submit />
    </form>
  );
};

export default Form;
