const xRes = window.innerWidth - 50;
const yRes = window.innerHeight - 50;

let particles = [];

function setup() {
	createCanvas(xRes, yRes);
	v = createVector(500, 500);
	background(20, 100, 20);

	for(let i = 0; i < 100; i += 1){
		let p = new Particle;
		p.setup(i);
		particles.push(p);
	}

}

function draw () {
	background(20, 100, 20);

	for(let i = 0; i < particles.length; i += 1){
		let p = particles[i];
		p.walk();
		p.display();
		particles[i] = p;
	}

}

function Particle (){

	this.setup = function(i){
		this.pos = createVector(random(0, xRes), random(0, yRes));
		this.t = createVector(i, i*i + 1000);
	}

	this.walk = function(){
		this.t.x += 0.001;
		this.t.y += 0.003;
		this.pos.x = map(noise(this.t.x), 0, 1, 0, xRes);
		this.pos.y = map(noise(this.t.y), 0, 1, 0, yRes);

	}

	this.display = function (){
		stroke(255, 200, 40, 50);
		fill(255, 100, 20, 70);
		ellipse(this.pos.x, this.pos.y, 40, 40);
	}
}
