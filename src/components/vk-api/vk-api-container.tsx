/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { SearchPanel } from './forms/search-panel/search-panel';
import { VkProfilesTable } from './forms/vk-profiles-table';
import { useVkApiContext } from './vk-api-context';

export const VkApiContainer = () => {
  const { profilesFound, profilesIntersections } = useVkApiContext();

  React.useEffect(() => {
    console.log('VkApiContainer context change', {
      profilesFound,
      profilesIntersections,
    });
  }, [profilesFound, profilesIntersections],
  );

  return (
     <>
       <SearchPanel/>
       <VkProfilesTable profilesFound={profilesFound}/>
     </>
  );
};