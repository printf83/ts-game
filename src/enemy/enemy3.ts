import { baseEnemy } from "./base.js";

class enemy3 extends baseEnemy {
	angle: number;
	angle_speed: number;

	life_index: 0;
	life_length: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		canvas_width: number;
		canvas_height: number;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		move_speed: number;
		animation_speed: number;

		angle: number;
		angle_speed: number;
		life_length: number;
	}) {
		super(opt);

		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;

		this.life_index = 0;
		this.life_length = opt.life_length;
	}

	update(timestamp: number) {
		this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);
		if (this.y + this.height < 0) this.y = this.canvas_height;

		this.angle += this.angle_speed;

		this.life_index += timestamp;
		if (this.life_index > this.life_length) this.mark_delete = true;

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

const imgEnemy3 = new Image();
imgEnemy3.src = "./res/enemy3.png";

export const createEnemy3 = (opt: { canvas_width: number; canvas_height: number }) => {
	const sprite_length = 5;
	const sprite_width = 218;
	const sprite_height = 177;
	const size_modifier = Math.random() * 0.1 + 0.4;
	const width = sprite_width * size_modifier;
	const height = sprite_height * size_modifier;

	return new enemy3({
		img: imgEnemy3,

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
		animation_speed: Math.random() * 50 + 25,
		angle: Math.random() * 2,
		angle_speed: Math.random() * 0.5 + 0.5,

		life_length: Math.random() * 10000 - 5000,
	});
};
