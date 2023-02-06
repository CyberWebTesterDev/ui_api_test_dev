import * as React from 'react';
import { DbSearchPanel } from './db-search-panel/db-search-panel';
import { DbSearchTableController } from './db-search-panel/table/db-search-table-controller';

export const DbSearchContainer = () => {

  return (
     <div className={'db-search-container'}>
       <DbSearchPanel />
       <DbSearchTableController />
     </div>
  );
};