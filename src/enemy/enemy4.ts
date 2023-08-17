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

		game_speed: number;
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

export const setupEnemy4 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy4({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				canvas_width: opt.canvas_width,
				canvas_height: opt.canvas_height,
				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 + 1,
				animation_speed: Math.floor(Math.random() * 3 + 1),

				newX: Math.random() * (opt.canvas_width - width),
				newY: Math.random() * (opt.canvas_height - height),
				interval: Math.floor(Math.random() * 200 + 50),
			});
		});
};
