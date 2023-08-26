import { baseEnemy } from "./base.js";

const imgEnemy1 = new Image();
imgEnemy1.src = "./res/enemy1.png";

export class enemy1 extends baseEnemy {
	life_index: number;
	life_length: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 293;
		const sprite_height = 155;
		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,
			img: imgEnemy1,

			x: Math.random() * (opt.canvas_width - width),
			y: Math.random() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			explode_in: true,
			explode_out: true,
		});

		this.life_index = 0;
		this.life_length = Math.random() * 5000 + 5000;
	}

	update(delta_time: number, onframechange?: () => void) {
		this.x += Math.random() * 7 - 3.5;
		this.y += Math.random() * 7 - 3.5;

		this.life_index += delta_time;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}

	set_position(game_speed: number): void {
		this.x -= game_speed;
	}
}
