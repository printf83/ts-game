export class baseAnimation {
	frame: number;
	timestamp: number;
	mark_delete: boolean;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	animation_speed: number;
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

		animation_speed?: number;
		animation_repeat?: boolean;
	}) {
		this.frame = 0;
		this.timestamp = 0;
		this.mark_delete = false;

		this.img = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;

		this.sprite_length = opt.sprite_length;
		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;

		this.animation_speed = opt.animation_speed ? opt.animation_speed : Math.random() * 30 + 15;
		this.animation_repeat = opt.animation_repeat ? opt.animation_repeat : true;
	}

	update(timestamp: number, onframechange?: () => void) {
		this.timestamp += timestamp;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.frame >= this.sprite_length) {
				if (this.animation_repeat) this.frame = 0;
				else this.mark_delete = true;
			} else {
				this.frame++;
			}

			if (onframechange) {
				onframechange();
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.frame * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
	}
}
