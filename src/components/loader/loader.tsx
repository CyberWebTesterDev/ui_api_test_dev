import * as React from 'react';
import './loader.css';
import { useVkApiContext } from '../vk-api/vk-api-context';

export const Loader = () => {
  const { isLoading } = useVkApiContext();

  return isLoading ? (
     <div className={'loader'}>
       <span>Идёт загрузка...</span>
     </div>
  ): null;
};