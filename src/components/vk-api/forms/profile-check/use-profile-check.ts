import * as React from 'react';
import { useApplicationContext } from '../../../application-container/app-context';
import { useMatch } from 'react-router-dom';
import { LOG_APP, useApiVKService } from '../../../../service-api';

export function useProfileCheck() {
  const {
    getProfileDBExtendedInfoById,
    getProfileInfoById,
    getHistoryCommentsByProfileId,
  } = useApiVKService();

  const { updateStateContext } = useApplicationContext();
  const match = useMatch('profile-check/:id');

  // id берём прямо из маршрута
  const id = match?.params.id ?? '';

  React.useEffect(() => {
    if (!id) {
      return null;
    } // если id нет — ничего не делаем

    LOG_APP('useProfileCheck start for id', { id });

    let cancelled = false;

    const run = async () => {
      try {
        // Параллельные запросы
        const [dataVk, dataDb, historyComments] = await Promise.all([
          getProfileInfoById(id),
          getProfileDBExtendedInfoById(id),
          getHistoryCommentsByProfileId(id),
        ]);

        if (cancelled) {
          return;
        }

        LOG_APP('useProfileCheck getAllData', {
          id,
          dataVk,
          dataDb,
          historyComments,
        });

        updateStateContext(prev => ({
          ...prev,
          profileCheckForm: {
            ...prev.profileCheckForm,
            profileInDb: dataDb,
            profileVKData: dataVk,
            idSearchParameter: id,
            historyComments,
          },
        }));
      }
      catch (error) {
        if (cancelled) {
          return;
        }

        LOG_APP('useProfileCheck error', { id, error });
      }
    };

    run();

    // cleanup для эффекта
    return () => {
      cancelled = true;
    };
  }, [
    id,
    getProfileInfoById,
    getProfileDBExtendedInfoById,
    getHistoryCommentsByProfileId,
    updateStateContext,
  ]);
}
