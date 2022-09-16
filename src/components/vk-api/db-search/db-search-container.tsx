import * as React from 'react';
import { DbSearchPanel } from './db-search-panel/db-search-panel';
import { useVkApiContext } from '../vk-api-context';

export const DbSearchContainer = () => {

  return (
     <div className={'db-search-container'}>
       <DbSearchPanel />
     </div>
  );
};