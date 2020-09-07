class Game {

  machineRegistered = [];
  cellLength = 20;
  cellX = 40;
  cellY = 20;

  dollars = 0;
  votes = 10;

  constructor() {

  }

  nextTick() {
    for (let machine of machineRegistered) {
      machine.tick();
    }
  }

}

const myGame = new Game();

export { myGame };
