import { baseEnemy } from "./base.js";

const imgEnemy5 = new Image();
imgEnemy5.src = "./res/enemy/enemy5.png";

export class enemy5 extends baseEnemy {
	direction_x: number;
	direction_y: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 271;
		const sprite_height = 194;

		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy5,

			x: opt.canvas_width,
			y: Math.random() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			have_particle: true,

			point: 3,
		});

		this.direction_x = Math.random() * 3 + 1.5;
		this.direction_y = Math.random() * 5 - 2.5;
	}

	update(delta_time: number, onframechange?: () => void) {
		this.x -= this.direction_x;
		this.y -= this.direction_y;

		if (this.x < 0 - this.width) this.mark_delete = true;
		if (this.y < 0 || this.y > this.canvas_height - this.height) {
			this.direction_y = this.direction_y * -1;
		}

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}

	set_position(game_speed: number): void {
		this.x -= game_speed;
	}
}
