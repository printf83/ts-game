import { baseEnemy } from "./base.js";

const imgEnemy3 = new Image();
imgEnemy3.src = "./res/enemy3.png";

export class enemy3 extends baseEnemy {
	angle: number;
	angle_speed: number;

	life_index: 0;
	life_length: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 218;
		const sprite_height = 177;
		const size_modifier = Math.random() * 0.1 + 0.3;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy3,

			x: opt.canvas_width,
			y: Math.random() * (opt.canvas_height - height),
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			explode_out: true,
			have_particle: true,
		});

		this.angle = Math.random() * 2;
		this.angle_speed = Math.random() * 0.5 + 0.5;

		this.life_index = 0;
		this.life_length = Math.random() * 5000 + 5000;
	}

	update(delta_time: number, onframechange?: () => void) {
		this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);
		if (this.y + this.height < 0) this.y = this.canvas_height;

		this.angle += this.angle_speed;

		this.life_index += delta_time;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}
