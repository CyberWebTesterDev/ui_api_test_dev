import * as px from 'pixi.js';
import { Game } from '../game/game';
import { units } from './images-importer';

export type TBaseObjectConfig = {
  container: px.Container | null;
  app: px.Application | null;
  instance?: px.AnimatedSprite;
  instanceStatic?: px.Sprite;
  loader?: px.Loader;
  sheet?: px.BaseTexture;
  unitSheet: {
    standSouth: px.Texture[];
  };
  unitOptions: {
    healthPoints: number;
    isMoving: boolean;
    mouseTouched: boolean;
    baseTint: number;
    unitSpeed: number;
    width: number;
    height: number;
    isStandingOnBasement: boolean;
    fallingSpeed: number;
    verticalSpeed: number;
    jumpForce: number;
    isEnemy?: boolean;
    isDead?: boolean;
    isMain?: boolean;
    isShooting?: boolean;
  };
  animationSpeed: number;
  currentCursorCoordinates: {
    x: number;
    y: number;
  };
  needWalk: boolean;
  shouldJump: boolean;
  initialUnitCoordinates: {
    x: number;
    y: number;
  };
  game: Game | null;
  spriteSheetName?: keyof typeof units;
};

type TPlayerOption = {
  app: px.Application;
  game: Game;
  container: px.Container;
  startPointX?: number;
  endPointY?: number;
  spriteSheetName?: keyof typeof units;
  defaultMode?: boolean;
  width?: number;
  height?: number;
  isEnemy?: boolean;
};

export class UnitUniversal {
  private _config: TBaseObjectConfig = {
    game: null,
    app: null,
    container: null,
    unitOptions: {
      healthPoints: 10,
      isMoving: false,
      mouseTouched: false,
      baseTint: 0,
      unitSpeed: 15,
      width: 0,
      height: 0,
      isStandingOnBasement: false,
      fallingSpeed: 2,
      verticalSpeed: 8,
      jumpForce: 100,
    },
    unitSheet: {
      standSouth: [],
    },
    animationSpeed: 0.2,
    currentCursorCoordinates: {
      x: -1,
      y: -1,
    },
    needWalk: false,
    initialUnitCoordinates: {
      x: 30,
      y: 200,
    },
    spriteSheetName: undefined,
    shouldJump: false,
  };

  constructor(
    {
      app,
      container,
      game,
      startPointX,
      endPointY,
      spriteSheetName,
      isEnemy,
    }: TPlayerOption,
  ) {
    this._config.app = app;
    this._config.container = container;
    this._config.game = game;
    this._config.loader = app?.loader;
    this._config.spriteSheetName = spriteSheetName ?? 'mainUnit';
    this._config.initialUnitCoordinates.x = startPointX ?? 30;
    this._config.initialUnitCoordinates.y = endPointY ?? 200;
    this._config.unitOptions.isEnemy = isEnemy ?? false;
    if (!spriteSheetName) {
      this._config.unitOptions.isMain = true;
      this._loadDefaultUnit();
    }
    if (spriteSheetName) {
      this._loadSpecificUnit();
    }
  };

  private _loadDefaultUnit = () => {
    if (this._config.game && this._config.loader && this._config.spriteSheetName) {
      if (!this._config.game.getStateSync().isResourcesLoading) {
        this._config.loader.add(this._config.spriteSheetName, units.mainUnit);
        this._config.game.setState({
          isResourcesLoaded: false,
          isResourcesLoading: true,
        });
        this._config.loader.load(this._createDefaultPlayerUnit);
      } else {
        this._config.game.getDelayedStateAsync.then(
          state => {
            if (!state.isResourcesLoading && this._config.game && this._config.spriteSheetName) {
              this._config.loader?.add(this._config.spriteSheetName, units.mainUnit);
              this._config.game.setState({
                isResourcesLoaded: false,
                isResourcesLoading: true,
              });
              this._config.loader?.load(this._createDefaultPlayerUnit);
            }
          });
      }
    }
  };

  private _loadSpecificUnit = () => {
    if (this._config.game && this._config.loader && this._config.spriteSheetName) {
      if (!this._config.game.getStateSync().isResourcesLoading) {
        this._config.loader.add(this._config.spriteSheetName, units[this._config.spriteSheetName]);
        this._config.game.setState({
          isResourcesLoaded: false,
          isResourcesLoading: true,
        });
        this._config.loader.load(this._createSpecificUnit);
      } else {
        this._config.game.getDelayedStateAsync.then(
          state => {
            if (!state.isResourcesLoading && this._config.game && this._config.spriteSheetName) {
              this._config.loader?.add(this._config.spriteSheetName, units[this._config.spriteSheetName]);
              this._config.game.setState({
                isResourcesLoaded: false,
                isResourcesLoading: true,
              });
              this._config.loader?.load(this._createSpecificUnit);
            }
          });
      }
    }
  };

