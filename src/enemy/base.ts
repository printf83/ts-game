const genUID = () => {
	return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
};

export class baseEnemy {
	uid: number[];
	uid_text: string;

	frame: number;
	timestamp: number;
	mark_delete: boolean;

	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	canvas_width: number;
	canvas_height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	move_speed: number;
	animation_speed: number;

	constructor(opt: {
		img: HTMLImageElement;

		x: number;
		y: number;
		width: number;
		height: number;

		canvas_width: number;
		canvas_height: number;

		sprite_width: number;
		sprite_height: number;
		sprite_length: number;

		move_speed: number;
		animation_speed: number;
	}) {
		this.uid = genUID();
		this.uid_text = `rgba(${this.uid[0]},${this.uid[1]},${this.uid[2]})`;

		this.frame = 0;
		this.timestamp = 0;
		this.mark_delete = false;

		this.img = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.sprite_length = opt.sprite_length;
		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;

		this.move_speed = opt.move_speed;
		this.animation_speed = opt.animation_speed;
	}

	update(timestamp: number) {
		this.timestamp += timestamp;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.frame >= this.sprite_length) {
				this.frame = 0;
			} else {
				this.frame++;
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D, ctx_collision?: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.frame * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);

		if (ctx_collision) {
			ctx_collision.fillStyle = this.uid_text;
			ctx_collision.fillRect(this.x, this.y, this.width, this.height);
		}
	}
}
