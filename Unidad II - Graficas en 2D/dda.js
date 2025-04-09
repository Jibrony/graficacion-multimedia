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
    drawLineDDA(points[0].x, points[0].y, points[1].x, points[1].y);
    drawDebugInfo();
  } else {
    text("Haz clic en dos puntos para dibujar una línea con DDA", 10, 20);
  }
}

function drawLineDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = max(abs(dx), abs(dy));
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;

  let x = x1;
  let y = y1;

  stroke(255, 0, 0);
  for (let i = 0; i <= steps; i++) {
    point(round(x), round(y));
    x += xIncrement;
    y += yIncrement;
  }

  debugInfo = `
Punto Inicial: (${round(x1)}, ${round(y1)})
Punto Final:   (${round(x2)}, ${round(y2)})
dx = ${round(dx)}, dy = ${round(dy)}
Pasos: ${steps}
Incremento X: ${xIncrement.toFixed(2)}
Incremento Y: ${yIncrement.toFixed(2)}
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
