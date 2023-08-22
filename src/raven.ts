import { baseEnemy } from "./enemy/base.js";
import { enemy5 } from "./enemy/enemy5.js";
import { explosion } from "./explosion.js";
import { particle } from "./particle.js";



let timeToNextEnemy = 0;
let enemyInterval = 3000;
let lastTime = 0;
let enemy_list: baseEnemy[] = [];
let explosion_list: explosion[] = [];
let particle_list: particle[] = [];
let score = 0;

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

				enemy_list.forEach((i) => {
					if (i.uid[0] === pixel_color[0] && i.uid[1] === pixel_color[1] && i.uid[2] === pixel_color[2]) {
						explosion_list.push(
							new explosion({
								x: i.x + i.width / 2,
								y: i.y + i.height / 2,
								scale: (i.width / i.sprite_width) * 1.5,
							})
						);
						i.mark_delete = true;
						score++;

						enemyInterval = 3000 - score * 50;
					}
				});
			});
		}

		ctx.font = "1.5rem Tahoma";
		animateRaven({
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

const draw_score = (ctx: CanvasRenderingContext2D, score: number) => {
	ctx.fillStyle = "black";
	ctx.fillText(`Score: ${score} | Scroll: ${window.scrollY}`, 50, 75);
	ctx.fillStyle = "white";
	ctx.fillText(`Score: ${score} | Scroll: ${window.scrollY}`, 51, 76);
};

const animateRaven = (opt: optionRaven) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
	opt.ctx_collision.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let deltaTime = opt.timestamp - lastTime;
	lastTime = opt.timestamp;
	timeToNextEnemy += deltaTime;
	if (timeToNextEnemy > enemyInterval) {
		enemy_list.push(new enemy5({ canvas_width: opt.canvas_width, canvas_height: opt.canvas_height }));
		timeToNextEnemy = 0;

		enemy_list.sort((a, b) => a.width - b.width);
	}

	draw_score(opt.ctx, score);

	[...enemy_list].forEach((i) => {
		i.update(deltaTime, () => {
			particle_list.push(
				new particle({
					x: i.x + i.width * 0.5 + Math.random() * 50 - 25,
					y: i.y + i.height * 0.5 + Math.random() * 30 - 15,
					size: i.width * 0.5,
					color: i.uid_text,
				})
			);
		});
	});

	[...particle_list, ...explosion_list].forEach((i) => {
		i.update(deltaTime);
	});

	[...particle_list, ...enemy_list, ...explosion_list].forEach((i) => {
		i.draw(opt.ctx, opt.ctx_collision);
	});
	enemy_list = enemy_list.filter((i) => !i.mark_delete);
	explosion_list = explosion_list.filter((i) => !i.mark_delete);
	particle_list = particle_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animateRaven(opt);
	});
};
