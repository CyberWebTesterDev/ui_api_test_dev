import * as React from 'react';
import { STANDARD_INPUT_VALUES } from './db-search-panel/constants/constants';

const defaultState = {
  inputs: {
    estimation: STANDARD_INPUT_VALUES.ESTIMATION.DEFAULT_VALUE,
    corrEstimation: STANDARD_INPUT_VALUES.CORR_ESTIMATION.DEFAULT_VALUE,
  },
};

export function useDbSearchPanel () {
  const [state, setState] = React.useState(defaultState);

  const onChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === STANDARD_INPUT_VALUES.ESTIMATION.FIELD_NAME) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          estimation: e.target.value,
        },
      });
    }
    if (e.target.id === STANDARD_INPUT_VALUES.CORR_ESTIMATION.FIELD_NAME) {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          corrEstimation: e.target.value,
        },
      });
    }
  };

  return {
    onChangeListener,
    inputs: state.inputs,
  };
}