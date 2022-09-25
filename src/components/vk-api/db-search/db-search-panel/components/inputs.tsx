import * as React from 'react';

type TInput = {
  labelName: string;
  onChangeListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  id: string;
  type?: string;
}

export const Input = ({
  labelName,
  onChangeListener,
  value,
  disabled = false,
  id,
  type = 'text',
}: TInput) => {

  return (
     <div>
       <span> {labelName}: </span>
       <input id={id} onChange={(e) => onChangeListener(e)} value={value} disabled={disabled} type={type}/>
     </div>
  );
};