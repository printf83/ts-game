export class baseEnemy {
	frame: number;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	game_speed: number;
	animation_speed: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		game_speed: number;
		animation_speed: number;
	}) {
		this.frame = 0;

		this.img = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;

		this.sprite_length = opt.sprite_length;
		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;

		this.game_speed = opt.game_speed;
		this.animation_speed = opt.animation_speed;
	}

	update(game_frame: number) {
		if (game_frame % this.animation_speed === 0) {
			this.frame >= this.sprite_length ? (this.frame = 0) : this.frame++;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.img,
			this.frame * this.sprite_width,
			0,
			this.sprite_width,
			this.sprite_height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
