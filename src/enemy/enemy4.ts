import { baseEnemy } from "./base.js";

class enemy4 extends baseEnemy {
	newX: number;
	newY: number;
	interval: number;

	life_index: number;
	life_length: number;

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

		life_length: number;
	}) {
		super(opt);

		this.newX = opt.newX;
		this.newY = opt.newY;
		this.interval = opt.interval;

		this.life_index = 0;
		this.life_length = opt.life_length;
	}

	update(timestamp: number) {
		if (timestamp % this.interval === 0) {
			this.newX = Math.random() * (this.canvas_width - this.width);
			this.newY = Math.random() * (this.canvas_height - this.height);
		}

		let dx = this.x - this.newX;
		let dy = this.y - this.newY;

		this.x -= dx / 20;
		this.y -= dy / 20;

		this.life_index += timestamp;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(timestamp);
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
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

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
		animation_speed: Math.random() * 50 + 25,
		newX: Math.random() * (opt.canvas_width - width),
		newY: Math.random() * (opt.canvas_height - height),
		interval: Math.floor(Math.random() * 200 + 50),

		life_length: Math.random() * 10000 - 5000,
	});
};
