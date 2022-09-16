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
  const [hasChild, setHasChild] = React.useState<string | undefined>('');
  const [isInRelationShip, setIsInRelationShip] = React.useState<string | undefined>('');
  const [isRelated, setIsRelated] = React.useState<string | undefined>('');
  const [isFavorite, setIsFavorite] = React.useState<string | undefined>('');
  const [profileDB, setProfileDB] = React.useState<TProfileDBExtended | null>(null);
  const [profileId, setProfileId] = React.useState<string | undefined>('');
  const {
    estimateProfileById,
    getProfileDBExtendedInfoById,
    corrEstimateProfileById,
    updateBirthYear,
    enrichProfileInDb,
    insertUpdateCheckSingleProfile,
    updateHasChild,
    updateRelationship,
    updateRelation,
    updateIsFavorite,
  } = useApiVKService();
  const { setShowMessagePopUp, setShowErrorPopUp } = usePopups();

  const handleChangeCurrentEstimation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentEstimation(e.target.value);
  };

  const handleChangeCurrentCorrEstimation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCorrEstimation(e.target.value);
  };

  const handleChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };

  const handleChangeHasChild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasChild(e.target.value);
  };

  const handleChangeIsInRelationShip = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsInRelationShip(e.target.value);
  };

  const handleChangeIsRelated = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsRelated(e.target.value);
  };

  const handleAddFavorite = () => {
    setIsFavorite('true');
  };

  const handleDeleteFavorite = () => {
    setIsFavorite('false');
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
    if (idSearchParameter) {
      const profile = await getProfileDBExtendedInfoById(idSearchParameter);
      setProfileDB(profile);
    }
  };

  React.useEffect(
    () => {
      if (idSearchParameter) {
        setProfileId(idSearchParameter);
      }
    }, [idSearchParameter],
  );

  React.useEffect(
    () => {
      if (profileId) {
        updateStateContext({
          ...context,
          profileCheckForm: {
            ...context.profileCheckForm,
            profileInDb: profileDB,
          },
        });
      }
    }, [profileDB],
  );

  React.useEffect(
    () => {
      if (currentEstimation && profileId) {
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
      if (currentCorrEstimation && profileId) {
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
      if (birthYear && profileId) {
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

  React.useEffect(
    () => {
      if (hasChild && profileId) {
        updateHasChild(hasChild, profileId)
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
    }, [hasChild],
  );

  React.useEffect(
    () => {
      if (isRelated && profileId) {
        updateRelation(isRelated, profileId)
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
    }, [isRelated],
  );

  React.useEffect(
    () => {
      if (isInRelationShip && profileId) {
        updateRelationship(isInRelationShip, profileId)
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
    }, [isInRelationShip],
  );

  React.useEffect(
    () => {
      if (isFavorite && profileId) {
        updateIsFavorite(isFavorite, profileId)
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
    }, [isFavorite],
  );

  return {
    handleChangeCurrentEstimation,
    currentEstimation,
    handleChangeCurrentCorrEstimation,
    currentCorrEstimation,
    handleChangeBirthYear,
    birthYear,
    handleInsertUpdateDB,
    handleChangeHasChild,
    hasChild,
    isRelated,
    isFavorite,
    isInRelationShip,
    handleChangeIsRelated,
    handleChangeIsInRelationShip,
    handleAddFavorite,
    handleDeleteFavorite,
  };
}