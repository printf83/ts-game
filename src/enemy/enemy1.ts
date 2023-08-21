import { baseEnemy } from "./base.js";

class enemy1 extends baseEnemy {
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

		life_length: number;
	}) {
		super(opt);

		this.life_index = 0;
		this.life_length = opt.life_length;
	}

	update(timestamp: number) {
		this.x += Math.random() * 7 - 3.5;
		this.y += Math.random() * 7 - 3.5;

		this.life_index += timestamp;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(timestamp);
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
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

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

		life_length: Math.random() * 5000 + 5000,
	});
};
