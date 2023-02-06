import * as React from 'react';
import { useVkApiContext } from '../../../vk-api-context';
import { useTableWithPagination } from './table-with-pagination';
import { TableBodyWithPage } from './table-body-with-page';
import { TablesLinks } from './pages-links';
import './db-table.css';
import { usePopups } from '../../../../pop-ups/popups-hooks';

export const DbSearchTableController = () => {
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number | undefined>();
  const [isSorted, setIsSorted] = React.useState<boolean>(false);
  const { profilesFoundInDb } = useVkApiContext();
  const { setShowMessagePopUp } = usePopups();
  const {
    tableHead,
    aggregatedProfilesByPages,
    hasResult,
    pagesTotalCount,
    profilesFoundCount,
    getSortedAggregatedProfilesByCorrelationEstimation,
  } = useTableWithPagination(profilesFoundInDb);

  React.useEffect(
    () => {
      if (hasResult) {
        setCurrentPageNumber(1);
      }
    }, [hasResult],
  );

  React.useEffect(
    () => {
      if (profilesFoundInDb && isSorted) {
        // сбрасываем флаг isSorted если подгружен новый массив и ранее уже была сортировка
        setIsSorted(false);
      }
    }, [profilesFoundInDb, isSorted],
  );

  React.useEffect(
    () => {
      if (isSorted) {
        setCurrentPageNumber(undefined);
        setTimeout(() => {
          setCurrentPageNumber(1);
          setShowMessagePopUp('Массив отсортирован');
        }, 500);
      }
      /* eslint-disable react-hooks/exhaustive-deps */
      // не должен вызываться при изменении ссылки на setShowMessagePopUp
    }, [isSorted],
  );

  console.log('DbSearchTable', {
    profilesFoundInDb,
    aggregatedProfilesByPages,
    hasResult,
    pagesTotalCount,
    currentPageNumber,
    isSorted,
  });

  if (!profilesFoundInDb) {
    return null;
  }

  return (
     <>
       <button onClick={() => !isSorted ? setIsSorted(true) : setShowMessagePopUp('Массив уже отсортирован')}>
         Сортировка по вероятности отношений по убыванию
       </button>
       <TablesLinks numberOfPages={pagesTotalCount} setCurrentPageNumber={setCurrentPageNumber} />
       <table className={'table-db-matches'}>
         <caption style={{ marginBottom: '10px', marginLeft: '200px' }}>
           { profilesFoundInDb.length === 0 ? 'Не найдено' : `Данные из БД (найдено ${profilesFoundCount}, страница ${currentPageNumber ?? ''})`}
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
               aggregatedByPagesProfilesFoundInDb={isSorted
                 ? getSortedAggregatedProfilesByCorrelationEstimation(aggregatedProfilesByPages)
                 : aggregatedProfilesByPages}
               currentPageNumber={currentPageNumber}
            />
         }
         </tbody>
       </table>
     </>
  );
};