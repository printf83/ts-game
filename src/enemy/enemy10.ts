import { baseEnemy } from "./baseEnemy.js";

const imgEnemy10 = new Image();
imgEnemy10.src = "./res/enemy/enemy10.png";

export class enemy10 extends baseEnemy {
	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 60;
		const sprite_height = 87;
		const size_modifier = Math.random() * 0.75 + 0.95;
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

	set_position(game_speed: number): void {
		this.x -= game_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;
	}
}
