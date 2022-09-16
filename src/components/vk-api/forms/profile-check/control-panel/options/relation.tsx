import { useDbConnect } from './use-db-connect';
import * as React from 'react';

export const Relation = () => {
  const { isRelated, handleChangeIsRelated } = useDbConnect();

  return (
     <label>
       Есть/была личная связь?:
       <select
          value={isRelated}
          onChange={(e) => handleChangeIsRelated(e)}
       >
         <option value=''>-</option>
         <option value="true">Да</option>
         <option value="false">Нет</option>
       </select>
     </label>
  );
};