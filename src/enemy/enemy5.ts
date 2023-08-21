import { baseEnemy } from "./base.js";

export class enemy5 extends baseEnemy {
	directionX: number;
	directionY: number;

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

		directionX: number;
		directionY: number;
	}) {
		super(opt);

		this.directionX = opt.directionX;
		this.directionY = opt.directionY;
	}

	update(timestamp: number) {
		this.x -= this.directionX;
		this.y -= this.directionY;

		if (this.x < 0 - this.width) this.mark_delete = true;
		if (this.y < 0 || this.y > this.canvas_height - this.height) {
			this.directionY = this.directionY * -1;
		}

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D, ctx_collision: CanvasRenderingContext2D) {
		super.draw(ctx, ctx_collision);
	}
}

const imgEnemy5 = new Image();
imgEnemy5.src = "./res/enemy5.png";

export const createEnemy5 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 271;
	const sprite_height = 194;

	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

	return new enemy5({
		img: imgEnemy5,

		x: opt.canvas_width,
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,

		sprite_width,
		sprite_height,
		sprite_length,

		directionX: Math.random() * 5 + 3,
		directionY: Math.random() * 5 - 2.5,
	});
};
