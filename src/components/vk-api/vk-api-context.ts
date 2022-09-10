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
  isLoading?: boolean;
};

export const defaultContext: TContext = {
  inputsData: {
    name: '',
    offset: '',
    quantity: '',
    age: '',
  },
};

export const VkApiContext = React.createContext(defaultContext);

export function useVkApiContext() {
  const context = React.useContext(VkApiContext);

  return React.useMemo(() => context, [context]);
}