import { ASSET } from "./asset.js";
import { baseAnimation } from "./baseAnimation.js";
import { MathFloor, MathRandom } from "./util.js";

const imgExplosion = new Image();
imgExplosion.src = ASSET.boom;

const soundExplosion = ASSET.boom_wav;

export class explosion extends baseAnimation {
	sound_played?: boolean;
	sound?: string;
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
		const sprite_length = 5;
		const sprite_width = 200;
		const sprite_height = 179;
		const width = sprite_width * opt.scale;
		const height = sprite_height * opt.scale;

		super({
			img: imgExplosion,

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

		opt.play_sound ??= true;

		if (opt.play_sound) {
			this.sound_played = false;
			this.sound = soundExplosion;
		}

		this.angle = MathRandom() * 180;
		this.dx = 0 - this.width * 0.5;
		this.dy = 0 - this.height * 0.5;
		this.sx = 0;
	}

	update(opt: { delta_time: number }) {
		if (this.sound && !this.sound_played) {
			this.sound_played = true;
			new Audio(this.sound).play();
		}

		super.update({
			delta_time: opt.delta_time,
			onframechange: () => {
				this.sx = this.sprite_width * this.frame;
			},
		});
	}
	draw() {
		this.ctx.save();

		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.drawImage(
			this.img,
			MathFloor(this.sx),
			0,
			this.sprite_width,
			this.sprite_width,
			MathFloor(this.dx),
			MathFloor(this.dy),
			this.width,
			this.height
		);

		this.ctx.restore();
	}
}
