import * as React from 'react';
import { TProfile, VK_NAMES_BY_KEY_MAP } from '../vk-lib/vk-models';
import './table.css';
import { useVkApiContext } from '../vk-api-context';

export const VkProfilesTable = () => {
  const [selectedTdId, setSelectedTdId] = React.useState('');
  const { profilesFound } = useVkApiContext();

  const handleSelectedTd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = e.target as HTMLButtonElement;
    setSelectedTdId(event.value);
  };

  if (profilesFound?.length === 0 || !profilesFound) {
    return null;
  }
  const tableHead = Object.keys(VK_NAMES_BY_KEY_MAP).map(
    (key) => {
      return (
         <th>{key}</th>
      );
    },
  );
  const tableBody = profilesFound.map(
    (profile) => {
      return (
         <tr
            id={`${profile.id}`}
            className={selectedTdId === profile.id.toString() ? 'selected-tr' : ''}
         >
           <td>
             {profile.id}
             <button value={`${profile.id}`} onClick={(e) => handleSelectedTd(e)}>Посмотреть в вк</button>
             <button value={`${profile.id}`} onClick={(e) => handleSelectedTd(e)}>Работать с профайлом</button>
           </td>
           <td>{profile.first_name}</td>
           <td>{profile.last_name}</td>
           <td>{profile.sex}</td>
           <td>{profile.bdate}</td>
         </tr>
      );
    },
  );
  return (
     <table className={'table-vk-matches'}>
       <caption>Результаты поиска</caption>
       <thead>
         <tr>
          {tableHead}
         </tr>
       </thead>
       <tbody>
        {tableBody}
       </tbody>
     </table>
  );
};