import * as React from 'react';
import './search-panel.css';
import { useVkApiContext } from '../vk-api-context';
import { getMockedProfilesData } from './test-data/mocked-data';
import { useApiVKService } from '../../../service-api/service-api';
import { useSearchPanelActions, useSearchPanelInputs } from '../hooks/use-search-panel';
import { useApplicationContext } from '../../application-container/app-context';

export const SearchPanel = () => {
  const [testData, setTestData] = React.useState(); // временный state

  const {
    handleChangeName,
    handleChangeOffset,
    handleChangeQnt,
    handleChangeAge,
  } = useSearchPanelInputs();
  const context = useVkApiContext();
  const { getProfileInfoById } = useApiVKService();
  const { handleClickLoader, getProfiles } = useSearchPanelActions();

  const { inputsData: { offset, quantity, name, age } } = context;

  const handleGetAPIData = async () => {
    const data = await getProfileInfoById('18076655');
    setTestData(data);
  };

  return (
     <div className={'vk-search-form'}>
       <span> Имя: </span> <input onChange={(e) => handleChangeName(e)} value={name}/>
       <span> Offset: </span> <input onChange={(e) => handleChangeOffset(e)} value={offset}/>
       <span> Количество: </span> <input onChange={(e) => handleChangeQnt(e)} value={quantity}/>
       <span> Возраст: </span> <input onChange={(e) => handleChangeAge(e)} value={age}/>
       <button onClick={() => getProfiles()}>Тест данных</button>
       <button onClick={() => handleClickLoader()}>Loader</button>
       <button onClick={() => handleGetAPIData()}>Test api</button>
       {name && (<span> Введено имя: {name}</span>)}
       {offset && (<span> Введен offset: {offset}</span>)}
       {quantity && (<span> Введено quantity: {quantity}</span>)}
       {age && (<span> Введен возраст: {age}</span>)}
       <pre>{JSON.stringify(testData)}</pre>
     </div>
  );
};