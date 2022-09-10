import { TContext, useVkApiContext } from '../vk-api-context';
import { TAppContext, useApplicationContext } from '../../application-container/app-context';
import { getMockedProfilesData } from '../forms/test-data/mocked-data';
import * as React from 'react';

export function useSearchPanelInputs() {
  const context = useVkApiContext();
  const { updateStateContext } = useApplicationContext();
  const { inputsData: { offset, quantity, name, age } } = context;

  const getRefsValues = (): TContext['inputsData'] => ({
    name: name ?? '',
    quantity: quantity ?? '',
    offset: offset ?? '',
    age: age ?? '',
  });

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        name: event.target.value,
      },
    });
  };

  const handleChangeOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        offset: event.target.value,
      },
    });
  };

  const handleChangeQnt = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        quantity: event.target.value,
      },
    });
  };

  const handleChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        age: event.target.value,
      },
    });
  };

  return {
    getRefsValues,
    handleChangeName,
    handleChangeOffset,
    handleChangeQnt,
    handleChangeAge,
  };
}

export function useSearchPanelActions() {
  const context = useVkApiContext();
  const { updateStateContext } = useApplicationContext();

  const handleClickLoader = () => {
    updateStateContext({
      ...context,
      isLoading: !context.isLoading,
    });
  };

  const getProfiles = () => {
    updateStateContext({
      ...context,
      profilesFound: getMockedProfilesData(),
    });
  };

  return { handleClickLoader, getProfiles };
}