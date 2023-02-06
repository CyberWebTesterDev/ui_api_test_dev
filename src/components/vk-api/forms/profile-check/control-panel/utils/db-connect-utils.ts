import { TInsertUpdateDBProfile, TProfileVK } from '../../../../vk-lib/vk-models';
import { PROFILE_INSERT_UPDATE_FIELDS } from '../../fields/fields-constants';

export const gerPreparedProfileToUpdateInDb = (profileVK: TProfileVK): TInsertUpdateDBProfile | undefined => {
  if (Object.keys(profileVK).length > 0) {
    let mappedProfile = {};
    Object.keys(profileVK).forEach(
      key => {
        if (PROFILE_INSERT_UPDATE_FIELDS.some(field => field === key)) {
          if (key === 'last_seen.time') {
            const dateSeen = new Date(profileVK[key] * 1000)
              .toISOString();
            mappedProfile = {
              ...mappedProfile,
              [key]: dateSeen,
            };
          } else {
            mappedProfile = {
              ...mappedProfile,
              [key]: profileVK[key as keyof TProfileVK],
            };
          }
        }
      },
    );
    return mappedProfile as TInsertUpdateDBProfile;
  }
  return;
};

export const blockCheckPredicate = (arg1?: null| boolean): boolean => {
  return typeof arg1 !== 'undefined' && arg1 !== null;
};