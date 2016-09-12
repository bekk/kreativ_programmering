let xRes = window.innerWidth;
let yRes = window.innerHeight;

const dt = 0.003;
const c = 1.0;
const step = 10.0;

let center = mapToMatrix(Math.round(xRes/2), Math.round(yRes/2));

let field = [];
field.length = xRes*yRes;
let fieldOld = [];
let backup = [];
let laplacian = [];

let dx = step / xRes;
let dy = step / yRes;

let time = 0;

function setup() {
	createCanvas(
		xRes,
		yRes
	);
	pixelDensity(1.0);
	background(0);
	frameRate(60);

	for (let x = 0; x < xRes; x++){
		for (let y = 0; y < yRes; y++){
			field[mapToMatrix(x,y)] = 0;
			fieldOld[mapToMatrix(x,y)] = 0;
			backup[mapToMatrix(x,y)] = 0;
			laplacian[mapToMatrix(x,y)] = 0;
		}
	}
	field[mapToMatrix(step,step)] = 1;
}

function draw () {
  background(0);

	if (millis() - time > 3000){
		field[mapToMatrix(step,step)] = 1;
		console.log("GO!")
		time = millis();
	}

	for (let x = step; x < xRes-step; x = x + step){
		for (let y = step; y < yRes-step; y = y + step){
			laplacian[mapToMatrix(x,y)] = (-4) * field[mapToMatrix(x,y)] + field[mapToMatrix(x - step ,y)] + field[mapToMatrix(x + step,y)] + field[mapToMatrix(x,y - step)] + field[mapToMatrix(x,y + step)];
		}
	}

	loadPixels();
	let d = pixelDensity();

	for (let x = step; x < xRes - step; x = x + step){
		for (let y = step; y < yRes - step; y = y + step){
			backup[mapToMatrix(x,y)] = field[mapToMatrix(x,y)];
			field[mapToMatrix(x,y)] = dt * dt / (dx * dx) * c * laplacian[mapToMatrix(x,y)] + 2 * field[mapToMatrix(x,y)];
			field[mapToMatrix(x,y)] = field[mapToMatrix(x,y)] - fieldOld[mapToMatrix(x,y)];
			fieldOld[mapToMatrix(x,y)] = backup[mapToMatrix(x,y)];

			let brightness = map(field[mapToMatrix(x,y)], -0.05, 0.1 , 0, 255);

			if (brightness > 120) {
				brightness = 255;
			}
			else if (brightness < 50){
				brightness = 0;
			}
			let col = color(brightness);

			set (x, y, col);
			// set (x - 1, y + 1, col);
			set (x - 1, y, col);
			// set (x - 1, y - 1, col);
			// set (x + 1, y + 1, col);
			set (x + 1, y, col);
			// set (x + 1, y - 1, col);
			set (x, y - 1, col);
			set (x, y + 1, col);

		}
	}

	console.log("FPS: " + frameRate());

	updatePixels();

}

function mapToMatrix(x, y) {
	let pos = x * yRes + y;
	return pos;
}
