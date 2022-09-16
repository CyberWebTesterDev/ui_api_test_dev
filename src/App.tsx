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

const AppComponent = () => {
  const [state, setStateContext] = React.useState(defaultContext);
  const [serviceState, setServiceState] = React.useState(defaultServiceContext);

  React.useEffect(
    () => {
      const { profileCheckForm } = state;
      console.log('AppComponent state VkApiContext change', {
        profileCheckForm,
      });
    }, [state],
  );

  const applicationUpdateContext = React.useMemo(
    () => ({
      updateStateContext: setStateContext,
    }), [setStateContext],
  );

  const valueStateContext = React.useMemo(
    () => (
      {
        ...state,
      }
    ), [state],
  );

  const valueServiceStateContext = React.useMemo(
    () => (
      {
        ...serviceState,
        updateServiceStateContext: setServiceState,
      }
    ), [serviceState],
  );

  return (
     <ApplicationContext.Provider value={applicationUpdateContext}>
       <VkApiContext.Provider value={valueStateContext}>
         <ServiceContext.Provider value={valueServiceStateContext}>
           <Loader/>
           <PopUpContainer/>
           <Home />
           <Routes>
             <Route path='/*' element={<Home />} />
             <Route path='/search-matches' element={<VkApiContainer />} />
             <Route path='/db-search' element={<DbSearchContainer />} />
             <Route path='/profile-check/:id' element={<ProfileCheck />} />
           </Routes>
         </ServiceContext.Provider>
       </VkApiContext.Provider>
     </ApplicationContext.Provider>
  );
};

export const App = React.memo(AppComponent);
