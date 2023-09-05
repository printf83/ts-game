import { ASSET } from "../asset.js";
import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy10 = new Image();
imgEnemy10.src = ASSET.enemy.enemy10;

export class enemy10 extends baseEnemy {
	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; debug?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 60;
		const sprite_height = 87;
		const size_modifier = MathRandom() * 0.75 + 0.95;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy10,

			x: opt.canvas_width + width,
			y: opt.canvas_height - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 1,
		});
	}
}
