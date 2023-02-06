import * as px from 'pixi.js';
import { Game } from './game/game';
import { UnitUniversal } from './units/unit-uni';

const stageProps = {
  height: window.innerHeight - 100,
  width: window.innerWidth - 150,
  backgroundColor: 0x008B8B,
};

export function renderGraphics() {
  const app = new px.Application(stageProps);
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.style.height = `${app.view.height}px`;
    gameContainer.style.width = `${app.view.width}px`;
  }
  gameContainer?.appendChild(app.view);
  const game = new Game();
  const container = new px.Container();
  container.width = app.view.width;
  container.height = app.view.height;
  app.stage.addChild(container);
  new UnitUniversal(
    {
      app,
      container,
      game,
    },
  );
  container.hitArea = new px.Rectangle(0, 0, app.screen.width, app.screen.height);
  container.interactive = true;
  container.on('click', game.executeChildEventListeners);
  // new UnitUniversal({
  //   app,
  //   container,
  //   game,
  //   startPointX: 2090,
  //   endPointY: 120,
  //   spriteSheetName: 'shipHorizontalLeft',
  // });
  new UnitUniversal({
    app,
    container,
    game,
    startPointX: 1320,
    endPointY: 200,
    spriteSheetName: 'simpleEnemy',
    isEnemy: true,
  });
}