import { baseAnimation } from "./base.js";

const imgExplosion = new Image();
imgExplosion.src = "./res/boom.png";

const soundExplosion = "./res/boom.wav";

export class explosion extends baseAnimation {
	sound_played?: boolean;
	sound?: string;
	angle: number;

	constructor(opt: { x: number; y: number; scale: number; play_sound?: boolean }) {
		const sprite_length = 5;
		const sprite_width = 200;
		const sprite_height = 179;
		const width = sprite_width * opt.scale;
		const height = sprite_height * opt.scale;

		super({
			img: imgExplosion,

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
			this.sound = soundExplosion;
		}

		this.angle = Math.random() * 180;
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
			}
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(
			this.img,
			this.sprite_width * this.frame,
			0,
			this.sprite_width,
			this.sprite_width,
			0 - this.width * 0.5,
			0 - this.height * 0.5,
			this.width,
			this.height
		);

		ctx.restore();
	}
}

let explosion_list: explosion[] = [];

export const bindExplosion = (opt: { canvas: HTMLCanvasElement }) => {
	const ctx = opt.canvas.getContext("2d");
	const canvas_position = opt.canvas.getBoundingClientRect();
	const container = opt.canvas.closest(".container");

	if (container) {
		const container_position = container.getBoundingClientRect();

		if (ctx) {
			opt.canvas.addEventListener("click", (event: MouseEvent) => {
				const position_x = event.x - canvas_position.left - container_position.left - window.screenX;
				const position_y = event.y - canvas_position.top - container_position.top - window.screenY;

				explosion_list.push(
					new explosion({
						x: position_x,
						y: position_y,
						scale: 0.5,
					})
				);
			});
		}
	}

	const canvas_width = opt.canvas.width;
	const canvas_height = opt.canvas.height;

	if (ctx) {
		animate_explosion({ ctx, canvas_width, canvas_height, timestamp: 0 });
	}
};

let explosion_last_timestamp = 0;

const animate_explosion = (opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; timestamp: number }) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let delta_time = opt.timestamp - explosion_last_timestamp;
	explosion_last_timestamp = opt.timestamp;

	[...explosion_list].forEach((i) => {
		i.update(delta_time);
	});

	[...explosion_list].forEach((i) => {
		i.draw(opt.ctx);
	});

	explosion_list = explosion_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animate_explosion(opt);
	});
};
