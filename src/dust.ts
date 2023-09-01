import { particle } from "./particle.js";

export class dust extends particle {
	MathPI2 = Math.PI * 2;

	color: string;

	constructor(opt: { x: number; y: number; color: string }) {
		super({ x: opt.x, y: opt.y });
		this.color = opt.color;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.beginPath();
		opt.ctx.arc(this.x, this.y, this.size, 0, this.MathPI2);
		opt.ctx.fillStyle = this.color;
		opt.ctx.fill();
	}
}
