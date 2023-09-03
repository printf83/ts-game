import { baseBg } from "./baseBg.js";

export class bg1 extends baseBg {
	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number }) {
		super({
			ctx: opt.ctx,
			img: [
				{ url: "./res/bg1/layer-1.png", speed_modifier: 0 },
				{ url: "./res/bg1/layer-2.png", speed_modifier: 0.2 },
				{ url: "./res/bg1/layer-3.png", speed_modifier: 0.4 },
				{ url: "./res/bg1/layer-4.png", speed_modifier: 0.8 },
				{ url: "./res/bg1/layer-5.png", speed_modifier: 1 },
			],
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			width: 2400,
			height: 700,
			ground: 118,
		});
	}
}
