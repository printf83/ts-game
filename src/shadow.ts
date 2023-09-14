import { ASSET, ASSETIMG } from "./asset.js";
import { baseAnimation } from "./baseAnimation.js";
import { baseEnemy } from "./enemy/baseEnemy.js";
import { player } from "./player.js";

export class shadow extends baseAnimation {
	element: player | baseEnemy;
	ground: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		ground: number;
		element: player | baseEnemy;
	}) {
		const sprite_length = 1;
		const sprite_width = 574;
		const sprite_height = 125;

		super({
			img: ASSETIMG(ASSET.shadow),

			ctx: opt.ctx,

			x: opt.element.x + opt.element.width * 0.25,
			y: opt.ground,
			width: opt.element.width * 0.5,
			height: sprite_height * ((opt.element.width * 0.25) / sprite_width),

			sprite_width,
			sprite_height,
			sprite_length,
		});

		this.element = opt.element;
		this.ground = opt.ground;
	}

	update() {
		this.mark_delete = this.element.mark_delete;

		this.x = this.element.x + this.element.width * 0.25;
		this.y = this.ground - this.height * 0.25;
	}
}
