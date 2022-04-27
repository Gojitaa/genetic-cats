class Bug{
	constructor(pos) {
		this.pos = pos 
	}

	draw() {
		let c = color(50, 55, 100);
		fill(c);
		image(bugImage, this.pos.x, this.pos.y, 50, 50)
	}
}