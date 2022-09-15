import * as React from 'react';
import { useDbConnect } from './use-db-connect';

export const Estimation = () => {
  const { currentEstimation, handleChangeCurrentEstimation } = useDbConnect();

  return (
     <label>
       Оцените профайл: {''}
       <select
          className="select-rating-est"
          value={currentEstimation}
          onChange={(e) => handleChangeCurrentEstimation(e)}
       >
         <option value="0">0</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="5.5">5.5</option>
         <option value="6">6</option>
         <option value="6.5">6.5</option>
         <option value="7">7</option>
         <option value="7.5">7.5</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
       </select>
     </label>
  );
};