import {
  StringExt, TComment,
  TDateKeys,
  TProfileCheckDB,
  TProfileDB,
  TProfileDBExtended,
  TProfileExt,
} from '../components/vk-api/vk-lib/vk-models';
import { DATE_FIELDS } from './service-constants';

class DateE extends Date {
  addHours = (h: number) => {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
}

// @ts-ignore
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

type TDateExtended = Date & {
  addHours: (h: number) => Date;
};

export const formatDate = (arr: (TProfileDB | TProfileCheckDB | TComment)[]) => {
  arr.forEach((el, idx) => {
    for (let k in el) {
      for (let i = 0; i < DATE_FIELDS.length; i++) {
        if (
          k === DATE_FIELDS[i] as TDateKeys
        ) {
          if (el[k as keyof (TProfileDB | TProfileCheckDB | TComment)]) {
            // @ts-ignore
            let stringToDateField: StringExt = new Date(el[k]) as unknown as TProfileDB;
            stringToDateField.addHours(3);
            // @ts-ignore
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

export const getParsedJsonArray = (dataArray: string[]): {[key: string]: any;}[] => {
  return dataArray.map((data) => {
    return JSON.parse(data);
  });
};