const imgExplosion = new Image();
imgExplosion.src = "./res/boom.png";

const soundExplosion = "./res/boom.wav";

class explosion {
	frame: number;
	timer: number;
	mark_delete: boolean;
	sound_play: boolean;

	img: HTMLImageElement;
	sound: string;

	x: number;
	y: number;
	width: number;
	height: number;

	sprite_width: number;
	sprite_height: number;
	sprite_length: number;

	angle: number;

	constructor(opt: { img: HTMLImageElement; sound: string; x: number; y: number; sprite_width: number; sprite_height: number; sprite_length: number; angle: number }) {
		this.frame = 0;
		this.timer = 0;
		this.mark_delete = false;
		this.sound_play = false;

		this.img = opt.img;
		this.sound = opt.sound;

		this.sprite_width = opt.sprite_width;
		this.sprite_height = opt.sprite_height;
		this.sprite_length = opt.sprite_length;

		this.width = this.sprite_width * 0.5;
		this.height = this.sprite_height * 0.5;

		this.x = opt.x;
		this.y = opt.y;

		this.angle = opt.angle;
	}

	update() {
		if (!this.sound_play) {
			this.sound_play = true;
			new Audio(this.sound).play();
		}

		this.timer++;
		if (this.timer % 5 === 0) {
			this.frame++;
			this.timer = 0;
		}

		if (this.frame > this.sprite_length) {
			this.mark_delete = true;
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img, this.sprite_width * this.frame, 0, this.sprite_width, this.sprite_width, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height);

		ctx.restore();
	}
}

const explosions: explosion[] = [];

const createExplosion = (x: number, y: number) => {
	return new explosion({
		x,
		y,
		img: imgExplosion,
		sound: soundExplosion,
		sprite_width: 200,
		sprite_height: 179,
		sprite_length: 5,
		angle: Math.random() * 180,
	});
};

export const trigger = (opt: { canvas: HTMLCanvasElement }) => {
	const ctx = opt.canvas.getContext("2d");
	const canvas_position = opt.canvas.getBoundingClientRect();
	const container = opt.canvas.closest(".container");

	if (container) {
		const container_position = container.getBoundingClientRect();

		if (ctx) {
			opt.canvas.addEventListener("click", (event: MouseEvent) => {
				const position_x = event.x - canvas_position.left + container_position.left + window.scrollX;
				const position_y = event.y - canvas_position.top + container_position.top + window.scrollY;

				explosions.push(createExplosion(position_x, position_y));
			});
		}
	}

	const canvas_width = opt.canvas.width;
	const canvas_height = opt.canvas.height;

	if (ctx) {
		animateTrigger({ ctx, canvas_width, canvas_height });
	}
};

const animateTrigger = (opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number }) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	for (let i = 0; i < explosions.length; i++) {
		explosions[i]?.update();
		explosions[i]?.draw(opt.ctx);
		if (explosions[i]?.mark_delete) {
			explosions.splice(i, 1);
			i--;
		}
	}

	requestAnimationFrame(() => {
		animateTrigger(opt);
	});
};