  private _createDefaultPlayerUnit = () => {
    const {
      loader,
      container,
      app,
      initialUnitCoordinates,
      spriteSheetName,
      game,
      animationSpeed,
    } = this._config;
    game?.setState({
      isResourcesLoaded: true,
      isResourcesLoading: false,
    });

    if (loader && spriteSheetName) {
      this._config.sheet = px.BaseTexture.from(loader.resources[spriteSheetName].url);
      this._config.unitSheet.standSouth[0] = new px.Texture(this._config.sheet);
      this._config.instance = new px.AnimatedSprite(this._config.unitSheet.standSouth);
      // устанавливаем исходную точку оси вращения спрайта или начало спрайта левые углы осей координат
      this._config.instance.anchor.set(0, 0);
      if (this._config.instance) {
        this._config.instance.x = initialUnitCoordinates.x;
        this._config.instance.y = initialUnitCoordinates.y;
        this._config.unitOptions.width = this._config.instance.getLocalBounds().width;
        this._config.unitOptions.height = this._config.instance.getLocalBounds().height;
        this._config.instance.loop = false;
        this._config.instance.animationSpeed = animationSpeed;
        this._config.instance.interactive = true;
        this._config.instance.on('click', this.mouseClickListener);
        if (app && game && container) {
          game.linesBasement[0] = game.drawLine(0, 300, 1500);
          game.lineEndsX.push(1500);
          game.linesBasement.push(game.drawLine(750, 520, 1500));
          game.lineEndsX.push(750);
          app.ticker.add(this.animateDefault);
          game.addChildEventListener(this.mouseClickAreaListener);
          this._config.unitOptions.baseTint = this._config.instance.tint;
          container.addChild(this._config.instance);
          container.addChild(game.linesBasement[0]);
          console.log('main line params', {
            lineX: game.linesBasement[0].x,
            lineY: game.linesBasement[0].y,
            lineWidth: game.linesBasement[0].width,
          });
          container.addChild(game.linesBasement[1]);
          console.log('next line params', {
            lineX: game.linesBasement[1].x,
            lineY: game.linesBasement[1].y,
            lineWidth: game.linesBasement[1].width,
          });
          game.setUnits({
            instance: this._config.instance,
            unitOptions: this._config.unitOptions,
          });
          const balls = game.getBalls();
          balls[0].ball.x = this._config.instance.x + 1;
        }
      }
    }
  };

  private _createSpecificUnit = () => {
    const {
      loader,
      container,
      app,
      initialUnitCoordinates,
      spriteSheetName,
      game,
      animationSpeed,
      unitOptions,
    } = this._config;
    game?.setState({
      isResourcesLoaded: true,
      isResourcesLoading: false,
    });

    if (loader && spriteSheetName) {
      this._config.sheet = px.BaseTexture.from(loader.resources[spriteSheetName].url);
      this._config.unitSheet.standSouth[0] = new px.Texture(this._config.sheet);
      this._config.instance = new px.AnimatedSprite(this._config.unitSheet.standSouth);
      // устанавливаем исходную точку оси вращения спрайта или начало спрайта левые углы осей координат

      if (this._config.instance) {
        this._config.instance.x = initialUnitCoordinates.x;
        this._config.instance.y = initialUnitCoordinates.y;
        this._config.unitOptions.width = this._config.instance.getLocalBounds().width;
        this._config.unitOptions.height = this._config.instance.getLocalBounds().height;
        this._config.instance.loop = false;
        this._config.instance.animationSpeed = 0.2;
        this._config.instance.anchor.set(0.1, 0);
        console.log('specific unit', {
          instanceCoordinateX: this._config.instance.x,
          instanceCoordinateY: this._config.instance.y,
          instanceCoordinateCalc: this._config.instance.getLocalBounds(),
        });
        if (unitOptions.isEnemy) {
          this._config.instance.interactive = true;
          this._config.instance.on('click', this.mouseClickEnemyListener);
        }
        if (app && game && container) {
          app.ticker.add(this.animateSpecific);
          this._config.unitOptions.baseTint = this._config.instance.tint;
          container.addChild(this._config.instance);
          game.setUnits({
            instance: this._config.instance,
            unitOptions: this._config.unitOptions,
          });
        }
      }
    }
  };

