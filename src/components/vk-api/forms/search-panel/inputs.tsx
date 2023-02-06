import * as React from 'react';
import { useSearchPanelInputs } from '../../hooks/use-search-panel';
import { useVkApiContext } from '../../vk-api-context';

export const Inputs = () => {
  const {
    inputsData: { name, ageFrom, ageTo, offset, quantity },
    selectorsData: { year },
  } = useVkApiContext();

  const {
    handleChangeName,
    handleChangeOffset,
    handleChangeQnt,
    handleChangeAgeFrom,
    handleChangeAgeTo,
  } = useSearchPanelInputs();

  const isDisabledAge = year !== 'null';

  return (
     <>
       <span> Имя: </span> <input onChange={(e) => handleChangeName(e)} value={name}/>
       <span> Offset: </span> <input onChange={(e) => handleChangeOffset(e)} value={offset}/>
       <span> Количество: </span> <input onChange={(e) => handleChangeQnt(e)} value={quantity}/>
       <span> Возраст от: </span> <input onChange={(e) => handleChangeAgeFrom(e)} value={ageFrom} disabled={isDisabledAge}/>
       <span> Возраст до: </span> <input onChange={(e) => handleChangeAgeTo(e)} value={ageTo} disabled={isDisabledAge}/>
       {name && (<span> Введено имя: {name}</span>)}
       {offset && (<span> Введен offset: {offset}</span>)}
       {quantity && (<span> Введено quantity: {quantity}</span>)}
       {(ageFrom || ageTo) && (<span> Введен возраст от/до: {ageFrom + ' / ' + ageTo}</span>)}
     </>
  );
};