let x1, y1, x2, y2;
let clickCount = 0;

function setup() {
  createCanvas(400, 400);
  background('white');
}

function draw() {
  if (clickCount === 2) {
    stroke(0);
    strokeWeight(1);
    drawExtendedLine(x1, y1, x2, y2);
  }
  
  fill(255, 0, 0);
  noStroke();
  if (clickCount > 0) {
    ellipse(x1, y1, 8, 8);
  }
  if (clickCount > 1) {
    ellipse(x2, y2, 8, 8);
  }
}

function mousePressed() {
  if (clickCount === 0) {
    x1 = mouseX;
    y1 = mouseY;
    clickCount = 1;
  } else if (clickCount === 1) {
    x2 = mouseX;
    y2 = mouseY;
    clickCount = 2;
  } else {
    clickCount = 0;
    background('white');
  }
}

function drawExtendedLine(x1, y1, x2, y2) {
  let m = (y2 - y1) / (x2 - x1);
  let b = y1 - m * x1;
  
  let xStart = 0;
  let yStart = m * xStart + b;
  let xEnd = width;
  let yEnd = m * xEnd + b;
  
  stroke(0);
  line(xStart, yStart, xEnd, yEnd);
}