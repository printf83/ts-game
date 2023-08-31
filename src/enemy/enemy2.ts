import { baseEnemy } from "./base.js";

const imgEnemy2 = new Image();
imgEnemy2.src = "./res/enemy/enemy2.png";

export class enemy2 extends baseEnemy {
	move_speed: number;
	angle: number;
	angle_speed: number;
	curve: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 266;
		const sprite_height = 188;
		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,
			img: imgEnemy2,

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

		this.move_speed = Math.random() * 4 + 1;
		this.angle = Math.random() * 2;
		this.angle_speed = Math.random() * 0.2;
		this.curve = Math.random() * 5;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.x -= this.move_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;

		this.y += this.curve * Math.sin(this.angle);

		this.angle += this.angle_speed;

		super.update(opt);
	}
}
