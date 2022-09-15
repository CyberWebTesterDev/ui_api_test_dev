/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useVkApiContext } from '../../../../vk-api-context';
import { useApiVKService } from '../../../../../../service-api/service-api';
import { usePopups } from '../../../../../pop-ups/popups-hooks';
import { POPUP_MESSAGES } from '../../../../../pop-ups/popup-contants';
import { useApplicationContext } from '../../../../../application-container/app-context';
import { TProfileDBExtended } from '../../../../vk-lib/vk-models';
import { gerPreparedProfileToUpdateInDb } from '../utils/db-connect-utils';

export function useDbConnect () {
  const context = useVkApiContext();
  const { updateStateContext } = useApplicationContext();
  const { profileCheckForm: { idSearchParameter, profileVKData } } = context;
  const [currentEstimation, setCurrentEstimation] = React.useState<string>('');
  const [currentCorrEstimation, setCurrentCorrEstimation] = React.useState<string>('');
  const [birthYear, setBirthYear] = React.useState<string>('');
  const [profileDB, setProfileDB] = React.useState<TProfileDBExtended | null>(null);
  const {
    estimateProfileById,
    getProfileDBExtendedInfoById,
    corrEstimateProfileById,
    updateBirthYear,
    enrichProfileInDb,
    insertUpdateCheckSingleProfile,
  } = useApiVKService();
  const { setShowMessagePopUp, setShowErrorPopUp } = usePopups();
  const profileId = idSearchParameter ?? '';

  const handleChangeCurrentEstimation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentEstimation(e.target.value);
  };

  const handleChangeCurrentCorrEstimation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCorrEstimation(e.target.value);
  };

  const handleChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };

  const handleInsertUpdateDB = async () => {
    if (profileVKData) {
      const mappedProfile = gerPreparedProfileToUpdateInDb(profileVKData);
      if (mappedProfile) {
        const result = await enrichProfileInDb(mappedProfile);
        if (result.isSuccess) {
          const profileCheck = await insertUpdateCheckSingleProfile(
            profileVKData.id.toString(),
            profileVKData.first_name,
            profileVKData.last_name,
          );
          if (profileCheck.isSuccess) {
            await synchronizeUIData();
            setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_ENRICH);
          } else {
            setShowErrorPopUp(POPUP_MESSAGES.ERROR_ENRICH);
          }
        } else {
          setShowErrorPopUp(POPUP_MESSAGES.ERROR_ENRICH);
        }
      }
    }
  };

  const synchronizeUIData = async () => {
    const [profile] = await getProfileDBExtendedInfoById(profileId);
    setProfileDB(profile);
  };

  React.useEffect(
    () => {
      updateStateContext({
        ...context,
        profileCheckForm: {
          ...context.profileCheckForm,
          profileInDb: profileDB,
        },
      });
    }, [profileDB],
  );

  React.useEffect(
    () => {
      if (currentEstimation) {
        estimateProfileById(currentEstimation, profileId)
          .then(
            data => {
              console.log('useDbConnect response from server: ', {
                data,
              });
              if (data.isSuccess) {
                synchronizeUIData().catch();
                setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_UPDATE);
              } else {
                setShowErrorPopUp(POPUP_MESSAGES.ERROR_UPDATE);
              }
            },
          )
          .catch();
      }
    }, [currentEstimation],
  );

  React.useEffect(
    () => {
      if (currentCorrEstimation) {
        corrEstimateProfileById(currentCorrEstimation, profileId)
          .then(
            data => {
              console.log('useDbConnect response from server: ', {
                data,
              });
              if (data.isSuccess) {
                synchronizeUIData().catch();
                setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_UPDATE);
              } else {
                setShowErrorPopUp(POPUP_MESSAGES.ERROR_UPDATE);
              }
            },
          )
          .catch();
      }
    }, [currentCorrEstimation],
  );

  React.useEffect(
    () => {
      if (birthYear) {
        updateBirthYear(birthYear, profileId)
          .then(
            data => {
              console.log('useDbConnect response from server: ', {
                data,
              });
              if (data.isSuccess) {
                synchronizeUIData().catch();
                setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_UPDATE);
              } else {
                setShowErrorPopUp(POPUP_MESSAGES.ERROR_UPDATE);
              }
            },
          )
          .catch();
      }
    }, [birthYear],
  );

  return {
    handleChangeCurrentEstimation,
    currentEstimation,
    handleChangeCurrentCorrEstimation,
    currentCorrEstimation,
    handleChangeBirthYear,
    birthYear,
    handleInsertUpdateDB,
  };
}