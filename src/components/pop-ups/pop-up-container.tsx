import * as React from 'react';
import { POPUP_CLASS_NAMES, POPUP_MESSAGES } from './popup-contants';
import './popups.css';
import { useServiceContext } from '../../service-api/service-context';

export const PopUpContainer = () => {
  const { popUps: { showMessage, showError, textMessage } } = useServiceContext();
  const popupText = textMessage ? textMessage : POPUP_MESSAGES.DEFAULT_MESSAGE;

  return (
     <>
       {showMessage && (
          <div className={POPUP_CLASS_NAMES.message}>
            <span>{popupText}</span>
          </div>
       )}
       {showError && (
          <div className={POPUP_CLASS_NAMES.error}>
            <span>{popupText}</span>
          </div>
       )}
     </>
  );
};