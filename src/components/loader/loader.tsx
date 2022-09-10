import * as React from 'react';
import './loader.css';
import { useVkApiContext } from '../vk-api/vk-api-context';

export const Loader = () => {
  const { loader: { isLoading } } = useVkApiContext();

  return isLoading ? (
     <div className="b-popup">
       <div className="b-popup-content">
         Ожидание ответа от сервера <br/><span>...</span>
         <div className="d-flex justify-content-center">
           <div className="spinner-border" role="status">
             <span className="sr-only"></span>
           </div>
         </div>
       </div>
     </div>
  ): null;
};