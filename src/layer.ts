import { MathFloor } from "./util.js";

export class layer {
	ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

	img: HTMLImageElement;
	img_oscanvas: OffscreenCanvas;
	img_osctx: OffscreenCanvasRenderingContext2D;

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
		ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
		img: HTMLImageElement;
		img_width: number;
		img_height: number;
		canvas_height: number;
		speed_modifier: number;
	}) {
		this.img = opt.img;

		this.ctx = opt.ctx;

		this.x = 0;
		this.y = 0;
		this.width = opt.img_width;
		this.height = opt.img_height;
		this.canvas_height = opt.canvas_height;

		this.ratio = this.width / this.height;
		this.canvas_width = this.canvas_height * this.ratio;

		this.img_oscanvas = new OffscreenCanvas(this.canvas_width, this.canvas_height);
		this.img_osctx = this.img_oscanvas.getContext("2d")!;
		this.img_osctx.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			0,
			0,
			this.canvas_width,
			this.canvas_height
		);

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
		if (this.x < 0 - this.canvas_width) this.x = 0;
		this.x2 = this.x + this.canvas_width - game_speed - 1;
		// this.x -= game_speed * this.speed_modifier;
		// if (this.x < 0 - this.width) this.x = 0;
		// this.x2 = this.x + this.width - game_speed - 1;
	}
	draw() {
		this.ctx.drawImage(this.img_oscanvas, MathFloor(this.x), MathFloor(this.y));
		this.ctx.drawImage(this.img_oscanvas, MathFloor(this.x2), MathFloor(this.y));
		// this.ctx.drawImage(this.img, MathFloor(this.x), MathFloor(this.y), this.width, this.height);
		// this.ctx.drawImage(
		// 	this.img,
		// 	MathFloor(this.x2),
		// 	MathFloor(this.y),
		// 	this.width,
		// 	this.height
		// );
	}
}