  private mouseClickListener = (e: px.InteractionEvent) => {
    console.log('clicked on animated unit instance event');
    this._config.unitOptions.mouseTouched = !this._config.unitOptions.mouseTouched;
    // this._config.currentCursorCoordinates = e.data.global;
    if (this._config.unitOptions.mouseTouched && this._config.instance) {
      this._config.instance!.tint = 0xd09ae5;
    } else if (this._config.instance) {
      this._config.instance!.tint = this._config.unitOptions.baseTint;
    }
  };

  private mouseClickEnemyListener = (e: px.InteractionEvent) => {
    if (this._config.instance && this._config.game && this._config.container) {
      console.log('clicked on enemy unit instance event');
      const mainUnit = this._config.game?.getUnits().find(
        unit => unit.unitOptions.isMain === true,
      );
      if (mainUnit && mainUnit.instance && mainUnit.unitOptions.mouseTouched) {
        this._config.currentCursorCoordinates.x = e.data.global.x;
        this._config.currentCursorCoordinates.y = e.data.global.y;
        mainUnit.instance.y -= 10;
        mainUnit.unitOptions.isShooting = true;
      }
    }
  };

  private mouseClickAreaListener = (e: px.InteractionEvent) => {
    const { mouseTouched, width } = this._config.unitOptions;
    if (this._config.instance) {
      const unitTransverseRegion = this._config.instance.x + width;
      const isClickedAreaOutOfUnitBordersX = e.data.global.x > unitTransverseRegion || e.data.global.x < this._config.instance.x;
      const isClickedAreaOutOfUnitBordersY = '';
      if (isClickedAreaOutOfUnitBordersX) {
        // если область клика выходит за пределы фигуры
        this._config.needWalk = mouseTouched;
        if (this._config.instance.y > e.data.global.y) {
          // если область выше крайней верхней точки фигуры
          this._config.shouldJump = true;
        }
        // фиксируем координаты достижения
        this._config.currentCursorCoordinates.x = e.data.global.x;
        this._config.currentCursorCoordinates.y = e.data.global.y;
        this._config.unitOptions.isShooting = false;
        console.log('clicked on area out of unit', {
          mainInstanceX: this._config.instance?.x,
          mainInstanceY: this._config.instance?.y,
          currentCursorX: e.data.global.x,
          currentCursorY: e.data.global.y,
          mouseTouched,
          needWalk: this._config.needWalk,
          localBounds: this._config.instance?.getLocalBounds(),
          unitTransverseRegion,
          event: e,
          unitOptions: this._config.unitOptions,
        });
      }
    }
  };

  private jump = () => {
    if (
      this._config.shouldJump
       && this._config.instance
       && this._config.unitOptions.isStandingOnBasement
    ) {
      this._config.instance.y -= this._config.unitOptions.jumpForce;
      this._config.shouldJump = false;
      this._config.unitOptions.isStandingOnBasement = false;
    }
  };

  private handleMoveInstance = () => {
    const { instance } = this._config;
    const { unitSpeed, width, verticalSpeed } = this._config.unitOptions;
    const { x, y } = this._config.currentCursorCoordinates;
    const borderX = x - width / 2;
    console.log('handleMoveInstance', {
      borderX,
      instanceX: instance?.x,
      x,
      y,
    });
    if (instance) {
      if (instance.x <= borderX && instance.y <= y) {
        instance.x += unitSpeed;
        instance.play();
      } else if (instance.x >= borderX + unitSpeed + 2 && instance.y <= y) {
        instance.x -= unitSpeed;
        instance.play();
      } else if (instance.x >= borderX + unitSpeed + 2 && instance.y > y) {
        //jump
        this.jump();
        instance.x -= unitSpeed;
        instance.play();
      } else if (instance.x <= borderX && instance.y > y) {
        // jump
        this.jump();
        instance.x += unitSpeed;
        instance.play();
      }
      else {
        instance.stop();
        this._config.needWalk = false;
      }
    }
  };
  //TODO: перенести метод в класс Game
  private getNearestLineAndIndexByYToUnit = (): {
    foundNearestLineByY: px.Graphics | undefined;
    index: number;
  } => {
    const { instance, unitOptions, game } = this._config;
    let foundNearestLineByY: px.Graphics | undefined;
    let index: number = 0;
    if (instance && game) {
      const unitLowestPointY = instance.y + unitOptions.height;
      game.linesBasement.forEach(
        (line, idx) => {
          const diffBetweenUnitYAndLineY = line.y - unitLowestPointY;
          if (diffBetweenUnitYAndLineY <= 50) {
            foundNearestLineByY = line;
            index = idx;
          }
        },
      );
    }
    return { foundNearestLineByY, index };
  };
  //TODO: перенести метод в класс Game
  private calculateIfStandingOnBasementUnit = () => {
    const { instance, game, unitOptions } = this._config;
    const { foundNearestLineByY, index } = this.getNearestLineAndIndexByYToUnit();
    if (instance && game && foundNearestLineByY && game.lineEndsX) {
      const unitHeightByCoordinateYLocalization = instance.y + unitOptions.height;
      const isAboveThanNearestLineByY = unitHeightByCoordinateYLocalization < foundNearestLineByY.y;
      const isOutsideNearestLineByX = foundNearestLineByY.x === 0
        ? instance.x > game.lineEndsX[index] : instance.x < game.lineEndsX[index];
      {
        if (isAboveThanNearestLineByY || isOutsideNearestLineByX) {
          unitOptions.isStandingOnBasement = false;
        }
        if (!isAboveThanNearestLineByY && !isOutsideNearestLineByX) {
          unitOptions.isStandingOnBasement = true;
        }
      }

    }
  };

