import { MathRandom } from "./util.js";

export class particle {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;

	speed_x: number;
	speed_y: number;
	size: number;
	mark_delete: boolean;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		speed_x?: number;
		speed_y?: number;
		size?: number;
	}) {
		opt.speed_x ??= MathRandom();
		opt.speed_y ??= MathRandom();
		opt.size ??= MathRandom() * 10 + 10;

		this.ctx = opt.ctx;
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
	set_position(opt: { game_speed: number }) {
		this.x -= opt.game_speed;
		if (this.x < 0 - this.size) this.mark_delete = true;
	}
}
