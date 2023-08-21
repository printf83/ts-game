import { baseEnemy } from "./base.js";

class enemy7 extends baseEnemy {
	move_speed: number;

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
	}) {
		super(opt);

		this.move_speed = opt.move_speed;
	}

	update(timestamp: number) {
		this.x -= Math.random() * this.move_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;

		super.update(timestamp);
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
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

	return new enemy7({
		img: imgEnemy7,

		x: opt.canvas_width + width,
		y: opt.canvas_height - height,
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,

		sprite_width,
		sprite_height,
		sprite_length,

		move_speed: Math.random() * 10,
	});
};
