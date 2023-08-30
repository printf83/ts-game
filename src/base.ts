export class baseAnimation {
	fps: number;
	frame: number;
	frame_timer: number;
	frame_interval: number;

	frame_y: number;
	frame_x: number;

	mark_delete: boolean;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	animation_repeat: boolean;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		fps?: number;
		animation_repeat?: boolean;
	}) {
		opt.fps ??= 60;
		opt.animation_repeat ??= true;

		this.fps = opt.fps;
		this.frame = 0;
		this.frame_timer = 0;
		this.frame_interval = 1000 / this.fps;

		this.frame_y = 0;
		this.frame_x = 0;

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
	}

	update(delta_time: number, onframechange?: () => void) {
		if (this.frame_timer >= this.frame_interval) {
			this.frame_timer = 0;

			if (this.frame >= this.sprite_length) {
				if (this.animation_repeat) this.frame = 0;
				else this.mark_delete = true;
			} else {
				this.frame++;
				this.frame_x = this.frame * this.sprite_width;
			}

			if (onframechange) {
				onframechange();
			}
		} else {
			this.frame_timer += delta_time;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.frame_x, this.frame_y, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
	}

	set_position(game_speed: number) {
		this.x -= game_speed;
	}
}
