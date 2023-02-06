import * as React from 'react';
import { TProfileDBExtended, VK_NAMES_DB_BY_KEY_MAP } from '../../../vk-lib/vk-models';
import { DEFAULT_LOAD_NUMBER_BY_PAGE } from '../constants/constants';
import { getDiffByCorrelationEstimationDesc } from '../../../utils/vk-data-utild';

type TAggregatedProfilesByPage = {
  [p: string]: TProfileDBExtended[];
}

export function useTableWithPagination (profilesFoundInDb: TProfileDBExtended[] | null | undefined) {
  const isProfilesInDbPresent = profilesFoundInDb && profilesFoundInDb.length > 0;

  const aggregatedProfilesByPages = React.useMemo(
    (): TAggregatedProfilesByPage => {
      const profilesPresentOrEmpty = isProfilesInDbPresent ? profilesFoundInDb : [];
      const pagesByDefaultNumber = Math.floor(profilesPresentOrEmpty.length / DEFAULT_LOAD_NUMBER_BY_PAGE);
      const pagesCount = pagesByDefaultNumber > 0 ? pagesByDefaultNumber : 1;
      const getEndIndexByPageNumber = (pageNumber: number) => pageNumber * DEFAULT_LOAD_NUMBER_BY_PAGE;
      const getStartIndexByPageNumber = (pageNumber: number) => (pageNumber * DEFAULT_LOAD_NUMBER_BY_PAGE)
         - DEFAULT_LOAD_NUMBER_BY_PAGE;
      let aggr: {[key: number]: TProfileDBExtended[];} = {};

      for (let i = 1; i <= pagesCount; i++) {
        aggr = {
          ...aggr,
          [i.toString()]: profilesPresentOrEmpty.slice(getStartIndexByPageNumber(i), getEndIndexByPageNumber(i)),
        };
      }
      return aggr;
    }, [isProfilesInDbPresent, profilesFoundInDb],
  );

  const getSortedAggregatedProfilesByCorrelationEstimation = React.useCallback(
    (aggregatedProfiles: TAggregatedProfilesByPage) => {
      Object.keys(aggregatedProfiles).forEach(
        (keyPage) => aggregatedProfiles[keyPage]
          .sort(getDiffByCorrelationEstimationDesc),
      );
      return aggregatedProfiles;
    }, [],
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
    getSortedAggregatedProfilesByCorrelationEstimation,
  };
}