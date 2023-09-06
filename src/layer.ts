import { MathFloor } from "./util.js";

export class layer {
	ctx: CanvasRenderingContext2D;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;
	ratio: number;
	canvas_width: number;
	canvas_height: number;

	x2: number;

	speed_modifier: number;
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		img: HTMLImageElement;
		width: number;
		height: number;
		canvas_height: number;
		speed_modifier: number;
	}) {
		this.img = opt.img;

		this.ctx = opt.ctx;

		this.x = 0;
		this.y = 0;
		this.width = opt.width;
		this.height = opt.height;
		this.canvas_height = opt.canvas_height;

		this.ratio = this.width / this.height;
		this.canvas_width = this.canvas_height * this.ratio;

		// console.log(`Width: ${this.width}
		// Height: ${this.height}
		// Ratio (W/H): ${this.ratio}
		// Canvas Height: ${opt.canvas_height}
		// Canvas Width: ${this.canvas_width}`);

		this.speed_modifier = opt.speed_modifier;

		this.x2 = this.x + this.width;
	}

	update(game_speed: number) {
		this.x -= game_speed * this.speed_modifier;
		if (this.x < 0 - this.width) this.x = 0;
		this.x2 = this.x + this.width - game_speed - 1;
	}
	draw() {
		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			MathFloor(this.x),
			MathFloor(this.y),
			this.canvas_width,
			this.canvas_height
		);
		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			MathFloor(this.x2),
			MathFloor(this.y),
			this.canvas_width,
			this.canvas_height
		);
	}
}
