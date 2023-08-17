import { baseEnemy } from "./enemy/base.js";
import { setupEnemy1 } from "./enemy/enemy1.js";
import { setupEnemy2 } from "./enemy/enemy2.js";
import { setupEnemy3 } from "./enemy/enemy3.js";
import { setupEnemy4 } from "./enemy/enemy4.js";

const enemyDB = {
	enemy1: {
		img: "./res/enemy1.png",
		sprite_length: 5,
		sprite_width: 293,
		sprite_height: 155,
		action: setupEnemy1,
	},
	enemy2: {
		img: "./res/enemy2.png",
		sprite_length: 5,
		sprite_width: 266,
		sprite_height: 188,
		action: setupEnemy2,
	},
	enemy3: {
		img: "./res/enemy3.png",
		sprite_length: 5,
		sprite_width: 218,
		sprite_height: 177,
		action: setupEnemy3,
	},
	enemy4: {
		img: "./res/enemy4.png",
		sprite_length: 8,
		sprite_width: 213,
		sprite_height: 213,
		action: setupEnemy4,
	},
};

export type enemyDBType = keyof typeof enemyDB;

export const enemyType = (canvas: HTMLCanvasElement, canvas_width: number, canvas_height: number, action: enemyDBType, count: number) => {
	let item = enemyDB[action];

	const img = new Image();
	img.src = item.img;

	const sprite_width = item.sprite_width;
	const sprite_height = item.sprite_height;
	const sprite_length = item.sprite_length;
	const actFn = item.action;

	return {
		canvas,
		canvas_width,
		canvas_height,
		enemy: actFn(count, {
			img,
			sprite_width,
			sprite_height,
			sprite_length,
			canvas_height,
			canvas_width,
		}),
	};
};

let enemAnimationId: string = "";
export const enemy = (opt: { canvas: HTMLCanvasElement; canvas_width: number; canvas_height: number; enemy: baseEnemy[] }) => {
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
	enemy: baseEnemy[];
	game_frame: number;
	canvas_width: number;
	canvas_height: number;
}

const animateEnemy = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	opt.enemy.forEach((i) => {
		i.update(opt.game_frame);
		i.draw(opt.ctx);
	});

	opt.game_frame++;
	requestAnimationFrame(() => {
		if (enemAnimationId === opt.animateId) {
			animateEnemy(opt);
		}
	});
};
