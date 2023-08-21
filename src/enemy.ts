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
	return {
		canvas,
		canvas_width,
		canvas_height,
		enemy: (canvas_width: number, canvas_height: number) => {
			return enemyDB[action]({ canvas_width, canvas_height });
		},
	};
};

let enemAnimationId: string = "";
export const enemy = (opt: { canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number; enemy: (canvas_width: number, canvas_height: number) => baseEnemy }) => {
	const ctx = opt.canvas.getContext("2d");

	if (ctx) {
		enemAnimationId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "");

		animateEnemy({
			animateId: enemAnimationId,
			ctx,
			enemy: opt.enemy,
			timestamp: 0,
			canvas_width: opt.canvas_width,
			canvas_height: opt.canvas_height,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	enemy: (canvas_width: number, canvas_height: number) => baseEnemy;
	timestamp: number;
	canvas_width: number;
	canvas_height: number;
}

let enemyInterval = 1000;
let timeToNextEnemy = 0;
let enemy_list: baseEnemy[] = [];

let lastTime: number = 0;
const animateEnemy = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let deltaTime = opt.timestamp - lastTime;
	lastTime = opt.timestamp;

	timeToNextEnemy += deltaTime;
	if (timeToNextEnemy > enemyInterval) {
		enemy_list.push(opt.enemy(opt.canvas_width, opt.canvas_height));
		timeToNextEnemy = 0;
	}

	[...enemy_list].forEach((i) => {
		i.update(deltaTime);
	});
	[...enemy_list].forEach((i) => {
		i.draw(opt.ctx);
	});
	enemy_list = enemy_list.filter((i) => !i.mark_delete);

	requestAnimationFrame((timestamp) => {
		if (enemAnimationId === opt.animateId) {
			opt.timestamp = timestamp;
			animateEnemy(opt);
		}
	});
};
