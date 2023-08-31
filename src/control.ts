// import { bg1 } from "./bg1.js";
import { bg2 } from "./bg2.js";
import { baseEnemy } from "./enemy/base.js";
import { enemy1 } from "./enemy/enemy1.js";
import { enemy2 } from "./enemy/enemy2.js";
import { enemy3 } from "./enemy/enemy3.js";
import { enemy4 } from "./enemy/enemy4.js";
import { enemy5 } from "./enemy/enemy5.js";
import { enemy6 } from "./enemy/enemy6.js";
import { enemy7 } from "./enemy/enemy7.js";
import { enemy8 } from "./enemy/enemy8.js";
import { enemy9 } from "./enemy/enemy9.js";
import { explosion } from "./explosion.js";
import { particle } from "./particle.js";
import { player } from "./player.js";
import { progress } from "./progress.js";
import { draw_text } from "./util.js";
import { input } from "./input.js";
import { enemy10 } from "./enemy/enemy10.js";
import { enemy11 } from "./enemy/enemy11.js";
import { particle2 } from "./particle2.js";
import { score } from "./score.js";

const enemyDB = {
	enemy1: enemy1,
	enemy2: enemy2,
	enemy3: enemy3,
	enemy4: enemy4,
	enemy5: enemy5,
	enemy6: enemy6,
	enemy7: enemy7,
	enemy8: enemy8,
	enemy9: enemy9,
	enemy10: enemy10,
	enemy11: enemy11,
};
export type enemyDBType = keyof typeof enemyDB;
const enemy_type = ["enemy1", "enemy2", "enemy3", "enemy4", "enemy5", "enemy6", "enemy7", "enemy8", "enemy9", "enemy10", "enemy11"];
// const enemy_type = ["enemy8", "enemy11"];
// const enemy_type = ["enemy9", "enemy10", "enemy11"];

interface control_option {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
}

