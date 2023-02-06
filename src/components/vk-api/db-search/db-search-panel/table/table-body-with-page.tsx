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
  console.log('TableBodyWithPage', {
    aggregatedByPagesProfilesFoundInDb,
  });
  const getClassNameByCorrelationEstimationValue = React.useCallback(
    (value: number) => {
      switch (value) {
        case 0.65:
        case 0.62:
        case 0.6:
          return 'high';
        case 0.57:
          return 'medium-high';
        case 0.55:
          return 'medium-pre-high';
        case 0.5:
          return '';
        default:
          return '';
      }
    }, [],
  );
  const tableBody = React.useMemo(
    () => {
      if (currentPageNumber) {
        return aggregatedByPagesProfilesFoundInDb[currentPageNumber].map(
          (profile, idx) => {
            return profile && (
                <tr
                   key={`tr-${idx}-${profile.id}`}
                   id={`${profile?.id}`}
                   className={getClassNameByCorrelationEstimationValue(profile.correlation_est)}
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
      }
      return <div>..................................................</div>;
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [aggregatedByPagesProfilesFoundInDb, currentPageNumber],
  );
  return <>{tableBody}</>;
};