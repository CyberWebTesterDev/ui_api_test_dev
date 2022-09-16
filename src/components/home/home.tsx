import * as React from 'react';
import './home.css';
import { useSearchPanelActions } from '../vk-api/hooks/use-search-panel';
import { useVkApiContext } from '../vk-api/vk-api-context';

export const Home = () => {
  const context = useVkApiContext();

  return (
     <div className={'menu-block'}>
       <a href={'/search-matches'}> Перейти на страницу поиска </a>
       <a href={'/profile-check'}> Перейти на страницу профайла </a>
     </div>
  );
};