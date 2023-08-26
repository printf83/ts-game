import { bg } from "./bg.js";
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
import { progress } from "./progress.js";

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

const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", " "];

export const control = (opt: control_option) => {
	let base_height = opt.canvas_height - 118;

	class input_handler {
		keys: string[];
		constructor() {
			this.keys = [];
			window.addEventListener("keydown", (e) => {
				if (keys.indexOf(e.key) > -1) {
					if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);

					e.stopPropagation();
					e.preventDefault();
				}
			});

			window.addEventListener("keyup", (e) => {
				if (keys.indexOf(e.key) > -1) {
					if (e.key === " ") {
						if (game_over === true) restart_game();
						if (game_up === true) level_up_game();
					}

					this.keys.splice(this.keys.indexOf(e.key), 1);

					e.stopPropagation();
					e.preventDefault();
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
				if (player_power_on > 0) {
					i.explode_out = false;

					explosion_list.push(
						new explosion({
							x: i.x + i.width / 2,
							y: i.y + i.height / 2,
							scale: (i.width / i.sprite_width) * 1.5,
							play_sound: true,
						})
					);

					i.mark_delete = true;
					score += 3;
				} else {
					if (player_dizzy_index <= 0) {
						if (player_life > 30) {
							player_life -= 10;
							player_dizzy_index = 50;
							player.set_action("gethit");
						} else if (player_life > 0) {
							player_life -= 10;
							player_dizzy_index = 200;
							player.set_action("dizzy");
						} else {
							player.set_action("ko");
							game_over = true;
						}
					}
				}
			}
		});
	};

	let player_speed = 0;
	let player_velocity_y = 0;
	let player_weight = 1;
	let player_power_on = 0;
	let player_dizzy_index = 0;

	const player_on_ground = (player: player) => player.y >= base_height - player.height;

	const player_control = (input: input_handler, player: player) => {
		//control
		if (player_dizzy_index > 0) {
			player_speed = 0;
			game_speed = 0;
			player_dizzy_index--;
		} else {
			if (input.keys.indexOf("ArrowRight") > -1) {
				if (player_power > 3) {
					player_speed = 0;
					game_speed = 25;
					player_power_on = 1;
					player_power -= 1;
					player.set_action("roll");
				} else {
					player_power -= 0.1;
					player.set_action("run");
					game_speed = 5;
					player_power_on = 0;
					player_speed = 0;
				}
			} else if (input.keys.indexOf("ArrowLeft") > -1) {
				player_speed = 0;
				game_speed = 0;
				player.set_action("idle");
			} else if (input.keys.indexOf("ArrowDown") > -1) {
				player_speed = 0;
				game_speed = 0;
				player.set_action("sit");
			} else if (input.keys.indexOf("ArrowUp") > -1 && player_on_ground(player)) {
				player_velocity_y -= 30;
				player.set_action("jump");
			} else if (input.keys.indexOf(" ") > -1) {
				player.set_action("bite");
				player_power_on = 5;
				game_speed = 0;
				player_speed = 0;
			} else {
				player.set_action("run");
				game_speed = 5;
				player_speed = 0;
				if (player_power_on > 0) player_power_on--;
				else player_power_on = 0;
			}

			//horizontal movement
			player.x += player_speed;
			if (player.x < 0) player.x = 0;
			else if (player.x > opt.canvas_width - player.width) player.x = opt.canvas_width - player.width;
		}

		//vertical movement
		player.y += player_velocity_y;
		if (!player_on_ground(player)) {
			player_velocity_y += player_weight;
			if (!player_power_on) {
				if (player_velocity_y <= 0) player.set_action("jump");
				else player.set_action("fall");
			} else {
				player.set_action("roll");
			}
		} else {
			player_velocity_y = 0;
		}

		if (player.y > base_height - player.height) player.y = base_height - player.height;
	};

	const handle_control = (input: input_handler, player: player, enemy_list: baseEnemy[]) => {
		collision_detection(player, enemy_list);
		player_control(input, player);
	};

	const enemy_type = ["enemy1", "enemy2", "enemy3", "enemy4", "enemy5", "enemy6", "enemy7", "enemy8"];
	let enemy_list: baseEnemy[] = [];
	let explosion_list: explosion[] = [];
	let particle_list: particle[] = [];

	const handle_enemy = (delta_time: number) => {
		if (enemy_timer > enemy_interval + enemy_random_interval) {
			const rndEnemyIndex = enemy_type[Math.floor(Math.random() * enemy_type.length)];

			let enemyObject = enemyDB[rndEnemyIndex as enemyDBType];
			const new_enemy = new enemyObject({ canvas_width: opt.canvas_width, canvas_height: base_height });

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

			enemy_random_interval = Math.random() * enemy_interval + 500;
			enemy_timer = 0;
		} else {
			enemy_timer += delta_time;
		}

		[...particle_list, ...explosion_list].forEach((i) => {
			i.update(delta_time);
			i.set_position(game_speed);
			i.draw(opt.ctx);
		});

		enemy_list.forEach((i) => {
			i.set_position(game_speed);
			if (i.x < 0 - i.width) i.mark_delete = true;

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
		});

		enemy_list = enemy_list.filter((i) => !i.mark_delete);
		particle_list = particle_list.filter((i) => !i.mark_delete);
		explosion_list = explosion_list.filter((i) => !i.mark_delete);
	};

	let game_up = false;
	let game_level = 1;
	let game_over = false;
	let game_speed = 7;
	let score = 0;

	const restart_game = () => {
		player_progress = 0;
		player_life = 100;
		player_power = 0;
		game_level = 1;
		enemy_interval = 1000;
		enemy_random_interval = Math.random() * enemy_interval + 500;
		enemy_list = [];
		particle_list = [];
		explosion_list = [];
		score = 0;
		game_over = false;
		animate(0);
	};

	const level_up_game = () => {
		player_progress = 0;
		player_life += 10;
		if (player_life > 100) player_life = 100;

		game_level++;
		enemy_interval = 1000 - game_level * 50;
		enemy_random_interval = Math.random() * enemy_interval + 500;
		enemy_list = [];
		particle_list = [];
		explosion_list = [];
		game_up = false;
		animate(0);
	};

	//progress

	let player_progress = 0;
	let player_progress_max = 1000;
	const progess_level = new progress({
		x: opt.canvas_width * 0.5 - opt.canvas_width * 0.4 * 0.5,
		y: 30,
		min: 0,
		max: 1000,
		width: opt.canvas_width * 0.4,
		value: player_progress,
	});

	//player_live
	let player_life = 100;
	const progess_life = new progress({
		x: opt.canvas_width - 130,
		y: 30,
		width: 100,
		value: player_life,
	});

	//player_pwr
	let player_power = 0;
	const progess_power = new progress({
		x: opt.canvas_width - 130,
		y: 60,
		width: 100,
		value: player_power,
	});

	const progress_list = [progess_level, progess_life, progess_power];

	//draw_text
	const draw_text = (opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		text: string;
		text_align?: CanvasTextAlign;
		font_weight?: string;
		font_family?: string;
		text_color?: string | CanvasGradient | CanvasPattern;
		shadow_color?: string | CanvasGradient | CanvasPattern;
	}) => {
		opt.font_family ??= "Helvetica";
		opt.font_weight ??= "20px";
		opt.text_color ??= "white";
		opt.shadow_color ??= "black";
		opt.text_align ??= "left";

		opt.ctx.save();
		opt.ctx.textAlign = opt.text_align;
		opt.ctx.font = `${opt.font_weight} ${opt.font_family}`;
		opt.ctx.fillStyle = opt.shadow_color;
		opt.ctx.fillText(opt.text, opt.x, opt.y);
		opt.ctx.fillStyle = opt.text_color;
		opt.ctx.fillText(opt.text, opt.x + 1, opt.y);
		opt.ctx.restore();
	};

	const display_status = (ctx: CanvasRenderingContext2D) => {
		draw_text({
			ctx,
			x: 20,
			y: 50,
			text: `🎮 ${score}`,
			font_weight: "30px",
		});

		draw_text({
			ctx,
			x: opt.canvas_width * 0.5,
			y: 20,
			text: `Level ${game_level}`,
			text_align: "center",
		});

		progess_level.update(player_progress);

		draw_text({
			ctx,
			x: opt.canvas_width - 150,
			y: 45,
			text: `💖`,
			text_align: "end",
		});
		progess_life.update(player_life);

		draw_text({
			ctx,
			x: opt.canvas_width - 150,
			y: 75,
			text: `🔥`,
			text_align: "end",
		});
		progess_power.update(player_power);

		progress_list.forEach((i) => i.draw(opt.ctx));

		if (game_over) {
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5,
				text: `Game over! Try again.`,
				font_weight: "50px",
				text_align: "center",
				text_color: "red",
			});
		}

		if (game_up) {
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5,
				text: `Level ${game_level} complete!`,
				font_weight: "50px",
				text_align: "center",
				text_color: "green",
			});
		}
	};

	const obj_input = new input_handler();
	const obj_player = new player({ canvas_width: opt.canvas_width, canvas_height: base_height });
	const obj_bg = new bg({ game_speed: game_speed });

	let lastTime = 0;
	let enemy_timer = 0;
	let enemy_interval = 1000;
	let enemy_random_interval = Math.random() * enemy_interval + 500;

	const animate = (timestamp: number) => {
		const delta_time = timestamp - lastTime;
		lastTime = timestamp;

		player_progress += game_speed * 0.1;
		if (player_progress >= player_progress_max) {
			game_up = true;
		}

		player_power += 0.1;
		if (player_power > 100) player_power = 100;

		opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

		obj_bg.update(game_speed);
		obj_bg.draw(opt.ctx);
		obj_player.update(delta_time);
		obj_player.draw(opt.ctx);

		handle_enemy(delta_time);
		handle_control(obj_input, obj_player, enemy_list);

		display_status(opt.ctx);

		if (!game_over && !game_up) {
			requestAnimationFrame(animate);
		}
	};

	animate(0);
};
