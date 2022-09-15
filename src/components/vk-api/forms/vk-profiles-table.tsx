/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { VK_NAMES_BY_KEY_MAP, TProfileVK, TProfileCheckDB } from '../vk-lib/vk-models';
import './table.css';
import { useVkApiContext } from '../vk-api-context';
import { countNonNullElementsInArray } from '../utils/vk-data-utild';
import { Intersection } from './intersection';

type TVkProfilesTable = {
  profilesFound: (TProfileVK | null)[] | undefined;
}

export const VkProfilesTable = ({
  profilesFound,
}: TVkProfilesTable) => {
  const [selectedTdId, setSelectedTdId] = React.useState('');

  const handleSelectedTd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const event = e.target as HTMLAnchorElement;
    setSelectedTdId(event.id);
  };

  if (profilesFound?.length === 0 || !profilesFound) {
    return null;
  }
  const tableHead = Object.keys(VK_NAMES_BY_KEY_MAP).map(
    (key, idx) => {
      return (
         <th key={key + '_' + idx}>{key}</th>
      );
    },
  );
  tableHead.push(<th key={'th_checked'}>Уже проверен?</th>);
  const tableBody = profilesFound.map(
    (profile, idx) => {

      return profile && (
         <tr
            key={`tr-${idx}-${profile.id}`}
            id={`${profile?.id}`}
            className={selectedTdId === profile?.id.toString() ? 'selected-tr' : ''}
         >
           <td key={`td-${idx}-${profile.id}`}>
             {profile?.id}
             <a
                key={`a-${idx}-${profile.id}`}
                href={`https://vk.com/id${profile.id}`}
                target={'_blank'}
                className={'id-link'}
                type={'button'}
                id={`${profile?.id}`}
                onClick={(e) => handleSelectedTd(e)}
             >
               Посмотреть в вк
             </a>
             <a
                key={`a-${idx + 1}-${profile.id}`}
                href={`http://192.168.1.236:3000/profile-check/${profile.id}`}
                target={'_blank'}
                className={'id-link'}
                type={'button'}
                id={`${profile?.id}`}
                onClick={(e) => handleSelectedTd(e)}
             >
               Работать с профайлом
             </a>
           </td>
           <td key={`td-${idx + 2}-${profile.id}`}>{profile?.first_name}</td>
           <td key={`td-${idx + 3}-${profile.id}`}>{profile?.last_name}</td>
           <td key={`td-${idx + 4}-${profile.id}`}>{profile?.bdate}</td>
           <Intersection profile={profile} />
         </tr>
      );
    },
  );
  const countMatches = countNonNullElementsInArray(profilesFound);
  const hasMatches = countMatches > 0;

  return (
     <table className={'table-vk-matches'}>
       <caption style={{ marginBottom: '10px' }}>
         {hasMatches ? 'Найдено ' + countMatches + ' подходящих' : 'Подходящих не' + ' найдено' }
       </caption>
       <thead>
         <tr key={'table-head-row'}>
          {tableHead}
         </tr>
       </thead>
       <tbody>
        {tableBody}
       </tbody>
     </table>
  );
};