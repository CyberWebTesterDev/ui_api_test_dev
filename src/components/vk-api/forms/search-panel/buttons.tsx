import * as React from 'react';
import { useSearchPanelActions } from '../../hooks/use-search-panel';
import { usePopups } from '../../../pop-ups/popups-hooks';

export const Buttons = () => {
  const { showLoader, getMockedProfiles } = useSearchPanelActions();
  const { setShowMessagePopUp } = usePopups();

  return (
     <>
       <button onClick={() => getMockedProfiles()}>Тест данных</button>
       <button onClick={() => showLoader()}>Loader</button>
       <button onClick={() => setShowMessagePopUp()}>Test popup</button>
     </>
  );
};