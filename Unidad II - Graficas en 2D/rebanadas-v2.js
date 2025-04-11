let inputSlices, inputRadius, button;
let slices = 0;
let radius = 100;

function setup() {
  createCanvas(1000, 450);
  textSize(16);

  // Texto y campos de entrada
  createP('Rebanadas').position(20, 0);
  inputSlices = createInput('0');
  inputSlices.position(20, 40);
  inputSlices.size(50);
  inputSlices.style('height', '32px');

  createP('Radio círculo').position(100, 0);
  inputRadius = createInput('100');
  inputRadius.position(100, 40);
  inputRadius.size(50);
  inputRadius.style('height', '32px');

  button = createButton('Calcular');
  button.position(inputRadius.x + inputRadius.width + 10, 40);
  button.style('height', '32px');
  button.style('background-color', '#4CAF50');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('padding', '0 12px');
  button.style('border-radius', '4px');
  button.mousePressed(updateValues);

  noLoop();
}

function updateValues() {
  let valSlices = int(inputSlices.value());
  let valRadius = int(inputRadius.value());

  if (valSlices >= 0 && valRadius > 0) {
    slices = valSlices;
    radius = valRadius;
    redraw();
  }
}

function draw() {
  background(255);

  text("Punto-Pendiente", 80, 120);
  text("DDA", 360, 120);
  text("Bresenham", 620, 120);

  drawPizza(150, 250, radius, slices, drawLinePuntoPendiente);
  drawPizza(400, 250, radius, slices, drawLineDDA);
  drawPizza(650, 250, radius, slices, drawLineBresenham);
}

function drawPizza(cx, cy, r, num, lineFunc) {
  ellipse(cx, cy, r * 2, r * 2); // Se usa el radio personalizado
  if (num <= 0) return;

  for (let i = 0; i < num; i++) {
    let angle = TWO_PI * i / num;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    lineFunc(cx, cy, x, y);
  }
}

// --- Algoritmo Punto-Pendiente
function drawLinePuntoPendiente(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let m = dy / dx;
  if (abs(dx) > abs(dy)) {
    let step = dx > 0 ? 1 : -1;
    for (let x = x1; x != int(x2); x += step) {
      let y = y1 + m * (x - x1);
      point(x, y);
    }
  } else {
    let step = dy > 0 ? 1 : -1;
    for (let y = y1; y != int(y2); y += step) {
      let x = x1 + (y - y1) / m;
      point(x, y);
    }
  }
}

// --- Algoritmo DDA
function drawLineDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = max(abs(dx), abs(dy));
  let xInc = dx / steps;
  let yInc = dy / steps;
  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    point(round(x), round(y));
    x += xInc;
    y += yInc;
  }
}

// --- Algoritmo Bresenham
function drawLineBresenham(x1, y1, x2, y2) {
  let x = int(x1);
  let y = int(y1);
  let xEnd = int(x2);
  let yEnd = int(y2);
  let dx = abs(xEnd - x);
  let dy = abs(yEnd - y);
  let sx = x < xEnd ? 1 : -1;
  let sy = y < yEnd ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x, y);
    if (x === xEnd && y === yEnd) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}
