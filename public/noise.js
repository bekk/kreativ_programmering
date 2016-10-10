let xRes = window.innerWidth - 50;
let yRes = window.innerHeight - 50;
// let xRes = 500 - 50;
// let yRes = 500 - 50;

let run = false;

function setup() {
	createCanvas(
		xRes,
		yRes
	);
	pixelDensity(1.0);
	background(10);
	render();
}

function draw () {

}

function render(){
	let xoff = 0;

	for (let x = 0; x < xRes; x += 1){
		let yoff = Math.floor(random(0,10));
		for (let y = 0; y < yRes; y += 1){

			const bright = map(noise(xoff, yoff),0,1,0,255);
			set(x, y, color(bright));
			yoff += 0.05;
		}
		xoff += 0.01;
	}
	console.log('Ferdig!');
	updatePixels();
}


function mapToMatrix(x, y) {
	let pos = x * yRes + y;
	return pos;
}
