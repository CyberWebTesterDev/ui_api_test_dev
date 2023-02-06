import * as React from 'react';

type TTableLinksProps = {
  numberOfPages: number;
  setCurrentPageNumber: (pageNumber: number) => void;
}

export const TablesLinks = ({ numberOfPages, setCurrentPageNumber }: TTableLinksProps) => {
  const pages = new Array(numberOfPages).fill(0).map((_, i) => i + 1);
  const hasManyPages = numberOfPages > 1;
  const endIndex = numberOfPages - 1;
  return (
     <div className={'pages-count-div'}>
       Страницы:
       {pages.map(
         (page, idx) => (
            <span
               key={`${idx}_link`}
               className={'page-number'}
               onClick={() => setCurrentPageNumber(page)}>
              {page} {hasManyPages && idx !== endIndex ? ',' : ''}
            </span>
         ),
       )}
     </div>
  );
};