import { MathRandom } from "../util.js";
import { baseEnemy } from "./baseEnemy.js";

const imgEnemy2 = new Image();
imgEnemy2.src = "./res/enemy/enemy2.png";

export class enemy2 extends baseEnemy {
	move_speed: number;
	angle: number;
	angle_speed: number;
	curve: number;

	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; debug?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 266;
		const sprite_height = 188;
		const size_modifier = MathRandom() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,
			img: imgEnemy2,

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

		this.move_speed = MathRandom() * 4 + 1;
		this.angle = MathRandom() * 2;
		this.angle_speed = MathRandom() * 0.2;
		this.curve = MathRandom() * 5;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x -= this.move_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;

		this.y += this.curve * Math.sin(this.angle);

		this.angle += this.angle_speed;

		super.update(opt);
	}
}
