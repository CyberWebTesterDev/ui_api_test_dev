import * as React from 'react';
import { useDbConnect } from './use-db-connect';

export const Relationship = () => {
  const { isInRelationShip, handleChangeIsInRelationShip } = useDbConnect();

  return (
     <label>
       Состоит в отношениях?:
       <select
          value={isInRelationShip}
          onChange={(e) => handleChangeIsInRelationShip(e)}
       >
         <option value=''>-</option>
         <option value="true">Да</option>
         <option value="false">Нет</option>
       </select>
     </label>
  );
};