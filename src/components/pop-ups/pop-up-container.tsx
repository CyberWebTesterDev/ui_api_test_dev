import * as React from 'react';
import { useVkApiContext } from '../vk-api/vk-api-context';
import { POPUP_CLASS_NAMES } from './popup-contants';
import './popups.css';

export const PopUpContainer = () => {
  const { popUps: { showMessage, showError } } = useVkApiContext();

  return (
     <>
       {showMessage && (
          <div className={POPUP_CLASS_NAMES.message}>
            <span>Всплывающее окно сообщения</span>
          </div>
       )}
       {showError && (
          <div className={POPUP_CLASS_NAMES.message}>
            <span>Всплывающее окно ошибки</span>
          </div>
       )}
     </>
  );
};