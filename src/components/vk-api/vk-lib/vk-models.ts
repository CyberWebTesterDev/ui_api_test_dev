import { DATE_FIELDS } from '../../../service-api/service-constants';

export const VK_NAMES_BY_KEY_MAP = {
  id: 'Id аккаунта',
  first_name: 'Имя',
  last_name: 'Фамилия',
  sex: 'Пол',
  bdate: 'Дата рождения',
};

export type TProfile = {
  bdate: string;
  sex: number;
  last_name: string;
  id: number;
  first_name: string;
}

export type TProfileExt = TProfile & {
  creation_date: string | Date;
  change_date: string | Date;
  first_checked: string | Date;
  check_update: string | Date;
  update_time: string | Date;
};

export type TDateKeys = typeof DATE_FIELDS[number];