import { baseEnemy } from "./enemy/base.js";

const imgExplosion = new Image();
imgExplosion.src = "./res/boom.png";

const soundExplosion = "./res/boom.wav";

export class explosion extends baseEnemy {
	sound_play: boolean;
	sound: string;
	angle: number;

	constructor(opt: {
		img: HTMLImageElement;
		sound: string;

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

		angle: number;
	}) {
		super(opt);

		this.sound_play = false;
		this.sound = opt.sound;
		this.angle = opt.angle;
	}

	update(timestamp: number) {
		if (!this.sound_play) {
			this.sound_play = true;
			new Audio(this.sound).play();
		}

		this.timestamp += timestamp;
		if (this.timestamp >= this.animation_speed) {
			this.timestamp = 0;

			if (this.frame >= this.sprite_length) {
				this.mark_delete = true;
			} else {
				this.frame++;
			}
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

let explosion_list: explosion[] = [];

export const createExplosion = (x: number, y: number, scale: number) => {
	return new explosion({
		img: imgExplosion,
		sound: soundExplosion,

		x,
		y,
		width: 200 * scale,
		height: 179 * scale,

		canvas_width: 0,
		canvas_height: 0,

		sprite_width: 200,
		sprite_height: 179,
		sprite_length: 5,

		move_speed: Math.random() * 4 - 2,
		animation_speed: Math.random() * 50 + 25,

		angle: Math.random() * 180,
	});
};

export const bindExplosion = (opt: { canvas: HTMLCanvasElement }) => {
	const ctx = opt.canvas.getContext("2d");
	const canvas_position = opt.canvas.getBoundingClientRect();
	const container = opt.canvas.closest(".container");

	if (container) {
		const container_position = container.getBoundingClientRect();

		if (ctx) {
			opt.canvas.addEventListener("click", (event: MouseEvent) => {
				const position_x = event.x - canvas_position.left + container_position.left;
				const position_y = event.y - canvas_position.top + container_position.top;

				explosion_list.push(createExplosion(position_x, position_y, 0.5));
			});
		}
	}

	const canvas_width = opt.canvas.width;
	const canvas_height = opt.canvas.height;

	if (ctx) {
		animateExplosion({ ctx, canvas_width, canvas_height, timestamp: 0 });
	}
};

let lastTime = 0;

const animateExplosion = (opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; timestamp: number }) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let deltaTime = opt.timestamp - lastTime;
	lastTime = opt.timestamp;

	[...explosion_list].forEach((i) => {
		i.update(deltaTime);
	});

	[...explosion_list].forEach((i) => {
		i.draw(opt.ctx);
	});

	explosion_list = explosion_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animateExplosion(opt);
	});
};
