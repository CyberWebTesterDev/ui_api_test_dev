import * as React from 'react';
import { renderGraphics } from './game-app/render-graphics';
import './game-container.css';

export const GameContainer = () => {
  React.useEffect(
    () => {
      renderGraphics();
    }, [],
  );

  return <div id={'game-container'}></div>;
};