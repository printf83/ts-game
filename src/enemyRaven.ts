import { baseEnemy } from "./enemy/base.js";
import { createEnemy1 } from "./enemy/enemy1.js";
import { createEnemy2 } from "./enemy/enemy2.js";
import { createEnemy3 } from "./enemy/enemy3.js";
import { createEnemy4 } from "./enemy/enemy4.js";
import { createEnemy5 } from "./enemy/enemy5.js";
import { createEnemy6 } from "./enemy/enemy6.js";
import { createEnemy7 } from "./enemy/enemy7.js";
import { createEnemy8 } from "./enemy/enemy8.js";
import { createExplosion, explosion } from "./explosion.js";

const enemyDB = {
	enemy1: createEnemy1,
	enemy2: createEnemy2,
	enemy3: createEnemy3,
	enemy4: createEnemy4,
	enemy5: createEnemy5,
	enemy6: createEnemy6,
	enemy7: createEnemy7,
	enemy8: createEnemy8,
};
export type enemyDBType = keyof typeof enemyDB;

let timeToNextEnemy = 0;
let enemyInterval = 500;
let lastTime = 0;
let enemy_list: baseEnemy[] = [];
let explosion_list: explosion[] = [];
let score = 0;

export const enemyRaven = (opt: { collision_canvas: HTMLCanvasElement; canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number }) => {
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

				enemy_list.forEach((i) => {
					if (i.uid[0] === pixel_color[0] && i.uid[1] === pixel_color[1] && i.uid[2] === pixel_color[2]) {
						explosion_list.push(createExplosion(i.x + i.width / 2, i.y + i.height / 2, i.width / i.sprite_width));
						i.mark_delete = true;
						score++;
					}
				});
			});
		}

		ctx.font = "1.5rem Tahoma";
		animateEnemyRaven({
			ctx,
			ctx_collision,
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
			timestamp: 0,
		});
	}
};

interface optionEnemyRaven {
	ctx: CanvasRenderingContext2D;
	ctx_collision: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
	timestamp: number;
}

const draw_score = (ctx: CanvasRenderingContext2D, score: number) => {
	ctx.fillStyle = "black";
	ctx.fillText(`Score: ${score}`, 50, 75);
	ctx.fillStyle = "white";
	ctx.fillText(`Score: ${score}`, 52, 77);
};

const animateEnemyRaven = (opt: optionEnemyRaven) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);
	opt.ctx_collision.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let deltaTime = opt.timestamp - lastTime;
	lastTime = opt.timestamp;
	timeToNextEnemy += deltaTime;
	if (timeToNextEnemy > enemyInterval) {
		enemy_list.push(createEnemy5({ canvas_width: opt.canvas_width, canvas_height: opt.canvas_height }));
		timeToNextEnemy = 0;

		enemy_list.sort((a, b) => a.width - b.width);
	}

	draw_score(opt.ctx, score);

	[...enemy_list].forEach((i) => {
		i.update(deltaTime);
	});
	[...enemy_list].forEach((i) => {
		i.draw(opt.ctx, opt.ctx_collision);
	});
	enemy_list = enemy_list.filter((i) => !i.mark_delete);

	[...explosion_list].forEach((i) => {
		i.update();
	});
	[...explosion_list].forEach((i) => {
		i.draw(opt.ctx);
	});
	explosion_list = explosion_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animateEnemyRaven(opt);
	});
};
