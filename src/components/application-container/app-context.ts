import * as React from 'react';
import { TContext } from '../vk-api/vk-api-context';
import { Dispatch, SetStateAction } from 'react';

export type TAppContext = {
  updateStateContext: Dispatch<SetStateAction<TContext>>;
}

const defaultAppContext: TAppContext = {
  updateStateContext: (c) => undefined,
};

export const ApplicationContext = React.createContext(defaultAppContext);

export function useApplicationContext() {
  const context = React.useContext(ApplicationContext);

  return React.useMemo(() => context, [context]);
}