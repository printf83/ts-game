import { ASSET } from "../asset.js";
import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy1 = new Image();
imgEnemy1.src = ASSET.enemy.enemy1;

export class enemy1 extends baseEnemy {
	life_index: number;
	life_length: number;

	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; debug?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 293;
		const sprite_height = 155;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,
			img: imgEnemy1,

			x: MathRandom() * (opt.canvas_width - width) + opt.canvas_width * 0.5,
			y: MathRandom() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			explode_in: true,
			explode_out: true,

			point: 4,
		});

		this.life_index = 0;
		this.life_length = MathRandom() * 5000 + 5000;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x += MathRandom() * 7 - 3.5;
		this.y += MathRandom() * 7 - 3.5;

		this.life_index += opt.delta_time;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(opt);
	}
}
