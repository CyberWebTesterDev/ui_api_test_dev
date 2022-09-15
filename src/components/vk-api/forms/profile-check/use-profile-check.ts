/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useApplicationContext } from '../../../application-container/app-context';
import { useSearchPanelActions } from '../../hooks/use-search-panel';
import { useVkApiContext } from '../../vk-api-context';
import { useApiVKService } from '../../../../service-api/service-api';
import { TProfileDBExtended, TProfileVK } from '../../vk-lib/vk-models';
import { useMatch } from 'react-router-dom';

export function useProfileCheck() {
  const [id, setId] = React.useState<string>('');
  const [pDb, setPDb] = React.useState<TProfileDBExtended | null>(null);
  const [pVK, setPVK] = React.useState<TProfileVK | null>(null);
  const { getProfileDBExtendedInfoById, getProfileInfoById } = useApiVKService();
  const { updateStateContext } = useApplicationContext();
  const { showLoader, hideLoader } = useSearchPanelActions();
  const context = useVkApiContext();
  const isMounted = React.useRef(false);
  const match = useMatch('profile-check/:id');

  const getProfileInDbData = async () => {
    if (id) {
      showLoader();
      const data = await getProfileDBExtendedInfoById(id);
      hideLoader();
      return data;
    }
    return null;
  };

  const getProfileInVKData = async () => {
    if (id) {
      showLoader();
      const data = await getProfileInfoById(id);
      hideLoader();
      return data;
    }
    return null;
  };

  const updateIdSearchParameter = (id: string) => {
    console.log('updateProfileInDbData id: ', id);
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
      console.log('useProfileCheck context by id update');
      getProfileInDbData().then(
        data => setPDb(data && data[0]),
      );
      getProfileInVKData().then(
        data => setPVK(data),
      );
    }, [id],
  );
  // для обновления глобального контекста-стейта
  React.useEffect(() => {
    console.log('useProfileCheck context update');
    updateStateContext({
      ...context,
      profileCheckForm: {
        ...context.profileCheckForm,
        idSearchParameter: id,
        profileInDb: pDb,
        profileVKData: pVK,
      },
    });
  }, [pDb, id, pVK]);
}