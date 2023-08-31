const imgParticle2 = new Image();
imgParticle2.src = "./res/fire.png";

export class particle2 {
	img: HTMLImageElement;

	x: number;
	y: number;
	size: number;

	timestamp: number;
	animation_speed: number;

	mark_delete: boolean;
	radius: number;
	alpha: number;

	MathPI2 = Math.PI * 2;

	constructor(opt: { x: number; y: number; size: number }) {
		this.img = imgParticle2;

		this.x = opt.x;
		this.y = opt.y;
		this.size = opt.size;

		this.timestamp = 0;
		this.animation_speed = 5;

		this.mark_delete = false;
		this.radius = Math.random() * this.size;

		this.alpha = 1;
	}

	update(opt: { delta_time: number }) {
		this.timestamp += opt.delta_time;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.radius < 0) this.mark_delete = true;
			else {
				this.radius -= 0.5;
				this.alpha -= 0.01;
			}
		}
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		// opt.ctx.save();
		// opt.ctx.globalAlpha = this.alpha;
		// opt.ctx.beginPath();
		// opt.ctx.fillStyle = this.color;
		// opt.ctx.arc(this.x, this.y, this.radius, 0, this.MathPI2);
		// opt.ctx.fill();
		// opt.ctx.restore();
		opt.ctx.save();
		opt.ctx.globalAlpha = this.alpha;
		opt.ctx.drawImage(this.img, this.x, this.y, this.radius, this.radius);
		opt.ctx.restore();
	}
	set_position(game_speed: number) {
		this.x -= game_speed;
	}
}
