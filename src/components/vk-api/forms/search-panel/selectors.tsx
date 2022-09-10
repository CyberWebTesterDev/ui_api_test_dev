import * as React from 'react';
import { CITY_OPTION_VALUES, DAYS, MONTHS, NULL_VALUE_DESCRIPRION, YEARS } from './constants/constants';
import './selectors.css';
import { useSearchPanelInputs } from '../../hooks/use-search-panel';
import { useVkApiContext } from '../../vk-api-context';

export const Seleсtors = () => {
  const {
    handleOnChangeSelect,
  } = useSearchPanelInputs();
  const { selectorsData: { city, month } } = useVkApiContext();

  const cities = Object.keys(CITY_OPTION_VALUES).map(
    (city) => {
      return (
         <option value={CITY_OPTION_VALUES[city].value}>{CITY_OPTION_VALUES[city].description}</option>
      );
    },
  );
  const months = Object.keys(MONTHS).map(
    (number) => {
      return (
         <option value={number}>{MONTHS[number]}</option>
      );
    },
  );

  const days = DAYS.map(
    (day) => {
      return (
         <option value={day}>{ day === '0' ? NULL_VALUE_DESCRIPRION[day] : day}</option>
      );
    },
  );

  const years = YEARS.map(
    (year) => {
      return (
          <option value={year}>{ year === '0' ? NULL_VALUE_DESCRIPRION[year] : year}</option>
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
       <select id={'year'} onChange={(e) => handleOnChangeSelect(e)}>
         {years}
       </select>
     </div>
  );
};