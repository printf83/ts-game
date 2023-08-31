import { baseEnemy } from "./baseEnemy.js";

const imgEnemy11 = new Image();
imgEnemy11.src = "./res/enemy/enemy11.png";

export class enemy11 extends baseEnemy {
	destination_y: number;
	speed: number;

	string_x: number;
	string_y: number;

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

			x: Math.random() * (opt.canvas_width - width) + opt.canvas_width * 0.5,
			y: Math.random() > 0.5 ? Math.random() * (opt.canvas_height - height) : 0 - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			point: 3,
		});

		this.destination_y = Math.random() * ((opt.canvas_height - this.height) * 0.8);
		this.speed = Math.random() * 2 - 4;
		if (this.y < this.destination_y) {
			this.speed *= -1;
		}

		this.string_x = this.x + this.width * 0.5;
		this.string_y = this.y + 50;
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.y += this.speed;
		this.string_y = this.y + 50;
		this.string_x = this.x + this.width * 0.5;

		if (this.y > this.destination_y && this.speed > 0) {
			this.speed *= -1;
		}

		if (this.y < 0 - this.height - 5) {
			this.mark_delete = true;
		}

		super.update(opt);
	}

	draw(opt: { ctx: CanvasRenderingContext2D; ctx_collision?: CanvasRenderingContext2D }): void {
		opt.ctx.beginPath();
		opt.ctx.moveTo(this.string_x, 0);
		opt.ctx.lineTo(this.string_x, this.string_y);
		opt.ctx.stroke();
		super.draw(opt);
	}
}
