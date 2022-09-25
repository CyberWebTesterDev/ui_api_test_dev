import * as React from 'react';
import { DbSearchPanel } from './db-search-panel/db-search-panel';
import { DbSearchTable } from './db-search-panel/table/db-search-table';

export const DbSearchContainer = () => {

  return (
     <div className={'db-search-container'}>
       <DbSearchPanel />
       <DbSearchTable />
     </div>
  );
};