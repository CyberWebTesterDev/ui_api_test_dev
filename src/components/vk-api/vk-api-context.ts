import * as React from 'react';
import { TProfileVK, TProfileDBExtended, TProfileCheckDB } from './vk-lib/vk-models';

export type TContext = {
  inputsData: {
    name: string;
    offset: string;
    quantity: string;
    ageFrom: string;
    ageTo: string;
  };
  profilesFound?: (TProfileVK | null)[];
  profilesIntersections?: (TProfileCheckDB | undefined)[];
  selectorsData: {
    city: string;
    month: string;
    day: string;
    year: string;
  };
  profileCheckForm: {
    profileInDb: TProfileDBExtended | null;
    profileVKData: TProfileVK | null;
    idSearchParameter?: string;
  };
};

export const defaultContext: TContext = {
  inputsData: {
    name: '',
    offset: '',
    quantity: '',
    ageFrom: '',
    ageTo: '',
  },
  selectorsData: {
    city: '0',
    month: '0',
    day: '0',
    year: '',
  },
  profileCheckForm: {
    profileInDb: null,
    profileVKData: null,
  },
};

export const VkApiContext = React.createContext(defaultContext);

export function useVkApiContext() {
  const context = React.useContext(VkApiContext);

  return React.useMemo(() => context, [context]);
}