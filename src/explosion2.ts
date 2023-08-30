import { baseAnimation } from "./base.js";

const imgExplosion2 = new Image();
imgExplosion2.src = "./res/boom.png";

const soundExplosion2 = "./res/boom.wav";

export class explosion2 extends baseAnimation {
	sound_played?: boolean;
	sound?: string;
	angle: number;

	dx: number;
	dy: number;
	sx: number;

	constructor(opt: { x: number; y: number; scale: number; play_sound?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 200;
		const sprite_height = 179;
		const width = sprite_width * opt.scale;
		const height = sprite_height * opt.scale;

		super({
			img: imgExplosion2,

			x: opt.x,
			y: opt.y,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length,

			fps: 30,
			animation_repeat: false,
		});

		opt.play_sound ??= true;

		if (opt.play_sound) {
			this.sound_played = false;
			this.sound = soundExplosion2;
		}

		this.angle = Math.random() * 180;
		this.dx = 0 - this.width * 0.5;
		this.dy = 0 - this.height * 0.5;
		this.sx = 0;
	}

	update(timestamp: number) {
		if (this.sound && !this.sound_played) {
			this.sound_played = true;
			new Audio(this.sound).play();
		}

		this.frame_timer += timestamp;
		if (this.frame_timer >= this.frame_interval) {
			this.frame_timer = 0;

			if (this.frame >= this.sprite_length) {
				this.mark_delete = true;
			} else {
				this.frame++;
				this.sx = this.sprite_width * this.frame;
			}
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img, this.sx, 0, this.sprite_width, this.sprite_width, this.dx, this.dy, this.width, this.height);

		ctx.restore();
	}
}