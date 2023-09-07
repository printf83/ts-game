import { ASSET } from "../asset.js";
import { MathFloor, MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy11 = new Image();
imgEnemy11.src = ASSET.enemy.enemy11;

export class enemy11 extends baseEnemy {
	destination_y: number;
	speed: number;

	string_x: number;
	string_y: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		const sprite_length = 5;
		const sprite_width = 120;
		const sprite_height = 144;
		const size_modifier = MathRandom() * 0.5 + 0.7;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy11,

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
		this.string_y = this.y + 50;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.y += this.speed;
		this.string_y = this.y + 50;
		this.string_x = this.x + this.width * 0.5;

		if (this.y > this.destination_y && this.speed > 0) {
			this.speed *= -1;
		}

		if (this.y < 0 - this.height - 5) {
			this.mark_delete = true;
		}

		super.update(opt);
	}

	draw(): void {
		this.ctx.beginPath();
		this.ctx.moveTo(MathFloor(this.string_x), 0);
		this.ctx.lineTo(MathFloor(this.string_x), MathFloor(this.string_y));
		this.ctx.stroke();
		super.draw();
	}
	set_position(opt: { game_speed: number }) {
		super.set_position(opt);
		this.string_x = this.x + this.width * 0.5;
		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
	}
}
