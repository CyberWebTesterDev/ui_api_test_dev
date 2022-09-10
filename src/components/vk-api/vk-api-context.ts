import * as React from 'react';
import { TProfile } from './vk-lib/vk-models';

export type TContext = {
  inputsData: {
    name: string;
    offset: string;
    quantity: string;
    age: string;
  };
  profilesFound?: TProfile[];
  loader: {
    isLoading?: boolean;
    loaderMessage?: string;
  };
  popUps: {
    showError?: boolean;
    showMessage?: boolean;
    delayMs: number;
  };
  selectorsData: {
    city: string;
    month: string;
    day: string;
    year: string;
  };
};

export const defaultContext: TContext = {
  inputsData: {
    name: '',
    offset: '',
    quantity: '',
    age: '',
  },
  popUps: {
    showError: false,
    showMessage: false,
    delayMs: 3000,
  },
  loader: {
    isLoading: false,
  },
  selectorsData: {
    city: '0',
    month: '0',
    day: '0',
    year: '0',
  },
};

export const VkApiContext = React.createContext(defaultContext);

export function useVkApiContext() {
  const context = React.useContext(VkApiContext);

  return React.useMemo(() => context, [context]);
}