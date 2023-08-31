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
	alpha: number;

	MathPI2 = Math.PI * 2;

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
		this.alpha = 1 - this.radius / this.max_radius;
	}

	update(opt: { delta_time: number }) {
		this.timestamp += opt.delta_time;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.radius > this.max_radius - 5) this.mark_delete = true;
			else {
				this.radius += 0.5;
				this.alpha = 1 - this.radius / this.max_radius;
			}
		}
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.save();
		opt.ctx.globalAlpha = this.alpha;
		opt.ctx.beginPath();
		opt.ctx.fillStyle = this.color;
		opt.ctx.arc(this.x, this.y, this.radius, 0, this.MathPI2);
		opt.ctx.fill();
		opt.ctx.restore();
	}
	set_position(game_speed: number) {
		this.x -= game_speed;
	}
}
