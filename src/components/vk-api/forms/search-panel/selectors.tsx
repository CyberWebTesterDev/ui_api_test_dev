import * as React from 'react';
import { CITY_OPTION_VALUES, DAYS, MONTHS, NULL_VALUE_DESCRIPRION, YEARS } from './constants/constants';
import './selectors.css';
import { useSearchPanelInputs } from '../../hooks/use-search-panel';
import { useVkApiContext } from '../../vk-api-context';

export const Seleсtors = () => {
  const {
    handleOnChangeSelect,
  } = useSearchPanelInputs();
  const { selectorsData: { city, month }, inputsData: { ageTo, ageFrom } } = useVkApiContext();
  const isYearDisabled = Boolean(ageFrom || ageTo);

  const cities = Object.keys(CITY_OPTION_VALUES).map(
    (city) => {
      return (
         <option key={city} value={CITY_OPTION_VALUES[city].value}>{CITY_OPTION_VALUES[city].description}</option>
      );
    },
  );
  const months = Object.keys(MONTHS).map(
    (number) => {
      return (
         <option key={number} value={number}>{MONTHS[number]}</option>
      );
    },
  );

  const days = DAYS.map(
    (day) => {
      return (
         <option key={day} value={day}>{ day === '0' ? NULL_VALUE_DESCRIPRION[day] : day}</option>
      );
    },
  );

  const years = YEARS.map(
    (year) => {
      return (
          <option key={year} value={year}>{ year === 'null' ? NULL_VALUE_DESCRIPRION[year] : year}</option>
      );
    },
  );

  return (
     <div className={'selectors-sector'}>
       <label htmlFor="city">Выберите город: {city}</label>
       <select id={'city'} onChange={(e) => handleOnChangeSelect(e)}>
         {cities}
       </select>
       <label htmlFor="month">Выберите месяц: {month}</label>
       <select id={'month'} onChange={(e) => handleOnChangeSelect(e)}>
         {months}
       </select>
       <label htmlFor="day">Выберите день: </label>
       <select id={'day'} onChange={(e) => handleOnChangeSelect(e)}>
         {days}
       </select>
       <label htmlFor="year">Выберите год: </label>
       <select id={'year'} disabled={isYearDisabled} onChange={(e) => handleOnChangeSelect(e)}>
         {years}
       </select>
     </div>
  );
};