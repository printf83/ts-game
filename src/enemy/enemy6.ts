import { baseEnemy } from "./base.js";

const imgEnemy6 = new Image();
imgEnemy6.src = "./res/enemy6.png";

export class enemy6 extends baseEnemy {
	direction_x: number;
	direction_y: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 261;
		const sprite_height = 209;
		const size_modifier = Math.random() * 0.1 + 0.4;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy6,

			x: opt.canvas_width,
			y: Math.random() * ((opt.canvas_height - height) * 0.2),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,
		});

		this.direction_x = Math.random() * 2 + 2;
		this.direction_y = Math.random() * 2 - 2;
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

