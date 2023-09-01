import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy8 = new Image();
imgEnemy8.src = "./res/enemy/enemy8.png";

export class enemy8 extends baseEnemy {
	destination_y: number;
	speed: number;

	string_x: number;
	string_y: number;

	constructor(opt: { canvas_width: number; canvas_height: number; debug?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 310;
		const sprite_height = 175;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy8,

			x: opt.canvas_width + width,
			y: MathRandom() > 0.5 ? MathRandom() * (opt.canvas_height - height) : 0 - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 3,
		});

		this.destination_y = MathRandom() * ((opt.canvas_height - this.height) * 0.8);
		this.speed = MathRandom() * 2 - 4;
		if (this.y < this.destination_y) {
			this.speed *= -1;
		}

		this.string_x = this.x + this.width * 0.5;
		this.string_y = this.y + 10;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.y += this.speed;
		this.string_y = this.y + 10;
		this.string_x = this.x + this.width * 0.5;

		if (this.y > this.destination_y && this.speed > 0) {
			this.speed *= -1;
		}

		if (this.y < 0 - this.height - 5) {
			this.mark_delete = true;
		}

		super.update(opt);
	}

	draw(opt: { ctx: CanvasRenderingContext2D; ctx_collision?: CanvasRenderingContext2D }): void {
		opt.ctx.beginPath();
		opt.ctx.moveTo(this.string_x, 0);
		opt.ctx.lineTo(this.string_x, this.string_y);
		opt.ctx.stroke();
		super.draw(opt);
	}
	set_position(opt: { game_speed: number }) {
		super.set_position(opt);
		this.string_x = this.x + this.width * 0.5;
		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
	}
}
