export class particle {
	x: number;
	y: number;
	size: number;
	color: string;

	timestamp: number;
	animation_speed: number;

	mark_delete: boolean;
	radius: number;
	max_radius: number;

	constructor(opt: { x: number; y: number; size: number; color: string }) {
		this.x = opt.x;
		this.y = opt.y;
		this.size = opt.size;
		this.color = opt.color;

		this.timestamp = 0;
		this.animation_speed = 5;

		this.mark_delete = false;
		this.radius = (Math.random() * this.size) / 10;
		this.max_radius = Math.random() * 15 + 30;
	}

	update(delta_time: number) {
		this.timestamp += delta_time;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.radius > this.max_radius - 5) this.mark_delete = true;
			else this.radius += 0.5;
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.globalAlpha = 1 - this.radius / this.max_radius;
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	set_position(game_speed: number) {
		this.x -= game_speed;
	}
}
