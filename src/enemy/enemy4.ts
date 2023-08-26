import { baseEnemy } from "./base.js";

const imgEnemy4 = new Image();
imgEnemy4.src = "./res/enemy4.png";

export class enemy4 extends baseEnemy {
	new_x: number;
	new_y: number;
	last_move: number;
	interval: number;

	life_index: number;
	life_length: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 8;
		const sprite_width = 213;
		const sprite_height = 213;
		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy4,

			x: Math.random() * (opt.canvas_width - width),
			y: Math.random() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			explode_in: true,
			explode_out: true,

			have_particle: true,
		});

		this.new_x = Math.random() * (opt.canvas_width - width);
		this.new_y = Math.random() * (opt.canvas_height - height);
		this.last_move = 0;
		this.interval = Math.floor(Math.random() * 200 + 50);

		this.life_index = 0;
		this.life_length = Math.random() * 5000 + 5000;
	}

	update(delta_time: number, onframechange?: () => void) {
		if (this.last_move % this.interval === 0) {
			this.last_move = 0;
			this.new_x = Math.random() * (this.canvas_width - this.width);
			this.new_y = Math.random() * (this.canvas_height - this.height);
		}

		this.last_move++;

		let dx = this.x - this.new_x;
		let dy = this.y - this.new_y;

		this.x -= dx / 20;
		this.y -= dy / 20;

		this.life_index += delta_time;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}

	set_position(game_speed: number): void {
		this.x -= game_speed;
		this.new_x -= game_speed;
	}
}
