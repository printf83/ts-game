import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy7 = new Image();
imgEnemy7.src = "./res/enemy/enemy7.png";

export class enemy7 extends baseEnemy {
	move_speed: number;

	constructor(opt: { canvas_width: number; canvas_height: number; debug?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 229;
		const sprite_height = 171;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy7,

			x: opt.canvas_width + width,
			y: opt.canvas_height - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 2,
		});

		this.move_speed = MathRandom() * 10 + 5;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x -= MathRandom() * this.move_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;

		super.update(opt);
	}
}
