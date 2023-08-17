import { baseEnemy } from "./base.js";

class enemy3 extends baseEnemy {
	canvas_width: number;
	canvas_height: number;

	angle: number;
	angle_speed: number;

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

		game_speed: number;
		animation_speed: number;

		angle: number;
		angle_speed: number;
	}) {
		super(opt);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.angle = opt.angle;
		this.angle_speed = opt.angle_speed;
	}

	update(game_frame: number) {
		this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);
		if (this.x + this.width < 0) this.x = this.canvas_width;

		this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);
		if (this.y + this.height < 0) this.y = this.canvas_height;

		this.angle += this.angle_speed;

		super.update(game_frame);
	}

	draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}

export const setupEnemy3 = (
	count: number,
	opt: {
		img: HTMLImageElement;
		sprite_width: number;
		sprite_height: number;
		sprite_length: number;
		canvas_width: number;
		canvas_height: number;
	}
) => {
	const width = opt.sprite_width / 2.5;
	const height = opt.sprite_height / 2.5;

	return Array(count)
		.fill("")
		.map((_i) => {
			return new enemy3({
				img: opt.img,

				x: Math.random() * (opt.canvas_width - width),
				y: Math.random() * (opt.canvas_height - height),
				width,
				height,

				canvas_width: opt.canvas_width,
				canvas_height: opt.canvas_height,
				sprite_width: opt.sprite_width,
				sprite_height: opt.sprite_height,
				sprite_length: opt.sprite_length,

				game_speed: Math.random() * 4 + 1,
				animation_speed: Math.floor(Math.random() * 3 + 1),

				angle: Math.random() * 2,
				angle_speed: Math.random() * 0.5 + 0.5,
			});
		});
};
