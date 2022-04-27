const POPULATION_SIZE = 300;
let population
let cats 
let bug
let lifetime = 120;
let cycle = 0;
let currentGeneration = 1;
let goal = [775, 250]
let bugImage
let catImage
let mutationRate = 0.0001

function preload() {
	bugImage = loadImage('../static/assets/ladybug.png')
	catImage = loadImage('../static/assets/catpaw.png')
}

function setup() {
	createCanvas(1000, 900);
	frameRate(24);

	population = new Population(POPULATION_SIZE)
	cats = population.generateCats(true)
	bug = new Bug(createVector(...goal))
}

function draw() {
	background('#fae');
	bug.draw()

	cats = population.generateCats()
	cats.forEach(cat => cat.draw())
	cycle += 1

	if(cycle === lifetime) {
		population.calculateFitness()
		population.selection()
		population.crossover()
		population.mutate(mutationRate)
		currentGeneration += 1
		cats = population.generateCats(true)
		cycle = 0
	}

	// Display some info
  	textSize(24)
	text("Generation #: " + currentGeneration, 20, 28)
	text("Lifetime: " + lifetime, 222, 28)
	text("cycles: " + cycle, 390, 28)
	text("mutationRate: " + mutationRate, 520, 28)
	text("population: " + POPULATION_SIZE, 770, 28)

	fill(0,102,153)
}