import * as React from 'react';
import { TProfileDBExtended, TProfileVK } from '../../../vk-lib/vk-models';
import { BASIC_FIELDS, BASIC_FIELDS_MAP_NAMES } from './fields-constants';

type TProfileFields = {
  profile: (TProfileDBExtended | TProfileVK) | null;
}

type keys = keyof (TProfileDBExtended | TProfileVK);

export const ProfileFields = ({ profile }: TProfileFields) => {
  if (!profile) {
    return (
       <>
         <h2>Данные отсутствуют</h2>
       </>
    );
  }
  const propFields = Object.keys(profile).map(
    key => {
      const value = profile[key as keys]?.toString();
      return BASIC_FIELDS.some(field => field === key) && (
         <div key={key} className={'property-field'}>
           {BASIC_FIELDS_MAP_NAMES[key as keyof typeof BASIC_FIELDS_MAP_NAMES] ?? key}
           <div key={`_${key}`} className={'value-div'}>
             { key === 'id' ? <a href={`https://vk.com/id${profile.id}`} target={'_blank'}>{value}</a> : value}
           </div>
         </div>
      );
    },
  );
  return (
     <>
       {propFields}
     </>
  );
};