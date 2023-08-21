import { baseEnemy } from "./base.js";

class enemy2 extends baseEnemy {
	move_speed: number;
	angle: number;
	angle_speed: number;
	curve: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;

		move_speed: number;

		angle: number;
		angle_speed: number;
		curve: number;
	}) {
		super(opt);

		this.move_speed = opt.move_speed;
		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;
		this.curve = opt.curve;
	}

	update(timestamp: number) {
		this.x -= this.move_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;

		this.y += this.curve * Math.sin(this.angle);

		this.angle += this.angle_speed;

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const imgEnemy2 = new Image();
imgEnemy2.src = "./res/enemy2.png";

export const createEnemy2 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 266;
	const sprite_height = 188;
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

	return new enemy2({
		img: imgEnemy2,

		x: opt.canvas_width,
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
		sprite_width,
		sprite_height,
		sprite_length,

		move_speed: Math.random() * 4 + 1,
		angle: Math.random() * 2,
		angle_speed: Math.random() * 0.2,
		curve: Math.random() * 5,
	});
};
