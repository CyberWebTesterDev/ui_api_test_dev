import * as React from 'react';
import { useApplicationContext } from '../application-container/app-context';
import { useServiceContext } from '../../service-api/service-context';

export function usePopups () {
  const context = useServiceContext();
  const { popUps, updateServiceStateContext } = context;

  const setShowMessagePopUp = (message = '') => {
    updateServiceStateContext({
      ...context,
      popUps: {
        ...popUps,
        showMessage: true,
        textMessage: message,
      },
    });
    setTimeout(() => {
      updateServiceStateContext({
        ...context,
        popUps: {
          ...popUps,
          showMessage: false,
        },
      });
    }, popUps.delayMs);
  };

  const setShowErrorPopUp = (message = '') => {
    updateServiceStateContext({
      ...context,
      popUps: {
        ...popUps,
        showError: true,
        textMessage: message,
      },
    });
    setTimeout(() => {
      updateServiceStateContext({
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