import { baseEnemy } from "./base.js";

class enemy7 extends baseEnemy {
	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		game_speed: number;
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

const imgEnemy7 = new Image();
imgEnemy7.src = "./res/enemy7.png";

export const createEnemy7 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 229;
	const sprite_height = 171;
	const width = sprite_width / 2.5;
	const height = sprite_height / 2.5;

	return new enemy7({
		img: imgEnemy7,

		x: Math.random() * (opt.canvas_width - width),
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		sprite_width,
		sprite_height,
		sprite_length,

		game_speed: Math.random() * 4 - 2,
		animation_speed: Math.floor(Math.random() * 3 + 1),
	});
};
