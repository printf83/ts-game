import { baseEnemy } from "./base.js";

class enemy1 extends baseEnemy {
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
	}) {
		super(opt);
	}

	update(game_frame: number) {
		this.x += Math.random() * 7 - 3.5;
		this.y += Math.random() * 7 - 3.5;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const imgEnemy1 = new Image();
imgEnemy1.src = "./res/enemy1.png";

export const createEnemy1 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 293;
	const sprite_height = 155;
	const width = sprite_width / 2.5;
	const height = sprite_height / 2.5;

	return new enemy1({
		img: imgEnemy1,

		x: Math.random() * (opt.canvas_width - width),
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,

		sprite_width,
		sprite_height,
		sprite_length,

		move_speed: Math.random() * 4 - 2,
		animation_speed: Math.floor(Math.random() * 3 + 1),
	});
};
