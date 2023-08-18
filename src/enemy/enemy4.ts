import { baseEnemy } from "./base.js";

class enemy4 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

	newX: number;
	newY: number;
	interval: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		canvas_width: number;
		canvas_height: number;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		move_speed: number;
		animation_speed: number;

		newX: number;
		newY: number;
		interval: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.newX = opt.newX;
		this.newY = opt.newY;
		this.interval = opt.interval;
	}

	update(game_frame: number) {
		if (game_frame % this.interval === 0) {
			this.newX = Math.random() * (this.canvas_width - this.width);
			this.newY = Math.random() * (this.canvas_height - this.height);
		}

		let dx = this.x - this.newX;
		let dy = this.y - this.newY;

		this.x -= dx / 20;
		this.y -= dy / 20;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const imgEnemy4 = new Image();
imgEnemy4.src = "./res/enemy4.png";

export const createEnemy4 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 8;
	const sprite_width = 213;
	const sprite_height = 213;
	const width = sprite_width / 2.5;
	const height = sprite_height / 2.5;

	return new enemy4({
		img: imgEnemy4,

		x: Math.random() * (opt.canvas_width - width),
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
		sprite_width,
		sprite_height,
		sprite_length,

		move_speed: Math.random() * 4 + 1,
		animation_speed: Math.floor(Math.random() * 3 + 1),

		newX: Math.random() * (opt.canvas_width - width),
		newY: Math.random() * (opt.canvas_height - height),
		interval: Math.floor(Math.random() * 200 + 50),
	});
};
