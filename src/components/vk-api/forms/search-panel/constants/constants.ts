type TObj = {
  [key: string]: {
    value: string;
    description: string;
  };
};

export const CITY_OPTION_VALUES: TObj = {
  NOT_SELECTED: {
    value: '0',
    description: 'Не выбрано',
  },
  MOSCOW: {
    value: '1',
    description: 'Москва',
  },
  VLADIMIR: {
    value: '39',
    description: 'Владимир',
  },
  RYAZAN: {
    value: '122',
    description: 'Рязань',
  },
  TULA: {
    value: '246',
    description: 'Тула',
  },
  KALUGA: {
    value: '62',
    description: 'Калуга',
  },
  SIMFEROPOL: {
    value: '627',
    description: 'Симферополь',
  },
  KHIMKI: {
    value: '155',
    description: 'Химки',
  },
};

export const MONTHS: { [key: string]: string; } = {
  '0': 'Не выбрано',
  '1': 'Январь',
  '2': 'Февраль',
  '3': 'Март',
  '4': 'Апрель',
  '5': 'Май',
  '6': 'Июнь',
  '7': 'Июль',
  '8': 'Август',
  '9': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

export const NULL_VALUE_DESCRIPRION: { [key: string]: string; } = {
  '0': 'Не выбрано',
};

export const YEARS = ['0'].concat(Array(20).fill(1985).map((n, i) => { return (n + i).toString(); }));

export const DAYS = Array(32).fill(0).map((n, i) => { return (n + i).toString(); });