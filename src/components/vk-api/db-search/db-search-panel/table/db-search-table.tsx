import * as React from 'react';
import { useVkApiContext } from '../../../vk-api-context';
import { useTableWithPagination } from './table-with-pagination';
import { TableBodyWithPage } from './table-body-with-page';
import { TablesLinks } from './pages-links';
import './db-table.css';

export const DbSearchTable = () => {
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number | undefined>();
  const { profilesFoundInDb } = useVkApiContext();
  const {
    tableHead,
    aggregatedProfilesByPages,
    hasResult,
    pagesTotalCount,
    profilesFoundCount,
  } = useTableWithPagination(profilesFoundInDb);

  React.useEffect(
    () => {
      if (hasResult) {
        setCurrentPageNumber(1);
      } else {
        setCurrentPageNumber(undefined);
      }
    }, [hasResult],
  );

  console.log('DbSearchTable', {
    profilesFoundInDb,
    aggregatedProfilesByPages,
    hasResult,
    pagesTotalCount,
    currentPageNumber,
  });

  if (!profilesFoundInDb) {
    return null;
  }

  return (
     <>
       <TablesLinks numberOfPages={pagesTotalCount} setCurrentPageNumber={setCurrentPageNumber} />
       <table className={'table-db-matches'}>
         <caption style={{ marginBottom: '10px', marginLeft: '200px' }}>
           { profilesFoundInDb.length === 0 ? 'Не найдено' : `Данные из БД (найдено ${profilesFoundCount}, страница ${currentPageNumber})`}
         </caption>
         <thead>
         <tr key={'table-head-row-db'}>
           {tableHead}
         </tr>
         </thead>
         <tbody>
         {
            hasResult && currentPageNumber &&
            <TableBodyWithPage
               aggregatedByPagesProfilesFoundInDb={aggregatedProfilesByPages}
               currentPageNumber={currentPageNumber}
            />
         }
         </tbody>
       </table>
     </>
  );
};