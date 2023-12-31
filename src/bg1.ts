import { ASSET, ASSETIMG } from "./asset.js";
import { baseBg } from "./baseBg.js";

export class bg1 extends baseBg {
	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
	}) {
		super({
			ctx: opt.ctx,
			img_list: [
				{ img: ASSETIMG(ASSET.bg1.layer1), speed_modifier: 0 },
				{ img: ASSETIMG(ASSET.bg1.layer2), speed_modifier: 0.2 },
				{ img: ASSETIMG(ASSET.bg1.layer3), speed_modifier: 0.4 },
				{ img: ASSETIMG(ASSET.bg1.layer4), speed_modifier: 0.8 },
				{ img: ASSETIMG(ASSET.bg1.layer5), speed_modifier: 1 },
			],
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			img_width: 2400,
			img_height: 700,
			ground: 700 * 0.14,
		});
	}
}
