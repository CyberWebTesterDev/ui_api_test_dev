import { useDbConnect } from './use-db-connect';
import * as React from 'react';
import { useVkApiContext } from '../../../../vk-api-context';

export const Favorite = () => {
  const {
    profileCheckForm: { profileInDb },
  } = useVkApiContext();
  const { handleAddFavorite, handleDeleteFavorite } = useDbConnect();

  return profileInDb?.is_favorite ? (
     <div >В избранном
       <span className={'favorite-mark'}>&#10003;</span>
       <button
          onClick={() => handleDeleteFavorite()}
          className={'favorite-button'}
       >
         Удалить из избранных
       </button>
     </div>
  ) : (
     <button
        onClick={() => handleAddFavorite()}
        className={'favorite-button'}
     >
       Добавить в избранные
     </button>
  ) ;
};