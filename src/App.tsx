import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { VkApiContainer } from './components/vk-api/vk-api-container';

const AppComponent = () => {
  return (
     <Routes>
       <Route path='/search-matches' element={<VkApiContainer />} />
       <Route path='/' element={<a href={'/search-matches'}> Перейти на страницу поиска </a>} />
     </Routes>
  );
};

export const App = React.memo(AppComponent);
