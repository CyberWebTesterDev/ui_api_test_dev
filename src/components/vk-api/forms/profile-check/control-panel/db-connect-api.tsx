import * as React from 'react';
import { useVkApiContext } from '../../../vk-api-context';
import { useDbConnect } from './options/use-db-connect';

export const DbConnectApi = () => {
  const { profileCheckForm: { profileInDb } } = useVkApiContext();
  const { handleInsertUpdateDB } = useDbConnect();
  const hasProfileInDb = !!profileInDb;
  const hasProfileInCheckTable = Boolean(hasProfileInDb && profileInDb?.first_checked);
  const text = hasProfileInCheckTable ? 'Перезаписать' : 'Записать';
  const hasChildBlock = React.useMemo(
    () => {
      if (typeof profileInDb?.has_child !== 'undefined' && profileInDb.has_child !== null) {
        const labelText = profileInDb.has_child ? 'Да' : 'Нет';
        return <span className={'label-span-field'}>Наличие ребёнка:
          <span className={'data-span'}>{labelText}</span>
        </span>;
      }
      return <span className={'no-data-span'}>Нет данных о наличии ребёнка</span>;
    }, [profileInDb],
  );
  const isInRelationshipBlock = React.useMemo(
    () => {
      if (typeof profileInDb?.is_in_relationship !== 'undefined' && profileInDb.is_in_relationship !== null) {
        const labelText = profileInDb.is_in_relationship ? 'Да' : 'Нет';
        return <span className={'label-span-field'}>В отношениях?:
          <span className={'data-span'}>{labelText}</span>
        </span>;
      }
      return <span className={'no-data-span'}>Нет данных об отношениях</span>;
    }, [profileInDb],
  );
  const isRelatedBlock = React.useMemo(
    () => {
      if (typeof profileInDb?.is_related !== 'undefined' && profileInDb.is_related !== null) {
        const labelText = profileInDb.is_related ? 'Да' : 'Нет';
        return <span className={'label-span-field'}>Была ли связь в жизни/знакомство?:
          <span className={'data-span'}>{labelText}</span>
        </span>;
      }
      return <span className={'no-data-span'}>Нет данных о связи</span>;
    }, [profileInDb],
  );

  return (
     <div className={'db-buttons-block'}>
       {!hasProfileInDb && (<button onClick={() => handleInsertUpdateDB()}>{text} в БД </button>)}
       {hasProfileInDb && !profileInDb?.first_checked && (<button>Записать в БД проверок </button>)}
       <div className={'data-table'}>
         {profileInDb?.estimation && <span className={'label-span-field'}>Профайл оценён на
           <span className={'data-span'}>{profileInDb.estimation}</span>
         </span>}
         {profileInDb?.correlation_est && <span className={'label-span-field'}>Вероятность отношений
           <span className={'data-span'}>{profileInDb.correlation_est}</span>
         </span>}
         {hasChildBlock}
         {isInRelationshipBlock}
         {isRelatedBlock}
       </div>
     </div>
  );
};