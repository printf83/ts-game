export class particle {
	x: number;
	y: number;

	speed_x: number;
	speed_y: number;
	size: number;
	mark_delete: boolean;

	constructor(opt: { x: number; y: number; speed_x?: number; speed_y?: number; size?: number }) {
		opt.speed_x ??= Math.random();
		opt.speed_y ??= Math.random();
		opt.size ??= Math.random() * 10 + 10;

		this.x = opt.x;
		this.y = opt.y;

		this.speed_x = opt.speed_x;
		this.speed_y = opt.speed_y;
		this.size = opt.size;

		this.mark_delete = false;
	}
	update() {
		this.x -= this.speed_x;
		this.y -= this.speed_y;
		this.size *= 0.97;
		if (this.size < 0.5) this.mark_delete = true;
	}
	set_position(game_speed: number) {
		this.x -= game_speed;
		if (this.x < 0 - this.size) this.mark_delete = true;
	}
}
// export class particle {
// 	x: number;
// 	y: number;
// 	size: number;
// 	color: string;

// 	timestamp: number;
// 	animation_speed: number;

// 	mark_delete: boolean;
// 	radius: number;
// 	max_radius: number;
// 	alpha: number;

// 	MathPI2 = Math.PI * 2;

// 	constructor(opt: { x: number; y: number; size: number; color?: string }) {
// 		opt.color ??= "white";

// 		this.x = opt.x;
// 		this.y = opt.y;
// 		this.size = opt.size;
// 		this.color = opt.color;

// 		this.timestamp = 0;
// 		this.animation_speed = 5;

// 		this.mark_delete = false;
// 		this.radius = (Math.random() * this.size) / 10;
// 		this.max_radius = Math.random() * 15 + 30;
// 		this.alpha = 1 - this.radius / this.max_radius;
// 	}

// 	update(opt: { delta_time: number }) {
// 		this.timestamp += opt.delta_time;
// 		if (this.timestamp >= this.animation_speed) {
// 			this.timestamp = 0;

// 			if (this.radius > this.max_radius - 5) this.mark_delete = true;
// 			else {
// 				this.radius += 0.5;
// 				this.alpha = 1 - this.radius / this.max_radius;
// 			}
// 		}
// 	}
// 	draw(opt: { ctx: CanvasRenderingContext2D }) {
// 		opt.ctx.save();
// 		opt.ctx.globalAlpha = this.alpha;
// 		opt.ctx.beginPath();
// 		opt.ctx.fillStyle = this.color;
// 		opt.ctx.arc(this.x, this.y, this.radius, 0, this.MathPI2);
// 		opt.ctx.fill();
// 		opt.ctx.restore();
// 	}
// 	set_position(game_speed: number) {
// 		this.x -= game_speed;
// 		if (this.x < 0 - this.radius) this.mark_delete = true;
// 	}
// }
