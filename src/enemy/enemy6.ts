import { baseEnemy } from "./base.js";

const imgEnemy6 = new Image();
imgEnemy6.src = "./res/enemy6.png";

export class enemy6 extends baseEnemy {
	speed: number;
	angle: number;
	curve: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 261;
		const sprite_height = 209;
		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy6,

			x: opt.canvas_width,
			y: Math.random() * opt.canvas_height * 0.5,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,
		});

		this.speed = Math.random() * 2 + 2;
		this.angle = 0;
		this.curve = Math.random() * 3;
	}

	update(delta_time: number, onframechange?: () => void) {
		this.x -= this.speed;
		this.y += Math.sin(this.angle) * this.curve;
		this.angle += 0.04;

		if (this.x < 0 - this.width) this.mark_delete = true;

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.globalAlpha = 0.5;
		super.draw(ctx);
		ctx.restore();
	}
}
