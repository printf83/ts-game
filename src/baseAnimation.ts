import { MathFloor } from "./util.js";

export class baseAnimation {
	ctx: CanvasRenderingContext2D;

	fps: number;
	frame_x: number;
	frame_timer: number;
	frame_interval: number;

	frame_y: number;

	mark_delete: boolean;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	animation_repeat: number;
	animation_repeat_index: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;

		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		fps?: number;
		animation_repeat?: number;
	}) {
		opt.fps ??= 24;
		opt.animation_repeat ??= 0;

		this.ctx = opt.ctx;

		this.fps = opt.fps;
		this.frame_timer = 0;
		this.frame_interval = 1000 / this.fps;

		this.frame_x = 0;
		this.frame_y = 0;

		this.mark_delete = false;

		this.img = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;

		this.sprite_length = opt.sprite_length;
		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;

		this.animation_repeat = opt.animation_repeat;
		this.animation_repeat_index = 0;

		this.build_sprite();
	}

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		if (this.frame_timer >= this.frame_interval) {
			this.frame_timer = 0;

			if (this.frame_x >= this.sprite_length - 1) {
				if (this.animation_repeat === 0) this.frame_x = 0;
				else if (this.animation_repeat > 0) {
					this.animation_repeat_index++;
					if (this.animation_repeat_index >= this.animation_repeat) {
						if (opt.onframecomplete) opt.onframecomplete();
						else this.mark_delete = true;
					} else {
						this.frame_x = 0;
					}
				}
			} else {
				this.frame_x++;
				if (opt.onframechange) opt.onframechange();
			}
		} else {
			this.frame_timer += opt.delta_time;
		}
	}

	draw() {
		this.ctx.drawImage(this.img_sprite[this.frame_x]!, MathFloor(this.x), MathFloor(this.y));
	}

	set_position(opt: { game_speed: number }) {
		this.x -= opt.game_speed;
		if (this.x < 0 - this.width) this.mark_delete = true;
	}

	img_sprite: ImageBitmap[] = [];
	build_sprite() {
		this.img_sprite = [];
		this.frame_x = 0;

		for (let x = 0; x < this.sprite_length; x++) {
			const frame_x = x * this.sprite_width;

			const canvas = new OffscreenCanvas(this.width, this.height);
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.drawImage(
						this.img,
						frame_x,
						this.frame_y,
						this.sprite_width,
						this.sprite_height,
						0,
						0,
						this.width,
						this.height
					);
					this.img_sprite.push(canvas.transferToImageBitmap());
				}
			}
		}

		return this.img_sprite;
	}
}
