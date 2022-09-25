import * as React from 'react';
import { TProfileDBExtended, VK_NAMES_DB_BY_KEY_MAP } from '../../../vk-lib/vk-models';

export function useTableWithPagination (profilesFoundInDb: TProfileDBExtended[] | null | undefined) {
  const isProfilesInDbPresent = profilesFoundInDb && profilesFoundInDb.length > 0;
  const numberOfLoadByPage = 15;

  const aggregatedProfilesByPages = React.useMemo(
    () => {
      const profilesPresentOrEmpty = isProfilesInDbPresent ? profilesFoundInDb : [];
      const pagesBy50Number = Math.floor(profilesPresentOrEmpty.length / numberOfLoadByPage);
      const pagesCount = pagesBy50Number > 0 ? pagesBy50Number : 1;
      const getEndIndexByPageNumber = (pageNumber: number) => pageNumber * numberOfLoadByPage;
      const getStartIndexByPageNumber = (pageNumber: number) => (pageNumber * numberOfLoadByPage) - numberOfLoadByPage;
      let aggr: {[key: number]: TProfileDBExtended[];} = {};

      for (let i = 1; i <= pagesCount; i++) {
        aggr = {
          ...aggr,
          [i]: profilesPresentOrEmpty.slice(getStartIndexByPageNumber(i), getEndIndexByPageNumber(i)),
        };
      }
      return aggr;
    }, [isProfilesInDbPresent, profilesFoundInDb],
  );

  const tableHead = React.useMemo(
    () => {
      if (isProfilesInDbPresent) {
        return Object.keys(VK_NAMES_DB_BY_KEY_MAP).map(
          (key, idx) => {
            return (
                 <th key={key + '_' + idx}>{VK_NAMES_DB_BY_KEY_MAP[key as keyof typeof VK_NAMES_DB_BY_KEY_MAP]}</th>
            );
          },
        );
      }
      return null;
    }, [isProfilesInDbPresent],
  );

  return {
    aggregatedProfilesByPages,
    tableHead,
    hasResult: Object.keys(aggregatedProfilesByPages).length > 0,
    pagesTotalCount: Object.keys(aggregatedProfilesByPages).length,
    profilesFoundCount: profilesFoundInDb ? profilesFoundInDb.length : 0,
  };
}