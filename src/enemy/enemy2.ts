import { baseEnemy } from "./base.js";

class enemy2 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

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
		animation_speed: number;

		angle: number;
		angle_speed: number;
		curve: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;
		this.curve = opt.curve;
	}

	update(game_frame: number) {
		this.x -= this.move_speed;
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y += this.curve * Math.sin(this.angle);

		this.angle += this.angle_speed;

		super.update(game_frame);
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
	const width = sprite_width / 2.5;
	const height = sprite_height / 2.5;

	return new enemy2({
		img: imgEnemy2,

		x: Math.random() * (opt.canvas_width - width),
		y: Math.random() * (opt.canvas_height - height),
		width,
		height,

		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
		sprite_width,
		sprite_height,
		sprite_length,

		move_speed: Math.random() * 4 + 1,
		animation_speed: Math.floor(Math.random() * 3 + 1),

		angle: Math.random() * 2,
		angle_speed: Math.random() * 0.2,
		curve: Math.random() * 5,
	});
};
