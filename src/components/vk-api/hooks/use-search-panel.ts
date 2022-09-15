/* eslint-disable react-hooks/exhaustive-deps */
import { TContext, useVkApiContext } from '../vk-api-context';
import { useApplicationContext } from '../../application-container/app-context';
import * as React from 'react';
import { useServiceContext } from '../../../service-api/service-context';
import { TProfileCheckDB, TProfileVK } from '../vk-lib/vk-models';
import { useApiVKService } from '../../../service-api/service-api';
import { usePopups } from '../../pop-ups/popups-hooks';
import { POPUP_MESSAGES } from '../../pop-ups/popup-contants';
import { countNonNullElementsInArray, getProfileIdsFromVkData } from '../utils/vk-data-utild';

export function useSearchPanelInputs() {
  const [foundProfiles, setFoundProfiles] = React.useState<(TProfileVK | null)[]>();
  const [intersections, setIntersections] = React.useState<(TProfileCheckDB | undefined)[] | undefined>();
  const context = useVkApiContext();
  const { setShowMessagePopUp, setShowErrorPopUp } = usePopups();
  const { showLoader, hideLoader } = useSearchPanelActions();
  const { getMatchedProfilesVKByQuery, getProfileInfoInDbChecksByIds } = useApiVKService();
  const { updateStateContext } = useApplicationContext();
  const {
    inputsData: { offset, quantity, name, ageFrom, ageTo },
    selectorsData: { city, day, month, year },
  } = context;

  const validateInputData = () => {
    if (city === '0') {
      setShowErrorPopUp('Выберите город!');
      return false;
    }
    return true;
  };

  const testGetProfilesCheckDBByIds = () => {
    if (foundProfiles) {
      const ids = getProfileIdsFromVkData(foundProfiles);
      if (ids) {
        getProfileInfoInDbChecksByIds(ids).then(
          (data) => {
            console.log('testGetProfilesCheckDBByIds', {
              data,
            });
            setIntersections(data);
          },
        );
      }
    }
  };

  React.useEffect(
    () => {
      if (foundProfiles) {
        updateStateContext({
          ...context,
          profilesFound: foundProfiles,
        });
      }
    }, [foundProfiles],
  );

  React.useEffect(
    () => {
      updateStateContext({
        ...context,
        profilesIntersections: intersections,
      });
    }, [intersections],
  );

  const getAges = () => {
    if (year) {
      return {
        ageFrom: '0',
        ageTo: '0',
      };
    }
    return {
      ageFrom: ageFrom ? ageFrom : '23',
      ageTo: ageTo ? ageTo : '35',
    };
  };

  const getPreparedToSearchMatchesData = () => ({
    name: name ? name : 'null',
    quantity: quantity ? quantity : '0',
    offset: offset ? offset : '0',
    ...getAges(),
    city: city === '0' ? 'null' : city,
    year,
    month,
    day,
  });

  const handleSearchMatchedProfiles = () => {
    if (validateInputData()) {
      const request = getPreparedToSearchMatchesData();
      showLoader();
      getMatchedProfilesVKByQuery(
        request.name,
        request.quantity,
        request.offset,
        request.ageFrom,
        request.ageTo,
        request.city,
        request.year,
        request.month,
        request.day,
      ).then(
        (data) => {
          setFoundProfiles(data);
          hideLoader();
          setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_LOAD_DATA);
        },
      ).catch(e => { hideLoader(); setShowErrorPopUp(POPUP_MESSAGES.ERROR_LOAD_DATA); console.error(e); });
    }
  };

  const getRefsValues = (): TContext['inputsData'] => ({
    name: name ?? '',
    quantity: quantity ?? '',
    offset: offset ?? '',
    ageFrom: ageFrom ?? '',
    ageTo: ageTo ?? '',
  });

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        name: event.target.value,
      },
    });
  };

  const handleChangeOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        offset: event.target.value,
      },
    });
  };

  const handleChangeQnt = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        quantity: event.target.value,
      },
    });
  };

  const handleChangeAgeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        ageFrom: event.target.value,
      },
    });
  };

  const handleChangeAgeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateContext({
      ...context,
      inputsData: {
        ...context.inputsData,
        ageTo: event.target.value,
      },
    });
  };

  const handleOnChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.id === 'city') {
      updateStateContext({
        ...context,
        selectorsData: {
          ...context.selectorsData,
          city: event.target.value,
        },
      });
    }
    if (event.target.id === 'year') {
      updateStateContext({
        ...context,
        selectorsData: {
          ...context.selectorsData,
          year: event.target.value,
        },
      });
    }
    if (event.target.id === 'month') {
      updateStateContext({
        ...context,
        selectorsData: {
          ...context.selectorsData,
          month: event.target.value,
        },
      });
    }
    if (event.target.id === 'day') {
      updateStateContext({
        ...context,
        selectorsData: {
          ...context.selectorsData,
          day: event.target.value,
        },
      });
    }
  };

  return {
    getRefsValues,
    handleChangeName,
    handleChangeOffset,
    handleChangeQnt,
    handleChangeAgeFrom,
    handleChangeAgeTo,
    handleOnChangeSelect,
    handleSearchMatchedProfiles,
    testGetProfilesCheckDBByIds,
  };
}

export function useSearchPanelActions() {
  const context = useServiceContext();

  const showHideLoader = () => {
    context.updateServiceStateContext({
      ...context,
      loader: {
        isLoading: !context.loader.isLoading,
      },
    });
  };

  const showLoader = () => {
    context.updateServiceStateContext({
      ...context,
      loader: {
        isLoading: true,
      },
    });
  };

  const hideLoader = () => {
    context.updateServiceStateContext({
      ...context,
      loader: {
        isLoading: false,
      },
    });
  };

  // const getMockedProfiles = () => {
  //   updateStateContext({
  //     ...context,
  //     profilesFound: getMockedProfilesData(),
  //   });
  // };

  return { showLoader, hideLoader, showHideLoader };
}