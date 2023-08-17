import { baseEnemy } from "./enemy/base.js";
import { createEnemy1 } from "./enemy/enemy1.js";
import { createEnemy2 } from "./enemy/enemy2.js";
import { createEnemy3 } from "./enemy/enemy3.js";
import { createEnemy4 } from "./enemy/enemy4.js";
import { createEnemy5 } from "./enemy/enemy5.js";
import { createEnemy6 } from "./enemy/enemy6.js";
import { createEnemy7 } from "./enemy/enemy7.js";
import { createEnemy8 } from "./enemy/enemy8.js";

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

export const enemyType = (canvas: HTMLCanvasElement, canvas_width: number, canvas_height: number, action: enemyDBType) => {
	let actionFn = enemyDB[action];

	return {
		canvas,
		canvas_width,
		canvas_height,
		enemy: actionFn({
			canvas_width,
			canvas_height,
		}),
	};
};

let enemAnimationId: string = "";
export const enemy = (opt: { canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number; enemy: baseEnemy }) => {
	const ctx = opt.canvas.getContext("2d");

	if (ctx) {
		enemAnimationId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "");

		animateEnemy({
			animateId: enemAnimationId,
			ctx,
			enemy: opt.enemy,
			game_frame: 0,
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	enemy: baseEnemy;
	game_frame: number;
	canvas_width: number;
	canvas_height: number;
}

const animateEnemy = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	opt.enemy.update(opt.game_frame);
	opt.enemy.draw(opt.ctx);

	opt.game_frame++;
	requestAnimationFrame(() => {
		if (enemAnimationId === opt.animateId) {
			animateEnemy(opt);
		}
	});
};
