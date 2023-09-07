import { ASSET } from "../asset.js";
import { MathFloor, MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy4 = new Image();
imgEnemy4.src = ASSET.enemy.enemy4;

export class enemy4 extends baseEnemy {
	new_x: number;
	new_y: number;
	last_move: number;
	interval: number;

	life_index: number;
	life_length: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		const sprite_length = 8;
		const sprite_width = 213;
		const sprite_height = 213;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy4,

			x: MathRandom() * (opt.canvas_width - width) + opt.canvas_width * 0.5,
			y: MathRandom() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			explode_in: true,
			explode_out: true,

			have_particle: true,

			point: 5,
		});

		this.new_x = MathRandom() * (opt.canvas_width - width);
		this.new_y = MathRandom() * (opt.canvas_height - height);
		this.last_move = 0;
		this.interval = MathFloor(MathRandom() * 200 + 50);

		this.life_index = 0;
		this.life_length = MathRandom() * 5000 + 5000;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		if (this.last_move % this.interval === 0) {
			this.last_move = 0;
			this.new_x = MathRandom() * (this.canvas_width - this.width);
			this.new_y = MathRandom() * (this.canvas_height - this.height);
		}

		this.last_move++;

		let dx = this.x - this.new_x;
		let dy = this.y - this.new_y;

		this.x -= dx / 20;
		this.y -= dy / 20;

		this.life_index += opt.delta_time;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(opt);
	}

	set_position(opt: { game_speed: number }) {
		super.set_position(opt);
		this.new_x -= opt.game_speed;
		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
	}
}
