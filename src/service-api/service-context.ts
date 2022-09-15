import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { TContext } from '../components/vk-api/vk-api-context';

export type TServiceContext = {
  loader: {
    isLoading?: boolean;
    loaderMessage?: string;
  };
  popUps: {
    showError?: boolean;
    showMessage?: boolean;
    delayMs: number;
    textMessage?: string;
  };
  updateServiceStateContext: Dispatch<SetStateAction<TServiceContext>>;
}

export const defaultServiceContext: TServiceContext = {
  popUps: {
    showError: false,
    showMessage: false,
    delayMs: 3000,
  },
  loader: {
    isLoading: false,
  },
  updateServiceStateContext: (c) => undefined,
};

export const ServiceContext = React.createContext(defaultServiceContext);

export function useServiceContext() {
  const context = React.useContext(ServiceContext);

  return React.useMemo(() => context, [context]);
}