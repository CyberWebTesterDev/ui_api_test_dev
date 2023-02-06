import * as React from 'react';
import { useSearchPanelInputs } from '../../hooks/use-search-panel';

export const Buttons = () => {
  const { handleSearchMatchedProfiles, testGetProfilesCheckDBByIds } = useSearchPanelInputs();

  return (
     <>
       {/*<button onClick={() => showLoader()}>Loader</button>*/}
       {/*<button onClick={() => setShowMessagePopUp()}>Test popup</button>*/}
       <button onClick={() => handleSearchMatchedProfiles()}>Find matches</button>
       <button onClick={() => testGetProfilesCheckDBByIds()}>Test intersections</button>
     </>
  );
};