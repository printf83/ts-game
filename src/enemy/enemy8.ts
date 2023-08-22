import { baseEnemy } from "./base.js";

const imgEnemy8 = new Image();
imgEnemy8.src = "./res/enemy8.png";

export class enemy8 extends baseEnemy {
	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 310;
		const sprite_height = 175;
		const size_modifier = Math.random() * 0.1 + 0.4;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy8,

			x: Math.random() * (opt.canvas_width - width),
			y: Math.random() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,
		});
	}

	update(timestamp: number) {
		this.x += Math.random() * 7 - 3.5;
		this.y += Math.random() * 7 - 3.5;

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}
