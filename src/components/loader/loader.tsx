import * as React from 'react';
import './loader.css';
import { useServiceContext } from '../../service-api/service-context';

export const Loader = () => {
  const { loader: { isLoading } } = useServiceContext();

  return isLoading ? (
     <div className="dimmer-block-loader">
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