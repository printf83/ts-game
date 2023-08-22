import { baseEnemy } from "./enemy/base.js";
import { enemy1 } from "./enemy/enemy1.js";
import { enemy2 } from "./enemy/enemy2.js";
import { enemy3 } from "./enemy/enemy3.js";
import { enemy4 } from "./enemy/enemy4.js";
import { enemy5 } from "./enemy/enemy5.js";
import { enemy6 } from "./enemy/enemy6.js";
import { enemy7 } from "./enemy/enemy7.js";
import { enemy8 } from "./enemy/enemy8.js";

const enemyDB = {
	enemy1: enemy1,
	enemy2: enemy2,
	enemy3: enemy3,
	enemy4: enemy4,
	enemy5: enemy5,
	enemy6: enemy6,
	enemy7: enemy7,
	enemy8: enemy8,
};
export type enemyDBType = keyof typeof enemyDB;

interface game_option {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
}

export class game {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;

	enemy_list: baseEnemy[] = [];
	enemy_interval: number;
	enemy_timer: number;

	enemy_type: string[];

	constructor(opt: game_option) {
		this.ctx = opt.ctx;
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.enemy_interval = 3000;
		this.enemy_timer = 0;
		this.enemy_list = [];

		this.enemy_type = ["enemy1", "enemy2", "enemy3", "enemy4", "enemy5", "enemy6", "enemy7", "enemy8"];

		this.addNewEnemy();
	}

	update(timestamp: number) {
		if (this.enemy_timer > this.enemy_interval) {
			this.enemy_list = this.enemy_list.filter((i) => !i.mark_delete);

			this.addNewEnemy();
			this.enemy_timer = 0;
		} else {
			this.enemy_timer += timestamp;
		}

		this.enemy_list.forEach((i) => i.update(timestamp));
	}

	draw() {
		this.enemy_list.forEach((i) => i.draw(this.ctx));
	}

	private addNewEnemy() {
		const rndEnemyIndex = this.enemy_type[Math.floor(Math.random() * this.enemy_type.length)];

		let enemyObject = enemyDB[rndEnemyIndex as enemyDBType];

		this.enemy_list.push(new enemyObject({ canvas_width: this.canvas_width, canvas_height: this.canvas_height }));

		this.enemy_list.sort((a, b) => a.width - b.width);
	}
}

interface animate_option {
	game: game;
	timestamp: number;
}

let last_timestamp = 0;
export const animate_game = (opt: animate_option) => {
	opt.game.ctx.clearRect(0, 0, opt.game.canvas_width, opt.game.canvas_height);

	let delta_time = opt.timestamp - last_timestamp;
	last_timestamp = opt.timestamp;

	opt.game.update(delta_time);
	opt.game.draw();

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		animate_game(opt);
	});
};