export const control = (opt: control_option) => {
	const obj_input = new input();

	const obj_bg = new bg2({
		game_speed: 0,
		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
	});
	let base_height = opt.canvas_height - obj_bg.ground;
	const obj_player = new player({ canvas_width: opt.canvas_width, canvas_height: base_height });

	const collision_detection = (player: player, enemy_list: baseEnemy[]) => {
		enemy_list.forEach((i) => {
			if (i.is_collide({ player })) {
				if (player.is_powered()) {
					i.explode_out = false;

					explosion_list.push(
						new explosion({
							x: i.x + i.width * 0.5,
							y: i.y + i.height * 0.5,
							scale: i.width * 0.008,
							play_sound: true,
						})
					);

					const point = i.point - Math.floor(i.y - i.canvas_height - i.height + 118);
					score_list.push(
						new score({
							text: `${point > 0 ? "+" : ""}${point}`,
							value: point,
							x: i.x + i.width * 0.5,
							y: i.y + i.height * 0.5,
							destination_x: 55,
							destination_y: 55,
						})
					);

					i.mark_delete = true;
				} else {
					if (!player.invulnerable) {
						if (player.life > 30) {
							player.life -= 10;
							player.set_state("gethit");
						} else if (player.life > 0) {
							player.life -= 10;
							player.set_state("dizzy");
						} else {
							player.set_state("ko");
							setTimeout(() => {
								game_over = true;
							}, 300);
						}
					}

					if (!game_over) {
						i.explode_out = false;

						explosion_list.push(
							new explosion({
								x: i.x + i.width * 0.5,
								y: i.y + i.height * 0.5,
								scale: i.width * 0.008,
								play_sound: true,
							})
						);

						const point = i.point - Math.floor(i.y - i.canvas_height - i.height + 118);
						score_list.push(
							new score({
								text: `${point > 0 ? "-" : ""}${point}`,
								value: point > 0 ? -point : point,
								x: i.x + i.width * 0.5,
								y: i.y + i.height * 0.5,
								destination_x: 55,
								destination_y: 55,
							})
						);

						i.mark_delete = true;
					}
				}
			}
		});
	};

	let enemy_list: baseEnemy[] = [];
	let explosion_list: explosion[] = [];
	let particle_list: particle[] = [];
	let particle2_list: particle2[] = [];
	let score_list: score[] = [];

	const enemy_update = (delta_time: number) => {
		// if (obj_player.speed > 0) {
		if (enemy_timer > enemy_interval + enemy_random_interval) {
			const rndEnemyIndex = enemy_type[Math.floor(Math.random() * enemy_type.length)];

			let enemyObject = enemyDB[rndEnemyIndex as enemyDBType];
			const new_enemy = new enemyObject({ canvas_width: opt.canvas_width, canvas_height: base_height });

			if (new_enemy.explode_in) {
				explosion_list.push(
					new explosion({
						x: new_enemy.x + new_enemy.width * 0.5,
						y: new_enemy.y + new_enemy.height * 0.5,
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
		// }

		[...particle2_list, ...particle_list, ...explosion_list].forEach((i) => {
			i.update({ delta_time });
			i.set_position(obj_player.speed);
		});

		score_list.forEach((i) => {
			i.update();
			if (i.mark_delete) {
				score_value += i.value;
				score_text = score_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		});

		enemy_list.forEach((i) => {
			i.update({ delta_time });

			i.set_position(obj_player.speed);
			if (i.x < 0 - i.width) i.mark_delete = true;

			if (i.have_particle) {
				particle_list.push(
					new particle({
						x: i.x + i.width * 0.5 + Math.random() * 50 - 25,
						y: i.y + i.height * 0.5 + Math.random() * 30 - 15,
						size: i.width * 0.5,
						color: i.uid_text,
					})
				);
			}
		});

		score_list = score_list.filter((i) => !i.mark_delete);
		enemy_list = enemy_list.filter((i) => !i.mark_delete);
		particle_list = particle_list.filter((i) => !i.mark_delete);
		particle2_list = particle2_list.filter((i) => !i.mark_delete);
		explosion_list = explosion_list.filter((i) => !i.mark_delete);
	};
	const enemy_draw = (ctx: CanvasRenderingContext2D) => {
		[...score_list, ...particle2_list, ...particle_list, ...explosion_list, ...enemy_list].forEach((i) => {
			i.draw({ ctx });
		});
	};

	let game_up = false;
	let game_over = false;
	let game_pause = false;
	let game_level = 1;
	let score_value = 0;
	let score_text = "0";

	const restart_game = () => {
		player_progress = 0;
		obj_player.life = 100;
		obj_player.power = 0;
		obj_player.max_speed = 14;
		obj_player.set_state("idle");
		obj_player.y = base_height - obj_player.height;
		obj_player.speed = 0;

		game_level = 1;
		enemy_interval = 1000;
		enemy_random_interval = Math.random() * enemy_interval + 500;
		enemy_list = [];
		particle_list = [];
		particle2_list = [];
		explosion_list = [];
		score_list = [];
		score_value = 0;
		score_text = "0";
		game_over = false;
		requestAnimationFrame(animate);
	};

	const level_up_game = () => {
		player_progress = 0;
		obj_player.life += 10;
		if (obj_player.life > 100) obj_player.life = 100;

		obj_player.set_state("idle");
		obj_player.y = base_height - obj_player.height;
		obj_player.speed = 0;

		game_level++;
		obj_player.max_speed = 14 + game_level * 2;
		enemy_interval = 1000 - game_level * 50;
		enemy_random_interval = Math.random() * enemy_interval + 500;
		enemy_list = [];
		particle_list = [];
		particle2_list = [];
		explosion_list = [];
		game_up = false;
		requestAnimationFrame(animate);
	};

	const continue_game = () => {
		game_pause = false;
		requestAnimationFrame(animate);
	};

	//progress

	let player_progress = 0;
	let player_progress_max = 1000;
	const progess_level = new progress({
		x: opt.canvas_width * 0.5 - opt.canvas_width * 0.4 * 0.5,
		y: 30,
		min: 0,
		max: player_progress_max,
		width: opt.canvas_width * 0.4,
		value: player_progress,
		bar_color: ["red", "green"],
	});

	//player_life
	const progess_life = new progress({
		x: opt.canvas_width - 130,
		y: 30,
		width: 100,
		value: obj_player.life,
		max: 100,
		bar_color: ["red", "green"],
	});

	//player_power
	const progess_power = new progress({
		x: opt.canvas_width - 130,
		y: 60,
		width: 100,
		value: obj_player.power,
		max: 100,
		bar_color: ["red", "green"],
	});

	const progress_list = [progess_level, progess_life, progess_power];

	const display_status = (ctx: CanvasRenderingContext2D) => {
		draw_text({
			ctx,
			x: 20,
			y: 50,
			text: `🎮 ${score_text}`,
			text_color: score_value < 0 ? "red" : "white",
			font_weight: 30,
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
			text: `🧡`,
			text_align: "end",
			shadow_blur: 1,
		});
		progess_life.update(obj_player.life);

		draw_text({
			ctx,
			x: opt.canvas_width - 150,
			y: 75,
			text: `🚀`,
			text_align: "end",
			shadow_blur: 1,
		});
		progess_power.update(obj_player.power);

		progress_list.forEach((i) => i.draw(ctx));

		if (game_over) {
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 - 20,
				text: `Game over!`,
				font_weight: 50,
				text_align: "center",
				text_color: "red",
			});
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 + 20,
				text: `Press SPACEBAR to try again.`,
				font_weight: 30,
				text_align: "center",
				text_color: "red",
			});
		}

		if (game_up) {
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 - 20,
				text: `Level ${game_level} complete!`,
				font_weight: 50,
				text_align: "center",
				text_color: "green",
			});
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 + 20,
				text: `Press SPACEBAR to continue.`,
				font_weight: 30,
				text_align: "center",
				text_color: "green",
			});
		}

		if (game_pause) {
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 - 20,
				text: `Game pause!`,
				font_weight: 50,
				text_align: "center",
			});
			draw_text({
				ctx,
				x: opt.canvas_width * 0.5,
				y: base_height * 0.5 + 20,
				text: `Press ENTER to continue.`,
				font_weight: 30,
				text_align: "center",
			});
		}
	};

	let lastTime = 0;
	let enemy_timer = 0;
	let enemy_interval = 1000;
	let enemy_random_interval = Math.random() * enemy_interval + 500;

	const do_update = (timestamp: number) => {
		const delta_time = timestamp - lastTime;
		lastTime = timestamp;

		player_progress += obj_player.speed * 0.1;
		if (player_progress >= player_progress_max) {
			game_up = true;
		}

		obj_player.power += 0.1;
		if (obj_player.power > 100) obj_player.power = 100;

		obj_bg.update(obj_player.speed);
		obj_player.update_input(obj_input);
		obj_player.update({ delta_time });

		if (obj_player.speed === obj_player.max_speed) {
			Array(5)
				.fill("")
				.forEach((_i) => {
					particle2_list.push(
						new particle2({
							x: obj_player.x - 50,
							y: obj_player.y + obj_player.height * 0.05 + Math.random() * 30 - 15,
							size: obj_player.width,
						})
					);
				});
		}

		enemy_update(delta_time);
		collision_detection(obj_player, enemy_list);
	};
	const do_draw = () => {
		opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

		obj_bg.draw(opt.ctx);
		obj_player.draw({ ctx: opt.ctx });
		enemy_draw(opt.ctx);
		display_status(opt.ctx);
	};

	const animate = (timestamp: number) => {
		do_update(timestamp);
		do_draw();
		if (!game_over && !game_up && !game_pause) {
			requestAnimationFrame(animate);
		}
	};

	window.addEventListener("keyup", (e) => {
		if (e.key === " ") {
			if (game_up || game_over) {
				e.preventDefault();
				e.stopPropagation();

				if (game_over) restart_game();
				if (game_up) level_up_game();
			}
		} else if (e.key === "Enter") {
			if (!game_up && !game_over) {
				e.preventDefault();
				e.stopPropagation();

				if (!game_pause) game_pause = true;
				else if (game_pause) continue_game();
			}
		}
	});

	requestAnimationFrame(animate);
};
