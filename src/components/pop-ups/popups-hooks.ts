import * as React from 'react';
import { useApplicationContext } from '../application-container/app-context';
import { useVkApiContext } from '../vk-api/vk-api-context';

export function usePopups () {
  const context = useVkApiContext();
  const { updateStateContext } = useApplicationContext();
  const { popUps } = context;

  const setShowMessagePopUp = () => {
    updateStateContext({
      ...context,
      popUps: {
        ...popUps,
        showMessage: true,
      },
    });
    setTimeout(() => {
      updateStateContext({
        ...context,
        popUps: {
          ...popUps,
          showMessage: false,
        },
      });
    }, popUps.delayMs);
  };

  const setShowErrorPopUp = () => {
    updateStateContext({
      ...context,
      popUps: {
        ...popUps,
        showError: true,
      },
    });
    setTimeout(() => {
      updateStateContext({
        ...context,
        popUps: {
          ...popUps,
          showError: false,
        },
      });
    }, popUps.delayMs);
  };

  return {
    setShowErrorPopUp,
    setShowMessagePopUp,
  };

}