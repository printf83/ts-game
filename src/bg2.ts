import { ASSET, ASSETIMG } from "./asset.js";
import { baseBg } from "./baseBg.js";

export class bg2 extends baseBg {
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
	}) {
		super({
			ctx: opt.ctx,
			img_list: [
				{ img: ASSETIMG(ASSET.bg2.layer1), speed_modifier: 0.2 },
				{ img: ASSETIMG(ASSET.bg2.layer2), speed_modifier: 0.4 },
				{ img: ASSETIMG(ASSET.bg2.layer3), speed_modifier: 0.6 },
				{ img: ASSETIMG(ASSET.bg2.layer4), speed_modifier: 0.8 },
				{ img: ASSETIMG(ASSET.bg2.layer5), speed_modifier: 1 },
			],
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			img_width: 1667,
			img_height: 500,
			ground: 500 * 0.1,
		});
	}
}
