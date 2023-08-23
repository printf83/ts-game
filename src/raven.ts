import { baseEnemy } from "./enemy/base.js";
import { enemy5 } from "./enemy/enemy5.js";
import { explosion } from "./explosion.js";
import { particle } from "./particle.js";

let raven_next_index = 0;
let raven_interval = 3000;
let raven_last_timestamp = 0;
let raven_list: baseEnemy[] = [];
let raven_explosion_list: explosion[] = [];
let raven_particle_list: particle[] = [];
let raven_score = 0;

export const raven = (opt: { collision_canvas: HTMLCanvasElement; canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number }) => {
	const ctx = opt.canvas.getContext("2d");
	const ctx_collision = opt.collision_canvas.getContext("2d");

	if (ctx && ctx_collision) {
		const canvas_position = opt.canvas.getBoundingClientRect();
		const container = opt.canvas.closest(".container");
		if (container) {
			const container_position = container.getBoundingClientRect();

			opt.canvas.addEventListener("click", (event) => {
				const position_x = event.x - canvas_position.left + container_position.left + window.scrollX;
				const position_y = event.y - canvas_position.top + container_position.top + window.scrollY;

				const detectPixelColor = ctx_collision.getImageData(position_x, position_y, 1, 1);
				const pixel_color = detectPixelColor.data;
				console.log(pixel_color);

				raven_list.forEach((i) => {
					if (i.uid[0] === pixel_color[0] && i.uid[1] === pixel_color[1] && i.uid[2] === pixel_color[2]) {
						raven_explosion_list.push(
							new explosion({
								x: i.x + i.width / 2,
								y: i.y + i.height / 2,
								scale: (i.width / i.sprite_width) * 1.5,
							})
						);
						i.mark_delete = true;
						raven_score++;

						raven_interval = 3000 - raven_score * 50;
					}
				});
			});
		}

		ctx.font = "1.5rem Tahoma";
		animate_raven({
			ctx,
			ctx_collision,
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			timestamp: 0,
		});
	}
};

interface optionRaven {
	ctx: CanvasRenderingContext2D;
	ctx_collision: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
	timestamp: number;
}

const raven_draw_score = (ctx: CanvasRenderingContext2D, score: number) => {
	ctx.fillStyle = "black";
	ctx.fillText(`Score: ${score} | Scroll: ${window.scrollY}`, 50, 75);
	ctx.fillStyle = "white";
	ctx.fillText(`Score: ${score} | Scroll: ${window.scrollY}`, 51, 76);
};

const animate_raven = (opt: optionRaven) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
	opt.ctx_collision.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let deltaTime = opt.timestamp - raven_last_timestamp;
	raven_last_timestamp = opt.timestamp;
	raven_next_index += deltaTime;
	if (raven_next_index > raven_interval) {
		raven_list.push(new enemy5({ canvas_width: opt.canvas_width, canvas_height: opt.canvas_height }));
		raven_next_index = 0;

		raven_list.sort((a, b) => a.width - b.width);
	}

	raven_draw_score(opt.ctx, raven_score);

	[...raven_list].forEach((i) => {
		i.update(deltaTime, () => {
			raven_particle_list.push(
				new particle({
					x: i.x + i.width * 0.5 + Math.random() * 50 - 25,
					y: i.y + i.height * 0.5 + Math.random() * 30 - 15,
					size: i.width * 0.5,
					color: i.uid_text,
				})
			);
		});
	});

	[...raven_particle_list, ...raven_explosion_list].forEach((i) => {
		i.update(deltaTime);
	});

	[...raven_particle_list, ...raven_list, ...raven_explosion_list].forEach((i) => {
		i.draw(opt.ctx, opt.ctx_collision);
	});
	raven_list = raven_list.filter((i) => !i.mark_delete);
	raven_explosion_list = raven_explosion_list.filter((i) => !i.mark_delete);
	raven_particle_list = raven_particle_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animate_raven(opt);
	});
};
