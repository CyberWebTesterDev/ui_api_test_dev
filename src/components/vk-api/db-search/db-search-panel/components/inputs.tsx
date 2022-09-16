import * as React from 'react';

type TInput = {
  labelName: string;
  onChangeListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  id: string;
}

export const Input = ({
  labelName,
  onChangeListener,
  value,
  disabled = false,
  id,
}: TInput) => {

  return (
     <div>
       <span> {labelName}: </span> <input id={id} onChange={(e) => onChangeListener(e)} value={value} disabled={disabled}/>
     </div>
  );
};