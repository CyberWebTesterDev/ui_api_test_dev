import { getMockedProfilesData } from '../components/vk-api/forms/test-data/mocked-data';
import { formatDate, getParsedJsonArray } from './service-utils';
import {
  TComment, THistoryComment,
  TInsertUpdateDBProfile,
  TProfileCheckDB,
  TProfileDB,
  TProfileDBExtended,
  TProfileVK,
  TServerUpdateCommand, TServerUpdateCommandE,
  TServerUpdateCommandSuccess,
  TServerUpdateReturnCode,
  TServerUpdateReturnCodePromise,
} from '../components/vk-api/vk-lib/vk-models';
import { countNonNullElementsInArray } from '../components/vk-api/utils/vk-data-utild';

const API_CONSTANTS = {
  URI_BASE: 'http://192.168.1.236:8333/',
  GET_PROFILE_INFO_ID: 'vkget/',
  DB_MG: 'dbmanager/',
  SEARCH_IN_DB_ID: 'searchsingleprofiledb/',
  SEARCH_IN_DB_EXT: 'selectprofiledataextended/',
  SEARCH_IN_CHECK_DB_ID: 'searchcheckedprofile/',
  MATCH_PROFILES_SEARCH: 'matchfromsearch/',
  ESTIMATE_PROFILE_ID: 'updestim/',
  CORR_ESTIMATE_PROFILE_ID: 'updcorrelationest/',
  UPDATE_BIRTH_YEAR: 'updbirthyear/',
  ENRICH_PROFILE_DB: 'insertupdprofile/',
  INSERT_UPD_SINGLE_PROFILE: 'insertchecksingle/',
  GET_MATCHES: 'matchfromsearch/',
  GET_POST_VK_ID: 'getpostvkid/',
  GET_HISTORY_COMMENTS_VK_ID: 'getcommentsvkid/',
  UPDATE_COMMENT_VK_ID: 'insertupdatepostvkid',
  UPDATE_CHILD: 'upd/haschild/',
  UPDATE_RELATIONSHIP: 'upd/isinrelationship/',
  UPDATE_FAVORITE: 'updfavor/',
  UPDATE_RELATION: 'updrelated/',
};

