import { particle } from "./particle.js";
import { MathFloor, MathPI2 } from "./util.js";

export class dust extends particle {
	color: string;

	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; color: string }) {
		super({ ctx: opt.ctx, x: opt.x, y: opt.y });
		this.color = opt.color;
	}
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(MathFloor(this.x), MathFloor(this.y), this.size, 0, MathPI2);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}
