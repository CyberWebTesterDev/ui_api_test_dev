import * as px from 'pixi.js';
import { TBaseObjectConfig } from '../units/unit-uni';
import { units } from '../units/images-importer';

type TUnit = Pick<TBaseObjectConfig, 'instance' | 'unitOptions'>;

type TGameState = {
  isResourcesLoading: boolean;
  isResourcesLoaded: boolean;
};

export class Game {
  private _gameState: TGameState = {
    isResourcesLoading: false,
    isResourcesLoaded: true,
  };
  private childListeners: Function[] = [];

  constructor() {
    this.unitsBase = [];
    this.balls = [{ ball: this.createGreenBallSprite(), isGreen: true }];
  }

  linesBasement: px.Graphics[] = [];
  lineEndsX: number[] = [];

  private unitsBase: TUnit[];
  private balls: { ball: px.Sprite; isGreen: boolean; }[];

  setUnits = (unit: TUnit) => {
    this.unitsBase.push(unit);
  };

  getUnits = () => this.unitsBase;

  getBalls = () => this.balls;

  getStateSync = () => this._gameState;

  setState = (object: TGameState) => {
    this._gameState.isResourcesLoaded = object.isResourcesLoaded;
    this._gameState.isResourcesLoading = object.isResourcesLoading;
  };

  getDelayedStateAsync: Promise<TGameState> = new Promise((resolve) => {
    setTimeout(() => {
      resolve(this._gameState);
    }, 2000);
  });

  addChildEventListener = (fn: Function) => this.childListeners.push(fn);

  executeChildEventListeners = (e: px.InteractionEvent) => {
    this.childListeners.forEach(listener => {
      listener(e);
    });
  };

  drawLine = (startX: number, positionY: number, width: number) => {
    const line = new px.Graphics();
    line
      .lineStyle(4, 0x0, 1)
      .lineTo(width, 0)
      .position.set(startX, positionY);
    return line;
  };

  createGreenBallSprite = () => {
    const sprite = px.Sprite.from(units.greenBall);
    sprite.name = 'greenBall';
    return sprite;
  };

  addBallChildToContainer = (container: px.Container) => {
    if (this.unitsBase[0].instance) {
      if (!container.getChildByName('greenBall')) {
        this.balls[0].ball.y = this.unitsBase[0].instance.y - 1;
        container.addChild(this.balls[0].ball);
      }
    }
  };

  removeBallChildFromContainer = (container: px.Container) => {
    container.removeChild(this.balls[0].ball);
  };

  // shoot = (x: number, y: number, container: px.Container) => {
  //   const targetX = x;
  //   const targetY = y;
  //   if (this.unitsBase[0].instance) {
  //     const startX = this.unitsBase[0].instance.x + 5;
  //     const startY = this.unitsBase[0].instance.y + 1;
  //     this.balls[0].ball.x = startX;
  //     this.balls[0].ball.y = startY;
  //     container.addChild(this.balls[0].ball);
  //     if (this.balls[0].ball.x <= targetX) {
  //       this.balls[0].ball.x += 5;
  //     } else {
  //       setTimeout(() => {
  //         // this.unitsBase[0].unitOptions.isShooting = false;
  //         container.removeChild(this.balls[0].ball);
  //       }, 1000);
  //     }
  //   }
  // };

}