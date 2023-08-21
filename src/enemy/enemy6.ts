import { baseEnemy } from "./base.js";

class enemy6 extends baseEnemy {
	direction_x: number;
	direction_y: number;

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

		direction_x: number;
		direction_y: number;
	}) {
		super(opt);

		this.direction_x = opt.direction_x;
		this.direction_y = opt.direction_y;
	}

	update(timestamp: number) {
		this.x -= this.direction_x;
		this.y -= this.direction_y;

		if (this.x < 0 - this.width) this.mark_delete = true;

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.globalAlpha = 0.5;
		super.draw(ctx);
		ctx.restore();
	}
}

const imgEnemy6 = new Image();
imgEnemy6.src = "./res/enemy6.png";

export const createEnemy6 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 261;
	const sprite_height = 209;
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

	return new enemy6({
		img: imgEnemy6,

		x: opt.canvas_width,
		y: Math.random() * ((opt.canvas_height - height) * 0.2),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,

		sprite_width,
		sprite_height,
		sprite_length,

		direction_x: Math.random() * 2 + 2,
		direction_y: Math.random() * 2 - 2,
	});
};
