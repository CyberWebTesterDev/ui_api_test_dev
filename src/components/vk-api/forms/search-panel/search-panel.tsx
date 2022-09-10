import * as React from 'react';
import './search-panel.css';
import { Inputs } from './inputs';
import { Buttons } from './buttons';
import { Seleсtors } from './selectors';

export const SearchPanel = () => {

  return (
     <div className={'vk-search-form'}>
       <Inputs/>
       <Seleсtors/>
       <Buttons/>
     </div>
  );
};