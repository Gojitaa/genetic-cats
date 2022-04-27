class Population {
	constructor(num){
		this.population = Array(num).fill(0)
		this.normalizedFitnesses = Array(num).fill(0);
		this.selectionPool = []
	}

	generateCats(start) {
		if(start) {
			for(let i = 0; i < this.population.length; i++) {
				this.population[i] = new Cat(i, createVector(50, 580), this.population[i].getGenes?.())
			}
			return this.population
		}

		return this.population
	}

	calculateFitness() {
		const catsFitness = this.population.map(cat => cat.calculateFitness(goal))
		const sum = catsFitness.reduce((total, fitness) => total + fitness, 0)
		this.normalizedFitnesses = this.normalizedFitnesses.map((_, index) => catsFitness[index] / sum)
	}

	selection() {
		this.selectionPool = []
		const N = 100; // number of items in the pool, the higher the % the higher the amount

		for(let i = 0; i < this.population.length; i++) {
			const amount = Math.ceil(this.normalizedFitnesses[i] * N);
			for(let j = 0; j < amount; j++) {
				this.selectionPool.push(this.population[i])
			}
		}
	}

	crossover() {
		this.population = this.population.map((_, index) => {
			const mom = this.selectionPool[parseInt(Math.random() * this.selectionPool.length)]
			const dad = this.selectionPool[parseInt(Math.random() * this.selectionPool.length)]
			const child = mom.crossover(dad, index)
			return child
		})
	}

	mutate(mutationRate) {
		this.population.forEach(cat => cat.mutate(mutationRate))
	}
}