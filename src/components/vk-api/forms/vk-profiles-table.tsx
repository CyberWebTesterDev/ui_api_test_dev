import * as React from 'react';
import { VK_NAMES_BY_KEY_MAP, TProfileVK } from '../vk-lib/vk-models';
import './table.css';
import { countNonNullElementsInArray } from '../utils/data-utils';
import { Intersection } from './intersection';
import { BaseLinkProfile } from './components/base-link';

type TVkProfilesTable = {
  profilesFound: (TProfileVK | null)[] | undefined;
}

export const VkProfilesTable = ({ profilesFound }: TVkProfilesTable) => {
  const [selectedTdId, setSelectedTdId] = React.useState('');

  const handleSelectedTd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelectedTdId(e.currentTarget.id);
  };

  const getClassNameById = (id: string) => {
    return selectedTdId === id ? 'selected-tr' : '';
  };

  if (!profilesFound || profilesFound.length === 0) {
    return null;
  }

  const tableHead = [
    ...Object.keys(VK_NAMES_BY_KEY_MAP).map((key) => (
       <th key={key}>
         {VK_NAMES_BY_KEY_MAP[key as keyof typeof VK_NAMES_BY_KEY_MAP]}
       </th>
    )),
    <th key="th_checked">Уже проверен?</th>,
  ];

  tableHead.push(<th key={'th_checked'}>Уже проверен?</th>);

  const tableBody = profilesFound
    .filter((profile): profile is TProfileVK => profile !== null)
    .map((profile, idx) => (
         <tr
            key={`tr-${idx}-${profile.id}`}
            id={`${profile.id}`}
            className={getClassNameById(String(profile.id))}
         >
           <td key={`td-${idx}-${profile.id}`}>
             {profile?.id}
             <BaseLinkProfile
                index={String(idx)}
                profileId={String(profile.id)}
                handleSelectedTd={handleSelectedTd}
                textContent='Посмотреть в вк'
                isVK
             />
             <BaseLinkProfile
                index={String(idx + 1)}
                profileId={String(profile.id)}
                handleSelectedTd={handleSelectedTd}
                textContent='Работать с профайлом'
             />
           </td>
           <td>{profile?.first_name}</td>
           <td>{profile?.last_name}</td>
           <td>{profile?.bdate}</td>
           <Intersection profile={profile} />
         </tr>
    ),
    );

  const countMatches = countNonNullElementsInArray(profilesFound);
  const hasMatches = countMatches > 0;

  return (
     <table className={'table-vk-matches'}>
       <caption style={{ marginBottom: '10px' }}>
         {hasMatches
           ? `Найдено ${countMatches} подходящих`
           : 'Подходящих не найдено'}
       </caption>
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