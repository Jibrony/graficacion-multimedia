let points = [];
let debugInfo = "";

function setup() {
  createCanvas(600, 400);
  background(255);
  textSize(14);
  fill(0);
  noLoop();
}

function mousePressed() {
  if (points.length < 2) {
    points.push(createVector(mouseX, mouseY));
    redraw();
  } else {
    points = [createVector(mouseX, mouseY)];
    background(255);
    debugInfo = "";
    redraw();
  }
}

function draw() {
  background(255);
  fill(0);
  stroke(0);

  // Dibujar puntos clickeados
  for (let pt of points) {
    ellipse(pt.x, pt.y, 8, 8);
  }

  if (points.length === 2) {
    drawLineBresenham(points[0].x, points[0].y, points[1].x, points[1].y);
    drawDebugInfo();
  } else {
    text("Haz clic en dos puntos para dibujar una línea con Bresenham", 10, 20);
  }
}

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

  stroke(0, 0, 255);

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

  debugInfo = `
Punto Inicial: (${int(x1)}, ${int(y1)})
Punto Final:   (${int(x2)}, ${int(y2)})
dx = ${dx}, dy = ${dy}
sx = ${sx}, sy = ${sy}
Error inicial = ${dx - dy}
  `;
}

function drawDebugInfo() {
  fill(0);
  noStroke();
  let lines = debugInfo.trim().split("\n");
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], 10, 30 + i * 20);
  }
}
