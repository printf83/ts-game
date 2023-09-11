import { ASSET, ASSETIMG } from "./asset.js";
import { baseAnimation } from "./baseAnimation.js";
import { MathFloor, MathRandom } from "./util.js";

export class explosion extends baseAnimation {
	sound_played?: boolean;
	angle: number;

	dx: number;
	dy: number;
	sx: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		scale: number;
		play_sound?: boolean;
	}) {
		const sprite_length = 6;
		const sprite_width = 200;
		const sprite_height = 179;
		const width = sprite_width * opt.scale;
		const height = sprite_height * opt.scale;

		super({
			img: ASSETIMG(ASSET.boom),

			ctx: opt.ctx,

			x: opt.x,
			y: opt.y,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			fps: 24,
			animation_repeat: 1,
		});

		opt.play_sound ??= true;

		if (opt.play_sound) {
			this.sound_played = false;
		}

		this.angle = MathRandom() * 180;
		this.dx = 0 - this.width * 0.5;
		this.dy = 0 - this.height * 0.5;
		this.sx = 0;
	}

	update(opt: { delta_time: number }) {
		if (this.sound_played === false) {
			this.sound_played = true;
			const sound = new Audio(ASSET.boom_wav);
			sound.play();
		}

		super.update({
			delta_time: opt.delta_time,
		});
	}
	draw() {
		this.ctx.save();

		this.ctx.translate(MathFloor(this.x), MathFloor(this.y));
		this.ctx.rotate(this.angle);

		this.ctx.drawImage(this.img_sprite[this.frame_x]!, MathFloor(this.dx), MathFloor(this.dy));

		this.ctx.restore();
	}
}
