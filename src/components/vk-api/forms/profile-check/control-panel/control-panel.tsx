/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Estimation } from './options/estimation';
import { CorrelationEstimation } from './options/correlation-estimation';
import { DbConnectApi } from './db-connect-api';
import './control-panel.css';
import { PickBirthYear } from './options/pick-birth-year';
import { Comment } from '../../../db-search/db-search-panel/components/comment';
import { ChildEstimationProbability } from './options/child-estimation-probability';
import { Relationship } from './options/relationship';
import { Favorite } from './options/favorite';
import { Relation } from './options/relation';
import { useVkApiContext } from '../../../vk-api-context';
import { useDbConnect } from './options/use-db-connect';

export const ControlPanel = () => {
  const { profileCheckForm: { profileInDb } } = useVkApiContext();
  const { handleInsertUpdateDB } = useDbConnect();

  return !!profileInDb ? (
     <div className={'control-panel-db'}>
       Панель управления
       <div className={'selections-container'}>
         <Favorite />
         <Estimation/>
         <CorrelationEstimation/>
         <PickBirthYear/>
         <ChildEstimationProbability />
         <Relationship />
         <Relation />
         <DbConnectApi/>
         <Comment />
       </div>
     </div>
  ) : (
     <div className={'no-db-block'}>
       Профайла нет в БД для работы необходимо записать
       <button onClick={() => handleInsertUpdateDB()}>Записать в БД </button>
     </div>
  );
};