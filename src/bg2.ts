import { baseBg } from "./baseBg.js";

export class bg2 extends baseBg {
	constructor(opt: { canvas_width: number; canvas_height: number }) {
		super({
			img: [
				{ url: "./res/bg2/layer-1.png", speed_modifier: 0.2 },
				{ url: "./res/bg2/layer-2.png", speed_modifier: 0.4 },
				{ url: "./res/bg2/layer-3.png", speed_modifier: 0.6 },
				{ url: "./res/bg2/layer-4.png", speed_modifier: 0.8 },
				{ url: "./res/bg2/layer-5.png", speed_modifier: 1 },
			],
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			width: 2400,
			height: 700,
			ground: 50,
		});
	}
}
