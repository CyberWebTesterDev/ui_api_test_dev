import * as React from 'react';
import { useDbConnect } from './use-db-connect';

export const CorrelationEstimation = () => {
  const { currentCorrEstimation, handleChangeCurrentCorrEstimation } = useDbConnect();

  return (
       <label>
         Оцените вероятность отношений:
         <select
            className="select-rating-correlation"
            value={currentCorrEstimation}
            onChange={(e) => handleChangeCurrentCorrEstimation(e)}
         >
           <option value="0">-</option>
           <option value="0.1">0.1</option>
           <option value="0.2">0.2</option>
           <option value="0.3">0.3</option>
           <option value="0.4">0.4</option>
           <option value="0.45">0.45</option>
           <option value="0.5">0.5</option>
           <option value="0.53">0.53</option>
           <option value="0.55">0.55</option>
           <option value="0.57">0.57</option>
           <option value="0.6">0.6</option>
           <option value="0.65">0.65</option>
           <option value="0.7">0.7</option>
           <option value="0.75">0.75</option>
           <option value="0.8">0.8</option>
           <option value="0.9">0.9</option>
         </select>
       </label>
  );
};