  private handleFalling = () => {
    const { instance, unitOptions } = this._config;
    if (instance) {
      this.calculateIfStandingOnBasementUnit();
      if (!unitOptions.isStandingOnBasement) {
        instance.y += unitOptions.fallingSpeed;
      }
    }
  };

  private animateDefault = () => {
    const { needWalk, instance, unitOptions, game, container } = this._config;
    if (game) {
      const { x, y } = this._config.currentCursorCoordinates;
      const { ball: mainGreenBall } = game?.getBalls()[0];
      this.handleFalling();
      if (needWalk && instance) {
        this._config.unitOptions.isMoving = true;
        console.log('instance', {
          instanceX: instance?.x,
          instanceY: instance?.y,
          currentCursorX: this._config.currentCursorCoordinates.x,
          currentCursorY: this._config.currentCursorCoordinates.y,
          needWalk,
        });
        if (!instance.playing) {
          this.handleMoveInstance();
        }
      }
      if (
        unitOptions.isShooting
         && container
         && unitOptions.isMain
         && unitOptions.mouseTouched
      ) {
        console.log('instance shooting');
        game.addBallChildToContainer(container);
        if (mainGreenBall.x <= x) {
          mainGreenBall.x += 2;
        } else {
          game.removeBallChildFromContainer(container);
        }
      }
      // if (game && instance && unitOptions.isShooting && container && unitOptions.isMain && !needWalk) {
      //   // balls[0].ball.x = instance.x + 1;
      //   game.addBallChildToContainer(container);
      //   if (balls[0].ball.x <= x) {
      //     balls[0].ball.x += 2;
      //   } else {
      //     game.removeBallChildFromContainer(container);
      //   }
      //   // this._config.game?.shoot(
      //   //   x,
      //   //   y,
      //   //   this._config.container,
      //   // );
      // }
    }
  };

  private animateEnemy = () => {
    const { needWalk, instance, unitOptions } = this._config;
    const { x, y } = this._config.currentCursorCoordinates;
    this.handleFalling();
    if (needWalk && instance ) {
      this._config.unitOptions.isMoving = true;
      console.log('instance', {
        instanceX: instance?.x,
        instanceY: instance?.y,
        currentCursorX: this._config.currentCursorCoordinates.x,
        currentCursorY: this._config.currentCursorCoordinates.y,
        needWalk,
      });
      if (!instance.playing) {
        this.handleMoveInstance();
      }
    }
  };

  private handleSpecificUnit = () => {
    const { spriteSheetName, instance, unitOptions, initialUnitCoordinates } = this._config;
    if (instance && !instance.destroyed && spriteSheetName === 'shipHorizontalLeft') {
      const instanceEndXCoordinate = instance.x + instance.width;
      if (instanceEndXCoordinate <= 0) {
        instance.x = 2245;
        instance.y = initialUnitCoordinates.y;
      }
      instance.play();
      instance.x -= unitOptions.unitSpeed;
      // setTimeout(() => {
      //   instance.stop();
      //   // app?.ticker.destroy();
      // }, 3000);
    }
  };

  private animateSpecific = () => {
    const { instance } = this._config;
    this.handleFalling();
    if (!instance?.playing) {
    }
  };

}