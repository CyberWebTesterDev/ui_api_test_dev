import { TDateKeys, TProfileExt } from '../components/vk-api/vk-lib/vk-models';
import { DATE_FIELDS } from './service-constants';

// @ts-ignore
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

type TDateExtended = Date & {
  addHours: (h: number) => Date;
};

export const getFormattedDate = (arr: TProfileExt[]) => {
  arr.forEach((el, idx) => {
    for (let k in el) {
      for (let i = 0; i < DATE_FIELDS.length; i++) {
        if (
          k === DATE_FIELDS[i] as TDateKeys
        ) {
          if (el[k as keyof TProfileExt]) {
            let stringToDateField: TDateExtended = new Date(el[k]) as TDateExtended;
            stringToDateField.addHours(3);
            arr[idx][k] =
               stringToDateField
                 .toISOString()
                 .replace('T', ' ')
                 .replace('Z', '')
                 .split('.')[0]
                 .split(':')[0] +
               ':' +
               stringToDateField
                 .toISOString()
                 .replace('T', ' ')
                 .replace('Z', '')
                 .split('.')[0]
                 .split(':')[1];
          }
        }
      }
    }
  });
};