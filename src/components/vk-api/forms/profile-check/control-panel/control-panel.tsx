/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Estimation } from './options/estimation';
import { CorrelationEstimation } from './options/correlation-estimation';
import { DbConnectApi } from './db-connect-api';
import './control-panel.css';
import { PickBirthYear } from './options/pick-birth-year';

export const ControlPanel = () => {

  return (
     <div className={'control-panel-db'}>
       Панель управления
       <div className={'selections-container'}>
         <Estimation/>
         <CorrelationEstimation/>
         <PickBirthYear/>
         <DbConnectApi/>
       </div>
     </div>
  );
};