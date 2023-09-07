import { ASSET } from "../asset.js";
import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy6 = new Image();
imgEnemy6.src = ASSET.enemy.enemy6;

export class enemy6 extends baseEnemy {
	speed: number;
	angle: number;
	curve: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		const sprite_length = 5;
		const sprite_width = 261;
		const sprite_height = 209;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy6,

			x: opt.canvas_width,
			y: MathRandom() * opt.canvas_height * 0.5,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 4,
		});

		this.speed = MathRandom() * 2 + 2;
		this.angle = 0;
		this.curve = MathRandom() * 3;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x -= this.speed;
		this.y += Math.sin(this.angle) * this.curve;
		this.angle += 0.04;

		if (this.x < 0 - this.width) this.mark_delete = true;

		super.update(opt);
	}

	draw(): void {
		this.ctx.save();
		this.ctx.globalAlpha = 0.5;
		super.draw();
		this.ctx.restore();
	}
}
