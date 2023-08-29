import { baseEnemy } from "./base.js";

const imgEnemy11 = new Image();
imgEnemy11.src = "./res/enemy/enemy11.png";

export class enemy11 extends baseEnemy {
	destination_y: number;
	speed: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const sprite_length = 5;
		const sprite_width = 120;
		const sprite_height = 144;
		const size_modifier = Math.random() * 0.5 + 0.7;
		const width = sprite_width * size_modifier;
		const height = sprite_height * size_modifier;

		super({
			...opt,

			img: imgEnemy11,

			x: Math.random() * (opt.canvas_width - width) + opt.canvas_width,
			y: 0 - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 3,
		});

		this.destination_y = Math.random() * (opt.canvas_height * 0.8);
		this.speed = Math.random() * 2 + 2;
	}

	update(delta_time: number, onframechange?: () => void) {
		this.y += this.speed;
		if (this.y > this.destination_y) {
			this.speed *= -1;
		}

		if (this.y < 0 - this.height - 5) {
			this.mark_delete = true;
		}

		super.update(delta_time, onframechange);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.moveTo(this.x + this.width * 0.5, 0);
		ctx.lineTo(this.x + this.width * 0.5, this.y + 10);
		ctx.stroke();
		super.draw(ctx);
	}

	set_position(game_speed: number): void {
		this.x -= game_speed;
	}
}
