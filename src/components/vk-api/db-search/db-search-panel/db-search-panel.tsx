import * as React from 'react';
import { STANDARD_INPUT_VALUES } from './constants/constants';
import { Input } from './components/inputs';
import { useDbSearchPanel } from '../use-db-search-panel';

export const DbSearchPanel = () => {
  const {
    onChangeListener,
    inputs,
  } = useDbSearchPanel();

  return (
     <div className={'db-search-form'}>
       <Input
          value={inputs.estimation}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.ESTIMATION.FIELD_NAME}
          id={STANDARD_INPUT_VALUES.ESTIMATION.FIELD_NAME}
       />
       <Input
          value={inputs.corrEstimation}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.CORR_ESTIMATION.FIELD_NAME}
          id={STANDARD_INPUT_VALUES.CORR_ESTIMATION.FIELD_NAME}
       />
     </div>
  );
};