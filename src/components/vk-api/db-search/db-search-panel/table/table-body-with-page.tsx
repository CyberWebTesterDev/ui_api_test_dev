import * as React from 'react';
import { TProfileDBExtended } from '../../../vk-lib/vk-models';
import { useMatch } from 'react-router-dom';

type TTableBodyWithPageProps = {
  aggregatedByPagesProfilesFoundInDb: {[key: number]: TProfileDBExtended[];};
  currentPageNumber: number;
}

export const TableBodyWithPage = ({
  aggregatedByPagesProfilesFoundInDb,
  currentPageNumber,
}: TTableBodyWithPageProps,
) => {
  const numberOfPages = Object.keys(aggregatedByPagesProfilesFoundInDb).length;
  const tableBody = React.useMemo(
    () => {
      return aggregatedByPagesProfilesFoundInDb[currentPageNumber].map(
        (profile, idx) => {
          return profile && (
                 <tr
                    key={`tr-${idx}-${profile.id}`}
                    id={`${profile?.id}`}
                    className={''}
                 >
                   <td key={`td-${idx}-${profile.id}`} className={'td-id-cell'}>
                     {profile?.vk_id}
                     <a
                        key={`a-${idx}-${profile.id}`}
                        href={`https://vk.com/id${profile.vk_id}`}
                        target={'_blank'}
                        className={'id-link'}
                        type={'button'}
                        id={`${profile?.id}`}
                     >
                       Посмотреть в вк
                     </a>
                     <a
                        key={`a-${idx + 1}-${profile.id}`}
                        href={`http://192.168.1.236:3000/profile-check/${profile.vk_id}`}
                        target={'_blank'}
                        className={'id-link'}
                        type={'button'}
                        id={`${profile?.id}`}
                     >
                       Работать с профайлом
                     </a>
                   </td>
                   <td key={`td-${idx + 2}-${profile.id}`}>{profile?.first_name}</td>
                   <td key={`td-${idx + 3}-${profile.id}`}>{profile?.last_name}</td>
                   <td key={`td-${idx + 4}-${profile.id}`}>{profile?.birth_date}</td>
                   <td key={`td-${idx + 5}-${profile.id}`}>{profile?.estimation}</td>
                   <td key={`td-${idx + 6}-${profile.id}`}>{profile?.correlation_est}</td>
                   <td key={`td-${idx + 7}-${profile.id}`}>{profile?.creation_date as string}</td>
                   <td key={`td-${idx + 8}-${profile.id}`}>{profile?.update_time as string}</td>
                 </tr>
          );
        },
      );
    }, [aggregatedByPagesProfilesFoundInDb, currentPageNumber],
  );
  return <>{tableBody}</>;
};