import * as React from 'react';
import { STANDARD_INPUT_VALUES } from './constants/constants';
import { Input } from './components/inputs';
import { useDbSearchPanel } from '../use-db-search-panel';
import '../db-search-panel.css';

export const DbSearchPanel = () => {
  const {
    onChangeListener,
    inputs,
    validateInputs,
    searchFirstLineProfiles,
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
       <Input
          value={inputs.creationDbDateFrom}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.DB_CREATION_DATE_FROM.FIELD_NAME}
          id={'date-input-from'}
          type={'date'}
       />
       <Input
          value={inputs.creationDbDateBefore}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.DB_CREATION_DATE_TO.FIELD_NAME}
          id={'date-input-before'}
          type={'date'}
       />
       <Input
          value={inputs.isFavorite}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.FAVORITES.FIELD_NAME}
          id={'is-favorite'}
          type={'checkbox'}
       />
       <Input
          value={inputs.isRelated}
          onChangeListener={onChangeListener}
          labelName={STANDARD_INPUT_VALUES.RELATIVES.FIELD_NAME}
          id={'is-related'}
          type={'checkbox'}
       />
       <button id={'btn-db-search'} onClick={() => validateInputs()}>Поиск</button>
       <button id={'btn-db-search'} onClick={() => searchFirstLineProfiles()}>Получить первую очередь</button>
     </div>
  );
};