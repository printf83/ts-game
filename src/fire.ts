import { ASSET } from "./asset.js";
import { baseAnimation } from "./baseAnimation.js";
import { MathFloor, MathRandom } from "./util.js";

const imgFire = new Image();
imgFire.src = ASSET.fire;

export class fire extends baseAnimation {
	angle: number;

	dx: number;
	dy: number;
	sx: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
		x: number;
		y: number;
	}) {
		const scale = MathRandom() * 0.5 + 0.5;
		const sprite_length = 6;
		const sprite_width = 100;
		const sprite_height = 90;
		const width = sprite_width * scale;
		const height = sprite_height * scale;

		super({
			img: imgFire,

			ctx: opt.ctx,

			x: opt.x,
			y: opt.y,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			fps: 30,
			animation_repeat: 1,
		});

		this.angle = MathRandom() * 180;
		this.dx = 0 - this.width * 0.5;
		this.dy = 0 - this.height * 0.5;
		this.sx = 0;
	}

	draw() {
		this.ctx.save();

		this.ctx.translate(MathFloor(this.x), MathFloor(this.y));
		this.ctx.rotate(this.angle);

		this.ctx.drawImage(this.img_sprite[this.frame_x]!, MathFloor(this.dx), MathFloor(this.dy));

		this.ctx.restore();
	}
}
