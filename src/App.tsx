import * as React from 'react';
import { VkApiContainer } from './components/vk-api/vk-api-container';

const AppComponent = () => {
  return (
     <>
       <VkApiContainer />
     </>
  );
};

export const App = React.memo(AppComponent);
