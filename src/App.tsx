import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { VkApiContainer } from './components/vk-api/vk-api-container';
import { ProfileCheck } from './components/vk-api/forms/profile-check/profile-check';
import { Home } from './components/home/home';
import { ApplicationContext } from './components/application-container/app-context';
import { defaultContext, VkApiContext } from './components/vk-api/vk-api-context';
import { Loader } from './components/loader/loader';
import { PopUpContainer } from './components/pop-ups/pop-up-container';
import { defaultServiceContext, ServiceContext } from './service-api/service-context';
import { DbSearchContainer } from './components/vk-api/db-search/db-search-container';
import { GameContainer } from './components/game/game-container';
import { LOG_APP, trimStringArray } from './service-api';
import { processText } from './data/process-data';

function testFunc() {
  /*
Тестовый блок
 */
  const REG_EXP = /(^|\s{0,})[а-я]{1,}($|\s{0,})/gidu;
  const REG_EXP_2 = /(^|\s{0,})[а-я]{1,}?[eo][г][o]($|\s{1,})/gidu;

  const paramsToLog = {
    testStr: 'книга лешего среднего теста путь парящего',
    REG_EXP,
    trimmedResult: trimStringArray('книга лешего среднего теста путь парящего'.match(REG_EXP)),
    testRegExpResult: 'книга лешего среднего теста путь парящего'.match(REG_EXP_2),
  };

  LOG_APP('TEST_', { paramsToLog });
}

const AppComponent = () => {
  const [state, setStateContext] = React.useState(defaultContext);
  const [serviceState, setServiceState] = React.useState(defaultServiceContext);

  React.useEffect(
    () => {
      processText();
      // testFunc(); init
    }, [],
  );

  React.useEffect(
    () => {
      const { profileCheckForm } = state;

      LOG_APP('AppComponent state VkApiContext change', {
        profileCheckForm,
      });
    }, [state],
  );

  const applicationUpdateContext = React.useMemo(
    () => ({
      updateStateContext: setStateContext,
    }), [setStateContext],
  );

  const stateContext = React.useMemo(
    () => (
      {
        ...state,
      }
    ), [state],
  );

  const serviceStateContext = React.useMemo(
    () => (
      {
        ...serviceState,
        updateServiceStateContext: setServiceState,
      }
    ), [serviceState],
  );

  return (
     <ApplicationContext.Provider value={applicationUpdateContext}>
       <VkApiContext.Provider value={stateContext}>
         <ServiceContext.Provider value={serviceStateContext}>
          <Loader />
           <PopUpContainer/>
           <Home />
           <Routes>
             <Route path='/*' element={<Home />} />
             <Route path='/search-matches' element={<VkApiContainer />} />
             <Route path='/db-search' element={<DbSearchContainer />} />
             <Route path='/profile-check/:id' element={<ProfileCheck />} />
             <Route path='/game' element={<GameContainer />} />
           </Routes>
         </ServiceContext.Provider>
       </VkApiContext.Provider>
     </ApplicationContext.Provider>
  );
};

export const App = React.memo(AppComponent);
