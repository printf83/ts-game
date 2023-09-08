import { ASSET } from "../asset.js";
import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy5 = new Image();
imgEnemy5.src = ASSET.enemy.enemy5;

export class enemy5 extends baseEnemy {
	direction_x: number;
	direction_y: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		const sprite_length = 5;
		const sprite_width = 271;
		const sprite_height = 194;

		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy5,

			x: opt.canvas_width,
			y: MathRandom() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			have_particle: true,

			point: 3,
		});

		this.direction_x = MathRandom() * 3 + 1.5;
		this.direction_y = MathRandom() * 5 - 2.5;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x -= this.direction_x;
		this.y -= this.direction_y;

		if (this.x < 0 - this.width) this.mark_delete = true;
		if (this.y < 0 || this.y > this.canvas_height - this.height) {
			this.direction_y = this.direction_y * -1;
		}

		super.update(opt);
	}
}
