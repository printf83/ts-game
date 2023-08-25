import { baseEnemy } from "./enemy/base.js";
import { enemy1 } from "./enemy/enemy1.js";
import { enemy2 } from "./enemy/enemy2.js";
import { enemy3 } from "./enemy/enemy3.js";
import { enemy4 } from "./enemy/enemy4.js";
import { enemy5 } from "./enemy/enemy5.js";
import { enemy6 } from "./enemy/enemy6.js";
import { enemy7 } from "./enemy/enemy7.js";
import { enemy8 } from "./enemy/enemy8.js";
import { explosion } from "./explosion.js";
import { particle } from "./particle.js";
import { player } from "./player.js";

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

interface control_option {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
}

const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

export const control = (opt: control_option) => {
	class input_handler {
		keys: string[];
		constructor() {
			this.keys = [];
			window.addEventListener("keydown", (e) => {
				if (keys.indexOf(e.key) > -1 && this.keys.indexOf(e.key) === -1) {
					this.keys.push(e.key);
				}
			});

			window.addEventListener("keyup", (e) => {
				if (keys.indexOf(e.key) > -1) {
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	const collision_detection = (player: player, enemy_list: baseEnemy[]) => {
		enemy_list.forEach((i) => {
			const dx = i.x + i.width * 0.5 - (player.x + player.width * 0.5);
			const dy = i.y + i.height * 0.5 - (player.y + player.height * 0.5);

			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < i.width * 0.25 + player.width * 0.25) {
				game_over = true;
			}
		});
	};

	let player_speed = 0;
	let player_velocity_y = 0;
	let player_weight = 1.5;

	const player_on_ground = (player: player) => player.y >= opt.canvas_height - player.height;

	const player_control = (input: input_handler, player: player) => {
		//control
		if (input.keys.indexOf("ArrowRight") > -1) {
			player_speed = 5;
		} else if (input.keys.indexOf("ArrowLeft") > -1) {
			player_speed = -5;
		} else if (input.keys.indexOf("ArrowUp") > -1 && player_on_ground(player)) {
			player_velocity_y -= 32;
		} else {
			player_speed = 0;
		}

		//horizontal movement
		player.x += player_speed;
		if (player.x < 0) player.x = 0;
		else if (player.x > opt.canvas_width - player.width) player.x = opt.canvas_width - player.width;

		//vertical movement
		player.y += player_velocity_y;
		if (!player_on_ground(player)) {
			player_velocity_y += player_weight;
			player.set_action("jump");
		} else {
			player_velocity_y = 0;
			player.set_action("run");
		}

		if (player.y > opt.canvas_height - player.height) player.y = opt.canvas_height - player.height;
	};

	const handle_control = (input: input_handler, player: player, enemy_list: baseEnemy[]) => {
		collision_detection(player, enemy_list);
		player_control(input, player);
	};

	class bg {
		canvas_width: number;
		canvas_height: number;

		x: number;
		y: number;
		width: number;
		height: number;

		img: HTMLImageElement;

		sprite_width = 2400;
		sprite_height = 720;

		speed: number;

		constructor(canvas_width: number, canvas_height: number) {
			this.canvas_width = canvas_width;
			this.canvas_height = canvas_height;

			this.img = new Image();
			this.img.src = "./res/bg-single.png";

			this.x = 0;
			this.y = 0;

			this.width = this.sprite_width;
			this.height = this.sprite_height;

			this.speed = 7;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
			ctx.drawImage(this.img, this.x + this.width - this.speed, this.y, this.width, this.height);
		}
		update() {
			this.x -= this.speed;
			if (this.x < 0 - this.width) this.x = 0;
		}
	}

	const enemy_type = ["enemy1", "enemy2", "enemy3", "enemy4", "enemy5", "enemy6", "enemy7", "enemy8"];
	let enemy_list: baseEnemy[] = [];
	let explosion_list: explosion[] = [];
	let particle_list: particle[] = [];

	const handle_enemy = (delta_time: number) => {
		if (enemy_timer > enemy_interval + enemy_random_interval) {
			const rndEnemyIndex = enemy_type[Math.floor(Math.random() * enemy_type.length)];

			let enemyObject = enemyDB[rndEnemyIndex as enemyDBType];
			const new_enemy = new enemyObject({ canvas_width: opt.canvas_width, canvas_height: opt.canvas_height });

			if (new_enemy.explode_in) {
				explosion_list.push(
					new explosion({
						x: new_enemy.x + new_enemy.width / 2,
						y: new_enemy.y + new_enemy.height / 2,
						scale: (new_enemy.width / new_enemy.sprite_width) * 1.5,
						play_sound: false,
					})
				);
			}

			enemy_list.push(new_enemy);
			enemy_list.sort((a, b) => a.width - b.width);

			enemy_random_interval = Math.random() * 1000 + 500;
			enemy_timer = 0;
		} else {
			enemy_timer += delta_time;
		}

		[...particle_list, ...explosion_list].forEach((i) => {
			i.update(delta_time);
			i.draw(opt.ctx);
		});

		enemy_list.forEach((i) => {
			i.update(delta_time);

			if (i.have_particle) {
				particle_list.push(
					new particle(
						new particle({
							x: i.x + i.width * 0.5 + Math.random() * 50 - 25,
							y: i.y + i.height * 0.5 + Math.random() * 30 - 15,
							size: i.width * 0.5,
							color: i.uid_text,
						})
					)
				);
			}

			i.draw(opt.ctx);
			if (i.mark_delete) score++;
		});

		enemy_list = enemy_list.filter((i) => !i.mark_delete);
		particle_list = particle_list.filter((i) => !i.mark_delete);
		explosion_list = explosion_list.filter((i) => !i.mark_delete);
	};

	let game_over = false;

	let score = 0;

	const display_status = (ctx: CanvasRenderingContext2D) => {
		ctx.font = "40px Helvetica";

		ctx.fillStyle = "black";
		ctx.fillText(`Score: ${score}`, 20, 50);
		ctx.fillStyle = "white";
		ctx.fillText(`Score: ${score}`, 22, 52);

		if (game_over) {
			ctx.textAlign = "center";
			ctx.fillStyle = "black";
			ctx.fillText(`Game Over`, opt.canvas_width * 0.5, opt.canvas_height * 0.5);
			ctx.fillStyle = "white";
			ctx.fillText(`Game Over`, opt.canvas_width * 0.5 + 2, opt.canvas_height * 0.5 + 2);
		}
	};

	const obj_input = new input_handler();
	const obj_player = new player({ canvas_width: opt.canvas_width, canvas_height: opt.canvas_height });
	const obj_bg = new bg(opt.canvas_width, opt.canvas_height);

	let lastTime = 0;
	let enemy_timer = 0;
	let enemy_interval = 1000;
	let enemy_random_interval = Math.random() * 1000 + 500;

	const animate = (timestamp: number) => {
		const delta_time = timestamp - lastTime;
		lastTime = timestamp;

		opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

		obj_bg.update();
		obj_bg.draw(opt.ctx);
		obj_player.update(delta_time);
		obj_player.draw(opt.ctx);

		handle_enemy(delta_time);
		handle_control(obj_input, obj_player, enemy_list);

		display_status(opt.ctx);

		if (!game_over) {
			requestAnimationFrame(animate);
		}
	};

	animate(0);
};
