import * as React from 'react';
import { useDbConnect } from './use-db-connect';

export const ChildEstimationProbability = () => {
  const { hasChild, handleChangeHasChild } = useDbConnect();

  return (
     <label>
       Есть ли ребёнок/дети?:
       <select
          value={hasChild}
          onChange={(e) => handleChangeHasChild(e)}
       >
         <option value=''>-</option>
         <option value="true">Да</option>
         <option value="false">Нет</option>
       </select>
     </label>
  );
};