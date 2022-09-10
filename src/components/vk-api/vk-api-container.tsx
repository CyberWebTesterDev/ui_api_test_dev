import * as React from 'react';
import { defaultContext, VkApiContext } from './vk-api-context';
import { SearchPanel } from './forms/search-panel/search-panel';
import { VkProfilesTable } from './forms/vk-profiles-table';
import { Loader } from '../loader/loader';
import { ApplicationContext } from '../application-container/app-context';
import { PopUpContainer } from '../pop-ups/pop-up-container';

export const VkApiContainer = () => {
  const [state, setStateContext] = React.useState(defaultContext);

  // React.useEffect(
  //   () => {
  //     console.log('VkApiContainer context changed', {
  //       context: state,
  //     });
  //   }, [state],
  // );

  return (
     <ApplicationContext.Provider value={{ updateStateContext: setStateContext }}>
       <VkApiContext.Provider value={{ ...state }}>
         <Loader/>
         <PopUpContainer/>
         <SearchPanel/>
         <VkProfilesTable/>
       </VkApiContext.Provider>
     </ApplicationContext.Provider>

  );
};