import { baseEnemy } from "./base.js";

const imgEnemy8 = new Image();
imgEnemy8.src = "./res/enemy8.png";

export class enemy8 extends baseEnemy {
	destination_y: number;
	speed: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 310;
		const sprite_height = 175;
		const size_modifier = Math.random() * 0.1 + 0.4;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy8,

			x: Math.random() * (opt.canvas_width - width),
			y: 0 - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,
		});

		this.destination_y = Math.random() * (opt.canvas_height * 0.8);
		this.speed = Math.random() * 2 + 2;
	}

	update(timestamp: number) {
		this.y += this.speed;
		if (this.y > this.destination_y) {
			this.speed *= -1;
		}

		if (this.y < 0 - this.height - 5) {
			this.mark_delete = true;
		}

		super.update(timestamp);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.moveTo(this.x + this.width * 0.5, 0);
		ctx.lineTo(this.x + this.width * 0.5, this.y + 10);
		ctx.stroke();
		super.draw(ctx);
	}
}
