import { particle } from "./particle.js";
import { MathFloor, MathPI2 } from "./util.js";

export class dust extends particle {
	color: string;

	constructor(opt: { x: number; y: number; color: string }) {
		super({ x: opt.x, y: opt.y });
		this.color = opt.color;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.beginPath();
		opt.ctx.arc(MathFloor(this.x), MathFloor(this.y), this.size, 0, MathPI2);
		opt.ctx.fillStyle = this.color;
		opt.ctx.fill();
	}
}
