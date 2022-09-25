import * as React from 'react';
import { STANDARD_INPUT_VALUES } from './db-search-panel/constants/constants';
import { TProfileDBExtended } from '../vk-lib/vk-models';
import { useApiVKService } from '../../../service-api/service-api';
import { useApplicationContext } from '../../application-container/app-context';
import { useVkApiContext } from '../vk-api-context';
import { usePopups } from '../../pop-ups/popups-hooks';

const defaultState = {
  inputs: {
    estimation: STANDARD_INPUT_VALUES.ESTIMATION.DEFAULT_VALUE,
    corrEstimation: STANDARD_INPUT_VALUES.CORR_ESTIMATION.DEFAULT_VALUE,
    creationDbDateFrom: STANDARD_INPUT_VALUES.DB_CREATION_DATE_FROM.DEFAULT_VALUE,
    creationDbDateBefore: STANDARD_INPUT_VALUES.DB_CREATION_DATE_TO.DEFAULT_VALUE,
    isFavorite: STANDARD_INPUT_VALUES.FAVORITES.DEFAULT_VALUE,
    isRelated: STANDARD_INPUT_VALUES.RELATIVES.DEFAULT_VALUE,
  },
};

export function useDbSearchPanel () {
  const [state, setState] = React.useState(defaultState);
  const { getProfilesDBExtendedByEstOrCorrEst } = useApiVKService();
  const { updateStateContext } = useApplicationContext();
  const context = useVkApiContext();
  const { setShowErrorPopUp } = usePopups();

  console.log('useDbSearchPanel', {
    state,
  });

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
    if (e.target.id === 'date-input-from') {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          creationDbDateFrom: e.target.value,
        },
      });
    }
    if (e.target.id === 'date-input-before') {
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          creationDbDateBefore: e.target.value,
        },
      });
    }
    if (e.target.id === 'is-favorite') {
      const resultValue = e.target.value === 'null' ? 'true'
        : e.target.value === 'true' ? 'null' : 'true';
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          isFavorite: resultValue,
        },
      });
    }
    if (e.target.id === 'is-related') {
      const resultValue = e.target.value === 'null' ? 'true'
        : e.target.value === 'true' ? 'null' : 'true';
      setState({
        ...state,
        inputs: {
          ...state.inputs,
          isRelated: resultValue,
        },
      });
    }
  };

  const searchProfilesInDbByInputs = async () => {
    const result = await getProfilesDBExtendedByEstOrCorrEst(
      state.inputs.estimation,
      state.inputs.corrEstimation,
      state.inputs.creationDbDateFrom,
      state.inputs.creationDbDateBefore,
      state.inputs.isFavorite,
      state.inputs.isRelated,
    );
    updateStateContext({
      ...context,
      profilesFoundInDb: result,
    });
  };

  const validateInputs = () => {
    const { inputs: { creationDbDateFrom, creationDbDateBefore } } = state;
    if (creationDbDateFrom > creationDbDateBefore) {
      setShowErrorPopUp('Дата от не может быть больше даты до');
    } else {
      searchProfilesInDbByInputs();
    }
  };

  return {
    onChangeListener,
    inputs: state.inputs,
    searchProfilesInDbByInputs,
    validateInputs,
  };
}