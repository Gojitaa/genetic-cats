class Cat {
	constructor(index, pos, genes){
		this.id = `Cat-${index}`
    	this.acceleration = createVector()
    	this.velocity = createVector()
    	this.position = pos.copy()
		this.fitness = 0
    	this.cursor = 0
    	this.speed = .7
		this.distance = Infinity
		this.found = false

		if (genes) {
			this.genes = genes
		} else {
			this.genes = [];
			for (let i = 0; i < lifetime; i++) {
				this.genes[i] = createVector(random(-1,1), random(-1, -1))
				// this.genes[i].mult(random(this.speed, this.speed))
				// go to each direction
				this.genes[i].mult(random(-this.speed, this.speed))
			}
		}
	}

	getGenes() {
		return [...this.genes]
	}

	isFound() {
		const bugSizeHalf = 20
		if(
			this.position.x >= goal[0] - bugSizeHalf &&
			this.position.x <= goal[0] + bugSizeHalf &&
			this.position.y >= goal[1] - bugSizeHalf &&
			this.position.y <= goal[1] + bugSizeHalf
		) {
			this.found = true
		}
	}

	getDistance({ x, y }) {
		return sqrt(((x - goal[0])**2 + (y - goal[1])**2))
	}

	draw(){
		const c = color('magenta');
		fill(c);
		this.acceleration.add(this.genes[this.cursor])
		this.cursor = (this.cursor + 1) % this.genes.length
      	
		this.isFound()
		// calculate distance from the bug
		this.distance = Math.min(this.getDistance(this.position), this.distance)

		if(!this.found) {
			this.velocity.add(this.acceleration)
			this.position.add(this.velocity)
			this.acceleration.mult(0)
		}

		textSize(12)
		text(this.id, this.position.x, this.position.y - 10)
		image(catImage, this.position.x, this.position.y, 30, 30)
	}

	calculateFitness() {
		const baseFitness = Math.pow(1/this.distance, 4);
		const foundFitness = baseFitness * 100

		if(this.found) {
			return foundFitness
		}

		return baseFitness
	}

	crossover(pair) {
		const midpoint = parseInt(Math.random() * this.genes.length)
		const secondHalf = this.getGenes().splice(midpoint)
		const firstHalf = pair.getGenes().splice(0, midpoint)

		this.genes = [...firstHalf, ...secondHalf]

		return this
	}

	mutate(mutationRate) {
		for(let i = 0; i < this.genes.length; i++) {
			if(Math.random() * 1 < mutationRate) {
				this.genes[i] = createVector(random(-1,1), random(-1, 1))
			}
		}
	}
}