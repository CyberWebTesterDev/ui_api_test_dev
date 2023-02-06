import { TProfileDB, TProfileVK, TProfileCheckDB, TProfileDBExtended } from '../vk-lib/vk-models';

export const countNonNullElementsInArray = (arr: (TProfileVK | TProfileDB | TProfileCheckDB | null | undefined)[]): number => {
  if (arr.length === 0) {return 0;}
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i] !== null) {
      count++;
    }
  }
  return count;
};

export const getProfileIdsFromVkData = (profiles: (TProfileVK | null)[]): string[] | undefined => {
  if (profiles.length === 0) {
    return;
  }
  let ids: string[] = [];
  profiles.forEach(
    (profile) => {
      if (profile) {
        for (let key in profile) {
          if (key === 'id') {
            ids.push(profile[key].toString());
          }
        }
      }
    },
  );
  return ids;
};

export const getDiffByCorrelationEstimationDesc = (a: TProfileDBExtended, b: TProfileDBExtended) => {
  if (a.correlation_est > b.correlation_est) {
    return -1;
  }
  if (a.correlation_est < b.correlation_est) {
    return 1;
  }
  return 0;
};