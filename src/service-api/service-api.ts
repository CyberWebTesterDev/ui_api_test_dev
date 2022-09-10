import { getMockedProfilesData } from '../components/vk-api/forms/test-data/mocked-data';

const API_CONSTANTS = {
  URI_BASE: 'http://192.168.1.236:8333/',
  GET_PROFILE_INFO_ID: 'vkget/',
  DB_MG: 'dbmanager/',
  SEARCH_IN_DB_ID: 'searchsingleprofiledb/',
  MATCH_PROFILES_SEARCH: 'matchfromsearch/',
};

export function useApiVKService () {

  const waitTimeout = (ms: number = 50) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const getProfileInfoById = async (profileId: string) => {
    const url = `${API_CONSTANTS.URI_BASE}${API_CONSTANTS.GET_PROFILE_INFO_ID}${profileId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      throw e;
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

  return { getProfileInfoById };

}