export function useApiVKService () {

  const waitTimeout = (ms: number = 300) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const getMatchedProfilesVKByQuery = async (
    name: string,
    quantity: string,
    offset: string,
    ageFrom: string,
    ageTo: string,
    city: string | null,
    year: string,
    month: string,
    day: string,
  ): Promise<TProfileVK[]> => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.MATCH_PROFILES_SEARCH}`
       + encodeURIComponent(name) + `/${quantity}/${offset}/${ageFrom}/${ageTo}/${city}/${year}/${month}/${day}`;

    console.log('getMatchedProfilesVKByQuery url', {
      url,
    });

    try {
      const response = await fetch(url);
      const data: TProfileVK[] = await response.json();
      console.log('getMatchedProfilesVKByQuery data', {
        data,
      });
      return data;
    } catch (e) {
      throw e;
    }
  };

  const getProfileInfoInDbChecksByIds = async (profileIds: string[]):
  Promise<(TProfileCheckDB | undefined)[] | undefined> => {
    console.log('getProfileInfoInDbChecksByIds profileIds', {
      profileIds,
    });
    if (profileIds.length > 0) {
      let profilesData: (TProfileCheckDB | undefined)[] = [];
      const promiseGetInfoDBById = async (id: string) => {
        const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.SEARCH_IN_CHECK_DB_ID}${id}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const parsedData = getParsedJsonArray(data) as TProfileCheckDB[];
          formatDate(parsedData);
          return parsedData[0];
        } catch (e) {
          throw e;
        }
      };

      const getDataInLoop = async () => {
        for (let i = 0; i < profileIds.length; i ++) {
          const data = await promiseGetInfoDBById(profileIds[i]);
          profilesData.push(data);
        }
      };

      const getCheckedData = async (counter?: number) => {
        let cnt = counter ? counter : 0;
        if (cnt === 1) {
          return profilesData;
        }
        if (cnt === 0) {
          await getDataInLoop();
          console.log('getCheckedData', {
            counter: countNonNullElementsInArray(profilesData),
            profilesData,
            cnt,
          });
          if (countNonNullElementsInArray(profilesData) === 0 || !profilesData) {
            await waitTimeout(5000);
            await getDataInLoop();
            await getCheckedData(cnt++);
          } else {
            return profilesData;
          }
        }
        return profilesData;
      };

      return await getCheckedData();
    }
    return;
  };

  const getProfileInfoById = async (profileId: string) => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.GET_PROFILE_INFO_ID}${profileId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('getProfileInfoById VK received data');
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const getCommentByProfileId = async (profileId: string) => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.GET_POST_VK_ID}${profileId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('getCommentByProfileId VK received data');
      console.log(data);
      const parsedData = getParsedJsonArray(data) as TComment[];
      formatDate(parsedData);
      return parsedData[0];
    } catch (e) {
      throw e;
    }
  };
  const getHistoryCommentsByProfileId = async (profileId: string) => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.GET_HISTORY_COMMENTS_VK_ID}${profileId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('getCommentByProfileId VK received data');
      console.log(data);
      const parsedData = getParsedJsonArray(data) as THistoryComment[];
      formatDate(parsedData);
      return parsedData;
    } catch (e) {
      throw e;
    }
  };

  const getProfileDBInfoById = async (profileId: string) => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.SEARCH_IN_DB_ID}${profileId}`;
    try {
      const response = await fetch(url);
      const data: string[] = await response.json();
      console.log('getProfileDBInfoById received data');
      console.log(getParsedJsonArray(data));
      const parsedData = getParsedJsonArray(data) as TProfileDB[];
      formatDate(parsedData);
      return parsedData;
    } catch (e) {
      throw e;
    }
  };

  const getProfileDBExtendedInfoById = async (profileId: string): Promise<TProfileDBExtended> => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.SEARCH_IN_DB_EXT}${profileId}`;
    try {
      const response = await fetch(url);
      const data: string[] = await response.json();
      console.log('getProfileDBInfoById received data');
      console.log(getParsedJsonArray(data));
      const parsedData = getParsedJsonArray(data) as TProfileDBExtended[];
      formatDate(parsedData);
      return parsedData[0];
    } catch (e) {
      throw e;
    }
  };

  const enrichProfileInDb = async (profileToUpdIns: TInsertUpdateDBProfile): Promise<TServerUpdateReturnCodePromise> => {
    console.log('enrichProfileInDb', {
      profileToUpdIns,
    });
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.ENRICH_PROFILE_DB}`;
    const request = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(profileToUpdIns),
    };
    try {
      const response = await fetch(url, request);
      if (response.ok) {
        const data: TServerUpdateReturnCode = await response.json();
        console.log('enrichProfileInDb: Received data from server');
        console.log(data);
        return {
          ...data,
          isSuccess: data.returnCode === 'SUCCESS',
        };
      } else {
        throw Error(`HTTP error: ${response.status}`);
      }
    } catch (e) {
      throw e;
    }
  };

  const insertUpdatePostByVkId = async (comment: Pick<TComment, 'id' | 'text'>): Promise<TServerUpdateCommandE> => {
    console.log('insertUpdatePostByVkId', {
      comment,
    });
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.UPDATE_COMMENT_VK_ID}`;
    const request = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(comment),
    };
    try {
      const response = await fetch(url, request);
      if (response.ok) {
        const data: TServerUpdateCommand = await response.json();
        console.log('insertUpdatePostByVkId: Received data from server');
        console.log(data);
        return {
          ...data,
          isSuccess: data.rowCount > 0,
        };
      } else {
        throw Error(`HTTP error: ${response.status}`);
      }
    } catch (e) {
      throw e;
    }
  };

  const updateHasChild = async (bool: string, profileId: string): Promise<TServerUpdateCommandE> => {
    if (profileId && bool) {
      const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.UPDATE_CHILD}${bool}/${profileId}`;
      try {
        const result = await fetch(url);
        const response: TServerUpdateCommand = await result.json();
        console.log('updateHasChild: received result for has_child update');
        console.log(response);
        return {
          ...response,
          isSuccess: response.rowCount > 0,
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error('updateHasChild: bool or profileId is not valid');
    }
  };

  const updateRelationship = async (bool: string, profileId: string): Promise<TServerUpdateCommandE> => {
    if (profileId && bool) {
      const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.UPDATE_RELATIONSHIP}${bool}/${profileId}`;
      try {
        const result = await fetch(url);
        const response: TServerUpdateCommand = await result.json();
        console.log('updateRelationship: received result for has_child update');
        console.log(response);
        return {
          ...response,
          isSuccess: response.rowCount > 0,
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error('updateRelationship: bool or profileId is not valid');
    }
  };

  const updateIsFavorite = async (bool: string, profileId: string): Promise<TServerUpdateReturnCodePromise> => {
    if (profileId && bool) {
      const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.UPDATE_FAVORITE}${bool}/${profileId}`;
      try {
        const result = await fetch(url);
        const response: TServerUpdateReturnCode = await result.json();
        console.log('updateIsFavorite: received result for has_child update');
        console.log(response);
        return {
          ...response,
          isSuccess: response.returnCode === 'SUCCESS',
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error('updateIsFavorite: bool or profileId is not valid');
    }
  };

  const updateRelation = async (bool: string, profileId: string): Promise<TServerUpdateReturnCodePromise> => {
    if (profileId && bool) {
      const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.UPDATE_RELATION}${bool}/${profileId}`;
      try {
        const result = await fetch(url);
        const response: TServerUpdateReturnCode = await result.json();
        console.log('updateRelation: received result for update');
        console.log(response);
        return {
          ...response,
          isSuccess: response.returnCode === 'SUCCESS',
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error('updateRelation: bool or profileId is not valid');
    }
  };

  const insertUpdateCheckSingleProfile = async (
    profileId: string,
    firstName: string,
    lastName: string,
  ): Promise<TServerUpdateReturnCodePromise> => {
    const encodedFirstName = encodeURIComponent(firstName);
    const encodedLastName = encodeURIComponent(lastName);
    let urlBase = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.INSERT_UPD_SINGLE_PROFILE}`;
    const url = urlBase + profileId + '/' + encodedFirstName + '/' + encodedLastName;
    if (profileId && firstName && lastName) {
      try {
        const response = await fetch(url);
        const data: TServerUpdateReturnCode = await response.json();
        return {
          ...data,
          isSuccess: data.returnCode === 'SUCCESS',
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw new Error(
        'insertUpdateCheckSingleProfile.Exception: invalid data',
      );
    }
  };

  const estimateProfileById = async (estimation: string, profileId: string): Promise<TServerUpdateCommandSuccess> => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.ESTIMATE_PROFILE_ID}${estimation}/${profileId}`;
    if (estimation && profileId) {
      try {
        const response = await fetch(url);
        const data: TServerUpdateCommand = await response.json();
        console.log('estimateProfileById received data');
        console.log(data);
        return {
          ...data,
          isSuccess: data.rowCount > 0,
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error(
        'estimateProfileById ERROR: estimation or profileId is not valid',
      );
    }
  };

  const corrEstimateProfileById = async (corrEstimation: string, profileId: string): Promise<TServerUpdateCommandSuccess> => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.CORR_ESTIMATE_PROFILE_ID}${corrEstimation}/${profileId}`;
    if (corrEstimation && profileId) {
      try {
        const response = await fetch(url);
        const data: TServerUpdateCommand = await response.json();
        console.log('corrEstimateProfileById received data');
        console.log(data);
        return {
          ...data,
          isSuccess: data.rowCount > 0,
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error(
        'corrEstimateProfileById ERROR: estimation or profileId is not valid',
      );
    }
  };

  const updateBirthYear = async (birthYear: string, profileId: string): Promise<TServerUpdateReturnCodePromise> => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.DB_MG}${API_CONSTANTS.UPDATE_BIRTH_YEAR}${birthYear}/${profileId}`;
    if (birthYear && profileId) {
      try {
        const response = await fetch(url);
        const data: TServerUpdateReturnCode = await response.json();
        console.log('updateBirthYear received data');
        console.log(data);
        return {
          ...data,
          isSuccess: data.returnCode === 'SUCCESS',
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw Error(
        'updateBirthYear ERROR: estimation or profileId is not valid',
      );
    }
  };

  const getProfilesMockAsyncTest = async () => {
    try {
      await waitTimeout();
      const response = getMockedProfilesData();
      return response;
    } catch (e) {
      throw e;
    }
  };

  return {
    getProfileInfoById,
    getProfileDBInfoById,
    getProfileDBExtendedInfoById,
    estimateProfileById,
    corrEstimateProfileById,
    updateBirthYear,
    enrichProfileInDb,
    insertUpdateCheckSingleProfile,
    getMatchedProfilesVKByQuery,
    getProfileInfoInDbChecksByIds,
    waitTimeout,
    getCommentByProfileId,
    insertUpdatePostByVkId,
    updateHasChild,
    updateIsFavorite,
    updateRelation,
    updateRelationship,
    getHistoryCommentsByProfileId,
  };

}