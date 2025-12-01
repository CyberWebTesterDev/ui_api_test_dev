/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useApplicationContext } from '../../../application-container/app-context';
import { useVkApiContext } from '../../vk-api-context';
import { useMatch } from 'react-router-dom';
import { LOG_APP, useApiVKService } from '../../../../service-api';

export function useProfileCheck() {
  const [id, setId] = React.useState<string>('');
  const { getProfileDBExtendedInfoById, getProfileInfoById, getHistoryCommentsByProfileId } = useApiVKService();
  const { updateStateContext } = useApplicationContext();
  const context = useVkApiContext();
  const match = useMatch('profile-check/:id');

  const getAllData = async () => {
    const dataVk = await getProfileInfoById(id);
    const dataDb = await getProfileDBExtendedInfoById(id);
    const historyComments = await getHistoryCommentsByProfileId(id);

    return {
      dataVk,
      dataDb,
      historyComments,
    };
  };

  const updateIdSearchParameter = (id: string) => {
    LOG_APP('useProfileCheck updateIdSearchParameter id: ', id);
    setId(id);
  };

  React.useEffect(
    () => {
      if (match?.params.id) {
        updateIdSearchParameter(match.params.id);
      }
    }, [],
  );

  React.useEffect(
    () => {
      if (id) {
        getAllData().then(
          (data) => {
            LOG_APP('useProfileCheck getAllData', {
              data,
            });
            updateStateContext({
              ...context,
              profileCheckForm: {
                profileInDb: data?.dataDb,
                profileVKData: data.dataVk,
                idSearchParameter: id,
                historyComments: data.historyComments,
              },
            });
          },
        );
      }
    }, [id],
  );
}