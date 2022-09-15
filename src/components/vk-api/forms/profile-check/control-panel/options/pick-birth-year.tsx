import * as React from 'react';
import { useDbConnect } from './use-db-connect';

export const PickBirthYear = () => {
  const { birthYear, handleChangeBirthYear } = useDbConnect();

  return (
       <label>
         Укажите год рождения:
         <select
            value={birthYear}
            onChange={(e) => handleChangeBirthYear(e)}
         >
           <option value="">-</option>
           <option value="1985">1985</option>
           <option value="1986">1986</option>
           <option value="1987">1987</option>
           <option value="1988">1988</option>
           <option value="1989">1989</option>
           <option value="1990">1990</option>
           <option value="1991">1991</option>
           <option value="1992">1992</option>
           <option value="1993">1993</option>
           <option value="1994">1994</option>
           <option value="1995">1995</option>
           <option value="1996">1996</option>
           <option value="1997">1997</option>
           <option value="1998">1998</option>
           <option value="1999">1999</option>
           <option value="2000">2000</option>
           <option value="2001">2001</option>
           <option value="2002">2002</option>
         </select>
       </label>
  );
};