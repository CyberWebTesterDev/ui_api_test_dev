import { DATE_FIELDS } from '../../../service-api/service-constants';

export const VK_NAMES_BY_KEY_MAP = {
  id: 'Id аккаунта',
  first_name: 'Имя',
  last_name: 'Фамилия',
  bdate: 'Дата рождения',
};

export type StringExt = string & {
  addHours(number: number): void;
  toISOString(): any;
};

export type TComment = {
  change_date: string | Date;
  creation_date: string | Date;
  id: string;
  text: string | null;
}

export type TProfileVK = {
  bdate: string | undefined;
  sex: number;
  last_name: string;
  id: number;
  first_name: string;
  can_access_closed: boolean;
  'city.title': string;
  'counters.albums': number;
  'counters.audios': number;
  'counters.clips_followers': number;
  'counters.followers': number;
  'counters.friends': number;
  'counters.mutual_friends': number;
  'counters.online_friends': number;
  'counters.pages': number;
  'counters.photos': number;
  'counters.subscriptions': number;
  'counters.videos': number;
  'country.id': number;
  'country.title': string;
  'last_seen.platform': number;
  'last_seen.time': number;
  followers_count: number;
  has_photo: number;
  online: number;
  photo_max_orig: string;
  photo_max: string;
  photo_100: string;
  is_closed: boolean;
}

export type TProfileExt = TProfileVK & {
  creation_date: string | Date;
  change_date: string | Date;
  first_checked: string | Date;
  check_update: string | Date;
  update_time: string | Date;
};

export type TProfileDB = {
  change_date: string | Date;
  first_checked: string | Date;
  check_update: string | Date;
  birth_date: string | null;
  birth_year: string;
  city: string | null;
  counters_followers: string | null;
  counters_friends: string | null;
  counters_photos: string;
  creation_date: string | Date;
  deactivated: boolean | null;
  estimation: number | null;
  first_name: string;
  last_name: string;
  last_seen: string | Date;
  sex: number;
  update_time: string | Date;
  vk_id: string;
  is_closed: boolean;
  is_favorite: boolean | null;
  is_related: boolean | null;
  id: string;
}

export type TProfileDBExtended = TProfileDB & {
  correlation_est: number;
  has_child: boolean | null;
  is_in_relationship: boolean | null;
  check_update: string | Date;
}

export type TProfileCheckDB = {
  check_id: number;
  check_update: string;
  correlation_est: string | null;
  estimation: string | null;
  has_child: boolean | null;
  vk_id: string;
  is_checked: boolean;
  first_name: string;
  last_name: string;
  is_in_relationship: boolean | null;
}

export type TInsertUpdateDBProfile = Pick<
TProfileVK,
'id'
| 'city.title'
| 'country.title'
| 'counters.friends'
| 'counters.followers'
| 'counters.photos'
| 'bdate'
| 'sex'
| 'first_name'
| 'last_name'
| 'last_seen.time'
| 'is_closed'
>

export type TDateKeys = typeof DATE_FIELDS[number];

export type TServerUpdateCommand = {
  command: string;
  fields: any[];
  rowsAsArray: boolean;
  rowCount: number;
  rows: any[];
}

export type TServerUpdateCommandE = {
  command: string;
  fields: any[];
  rowsAsArray: boolean;
  rowCount: number;
  rows: any[];
  isSuccess: boolean;
}

export type TServerUpdateReturnCode = {
  returnCode: string;
}

export type TServerUpdateReturnCodePromise = {
  returnCode: string;
  isSuccess: boolean;
}

export type TServerUpdateCommandSuccess = TServerUpdateCommand & {
  isSuccess: boolean;
};