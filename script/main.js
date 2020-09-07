import { myGame } from './game.js';

const main = p => {
  const root3 = 1.732050807568877

  let cellClickedSet = new Set();

  p.setup = () => {
    // p.createCanvas(myGame.screenWidth, myGame.screenHeight);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(74);
    p.textSize(32);
    p.fill(0, 0, 0);
    p.background(255, 255, 255);
  }

  p.draw = () => {
    p.background(255, 255, 255);

    p.drawHexCells(myGame.cellX, myGame.cellY, myGame.cellLength, 80, 40);

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.drawHexCells = (x, y, length, n, m) => {
    let lengthHalfRoot3 = length * root3 / 2;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if(cellClickedSet.has(j + " " + i)) {
          p.drawHexCell(x + length * j * 1.5, y + lengthHalfRoot3 * (2 * i + (j & 1)), length, 1);
        } else {
          p.drawHexCell(x + length * j * 1.5, y + lengthHalfRoot3 * (2 * i + (j & 1)), length);
        }
      }
    }
  }

  p.drawHexCell = (x, y, length, color = 0) => {
    p.push();

    switch (color) {
      case 1:
        p.fill(255,240,240);
        break;
      default:
        p.noFill();
        break;
    }

    p.beginShape();
    p.vertex(x, y);
    p.vertex(x + length, y);
    p.vertex(x + length * 1.5, y + length * root3 / 2);
    p.vertex(x + length, y + length * root3);
    p.vertex(x, y + length * root3);
    p.vertex(x - length * 0.5, y + length * root3 / 2);
    p.endShape(p.CLOSE);
    p.pop();
  }

  p.mouseWheel = (e) => {
    if(e.deltaY < 0)
      myGame.cellLength *= 1.1;
    else
      myGame.cellLength /= 1.1;
  }

  p.mouseDragged = (e) => {
    let lengthHalfRoot3 = myGame.cellLength * root3 / 2;

    let x = e.clientX, y = e.clientY;
    let n = p.floor((x - myGame.cellX + myGame.cellLength*0.25) / (myGame.cellLength * 1.5));
    let m;
    if(n&1){
      m = p.floor((y - myGame.cellY - lengthHalfRoot3) / (2 * lengthHalfRoot3));
    } else {
      m = p.floor((y - myGame.cellY) / (2 * lengthHalfRoot3));
    }
    cellClickedSet.add(n + " " + m);
  }
}




let myp5;

window.onload = () => { myp5 = new p5(main, 'body'); }
