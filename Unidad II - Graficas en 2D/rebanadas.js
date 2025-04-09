let input, button, label;
let slices = 0;

function setup() {
  createCanvas(800, 450);
  textSize(16);

  label = createP('Carballo Caballero Jesús Alberto / Gutierrez Arce Andrey Julian');
  label.position(20, 400); 

  label = createP('Ingrese el número de rebanadas:');
  label.position(20, 0); 

  input = createInput('0');
  input.position(20, 60);
  input.size(50);
  input.style('height', '24px'); 

  button = createButton('Calcular');
  button.position(input.x + input.width + 10, 60);
  button.style('height', '30px'); 
  button.style('background-color', '#4CAF50');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('padding', '0 12px');
  button.style('border-radius', '4px');
  button.mousePressed(updateSlices);


  noLoop();
}

function updateSlices() {
  let val = int(input.value());
  if (val >= 0) {
    slices = val;
    redraw();
  }
}

function draw() {
  background(255);

  text("Punto-Pendiente", 80, 120);
  text("DDA", 360, 120);
  text("Bresenham", 620, 120);

  drawPizza(150, 250, 100, slices, drawLinePuntoPendiente);
  drawPizza(400, 250, 100, slices, drawLineDDA);
  drawPizza(650, 250, 100, slices, drawLineBresenham);
}

function drawPizza(cx, cy, r, num, lineFunc) {
  ellipse(cx, cy, r * 2, r * 2);
  if (num <= 0) return;

  for (let i = 0; i < num; i++) {
    let angle = TWO_PI * i / num;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    lineFunc(cx, cy, x, y);
  }
}

// Algoritmo Punto-Pendiente
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

// Algoritmo DDA
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

// Algoritmo Bresenham
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
