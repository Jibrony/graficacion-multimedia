let clicks = [];
let circleReady = false;

function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(0);
}

function mousePressed() {
  if (clicks.length < 2) {
    clicks.push({ x: mouseX, y: mouseY });
  }

  if (clicks.length === 2) {
    circleReady = true;
    redraw(); // Llama a draw() una vez
  }
}

function draw() {
  if (circleReady) {
    background(255); // Limpiar fondo
    let xc = clicks[0].x;
    let yc = clicks[0].y;
    let x1 = clicks[1].x;
    let y1 = clicks[1].y;

    // Calcular el radio
    let r = int(dist(xc, yc, x1, y1));
    drawCircle(xc, yc, r);

    circleReady = false;
    clicks = []; // Reset para permitir más círculos
    noLoop(); // Detener draw hasta el siguiente clic
  }
}

function drawCircle(xc, yc, r) {
  let x = 0;
  let y = r;
  let p = 1 - r;

  for (; x <= y; x++) {
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);

    if (p < 0) {
      p = p + 2 * x + 3;
    } else {
      y--;
      p = p + 2 * (x - y) + 5;
    }
  }
}