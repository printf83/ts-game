// import { bg1 } from "./bg1.js";
import { baseBg } from "./baseBg.js";
import { bg2 } from "./bg2.js";
import { baseEnemy } from "./enemy/baseEnemy.js";
import { enemy1 } from "./enemy/enemy1.js";
import { enemy2 } from "./enemy/enemy2.js";
import { enemy3 } from "./enemy/enemy3.js";
import { enemy4 } from "./enemy/enemy4.js";
import { enemy5 } from "./enemy/enemy5.js";
import { enemy6 } from "./enemy/enemy6.js";
import { enemy7 } from "./enemy/enemy7.js";
import { enemy8 } from "./enemy/enemy8.js";
import { enemy9 } from "./enemy/enemy9.js";
import { enemy10 } from "./enemy/enemy10.js";
import { enemy11 } from "./enemy/enemy11.js";
import { explosion } from "./explosion.js";
import { particle } from "./particle.js";
import { particle2 } from "./particle2.js";
import { player } from "./player.js";
import { progress } from "./progress.js";
import { draw_text } from "./util.js";
import { input } from "./input.js";
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

export class game {
	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;
	base_height: number;

	bg: baseBg;
	player: player;
	input: input;

	prg_game: progress;
	prg_life: progress;
	prg_power: progress;

	enemy_list: baseEnemy[] = [];
	explosion_list: explosion[] = [];
	particle_list: particle[] = [];
	particle2_list: particle2[] = [];
	score_list: score[] = [];
	progress_list: progress[] = [];

	game_up: boolean = false;
	game_over: boolean = false;
	game_pause: boolean = false;

	score_value: number = 0;
	score_text: string = "0";
	progress_index: number = 0;
	progress_max: number = 1000;
	game_level: number = 1;
	enemy_index: number = 0;
	enemy_interval: number = 3000;

	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number }) {
		this.ctx = opt.ctx;
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.input = new input();
		this.bg = new bg2({ canvas_width: this.canvas_width, canvas_height: this.canvas_height });
		this.base_height = this.canvas_height - this.bg.ground;
		this.player = new player({ canvas_width: this.canvas_width, canvas_height: this.base_height });

		this.prg_game = new progress({
			x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5,
			y: 30,
			min: 0,
			max: this.progress_max,
			width: this.canvas_width * 0.4,
			value: this.progress_index,
			bar_color: ["red", "green"],
		});
		this.prg_life = new progress({
			x: this.canvas_width - 130,
			y: 30,
			width: 100,
			value: this.player.life,
			max: 100,
			bar_color: ["red", "green"],
		});
		this.prg_power = new progress({
			x: this.canvas_width - 130,
			y: 60,
			width: 100,
			value: this.player.power,
			max: 100,
			bar_color: ["red", "green"],
		});

		window.addEventListener("keydown", this.game_stop_listener);
	}

	game_start() {
		this.game_level = 1;

		this.progress_index = 0;
		this.progress_max = 1000;
		this.enemy_index = 0;
		let tmp_enemy_interval = 3000 - this.game_level * 10;
		this.enemy_interval = Math.random() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list = [];
		this.explosion_list = [];
		this.particle_list = [];
		this.particle2_list = [];
		this.score_list = [];

		this.player.set_state("idle");
		this.player.life = 100;
		this.player.power = 0;
		this.player.speed = 0;
		this.player.max_speed = 14;
		this.player.weight = 1;
		this.player.velocity_y = 0;
		this.player.y = this.base_height - this.player.height;
		this.player.powered = false;
		this.player.invulnerable = false;

		this.score_value = 0;
		this.score_text = "0";

		this.game_over = false;
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
		});
	}

	game_level_up() {
		this.game_level++;

		this.progress_index = 0;
		this.progress_max = 1000 + this.game_level * 100;
		this.enemy_index = 0;

		let tmp_enemy_interval = 3000 - this.game_level * 10;
		this.enemy_interval = Math.random() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list = [];
		this.explosion_list = [];
		this.particle_list = [];
		this.particle2_list = [];

		this.player.set_state("idle");
		this.player.life += 10;
		if (this.player.life > 100) this.player.life = 100;
		this.player.speed = 0;
		this.player.max_speed = 14 + this.game_level;
		this.player.weight = 1;
		this.player.velocity_y = 0;
		this.player.y = this.base_height - this.player.height;
		this.player.powered = false;
		this.player.invulnerable = false;

		this.game_up = false;
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
		});
	}

	game_continue() {
		this.game_pause = false;
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
		});
	}

	add_explosion(enemy: baseEnemy) {
		this.explosion_list.push(
			new explosion({
				x: enemy.x + enemy.width * 0.5,
				y: enemy.y + enemy.height * 0.5,
				scale: enemy.width * 0.008,
				play_sound: true,
			})
		);
	}

	add_floating_score(enemy: baseEnemy, deduction: boolean) {
		let point = Math.floor((100 - (enemy.y / (enemy.canvas_height - enemy.height + this.base_height)) * 100) * 0.1 * enemy.point);

		// const Y = enemy.y;
		// const H = enemy.canvas_height - enemy.height + this.base_height;
		// const Y_H = Y / H;
		// const YH_percent = Y_H * 100;
		// const negYHPercent = 100 - YH_percent;
		// const nYHP10 = Math.floor(negYHPercent * 0.1);
		// const one_line = Math.floor((100 - (enemy.y / (enemy.canvas_height - enemy.height + this.base_height)) * 100) * 0.1);

		// console.log(`Y:${Y}
		// H:${H}
		// Y/H:${Y_H}
		// Y/H percent:${YH_percent}
		// -YHP: ${negYHPercent}
		// nYHP10:${nYHP10}
		// one_line:${one_line}
		// `);
		//+100 - Math.floor(enemy.y / enemy.canvas_height - enemy.height - this.base_height);

		if (deduction && point > 0) point *= -1;
		if (!deduction && point < 0) point *= -1;

		this.score_list.push(
			new score({
				text: `${point > 0 ? "+" : ""}${point}`,
				value: point,
				x: enemy.x + enemy.width * 0.5,
				y: enemy.y + enemy.height * 0.5,
				destination_x: 55,
				destination_y: 55,
			})
		);
	}

	collision_detection() {
		//collision
		this.enemy_list.forEach((i) => {
			if (!i.mark_delete) {
				if (i.is_collide({ player: this.player })) {
					if (this.player.is_powered()) {
						i.explode_out = false;

						this.add_explosion(i);
						this.add_floating_score(i, false);

						i.mark_delete = true;
					} else {
						if (!this.player.invulnerable) {
							if (this.player.life > 30) {
								this.player.life -= 10;
								this.player.set_state("gethit");
							} else if (this.player.life > 0) {
								this.player.life -= 10;
								this.player.set_state("dizzy");
							} else {
								this.player.set_state("ko");
								setTimeout(() => {
									this.game_over = true;
								}, 500);
							}
						}

						if (!this.game_over) {
							i.explode_out = false;

							this.add_explosion(i);
							this.add_floating_score(i, true);

							i.mark_delete = true;
						}
					}
				}
			}
		});
	}

	draw_status() {
		//score
		draw_text({
			ctx: this.ctx,
			x: 20,
			y: 50,
			text: `🎮 ${this.score_text}`,
			text_color: this.score_value < 0 ? "red" : "white",
			font_weight: 30,
		});

		//progress
		draw_text({
			ctx: this.ctx,
			x: this.canvas_width * 0.5,
			y: 20,
			text: `Level ${this.game_level}`,
			text_align: "center",
		});
		this.prg_game.update(this.progress_index, 0, this.progress_max);

		//life
		draw_text({
			ctx: this.ctx,
			x: this.canvas_width - 150,
			y: 45,
			text: `🧡`,
			text_align: "end",
		});
		this.prg_life.update(this.player.life);

		//power
		draw_text({
			ctx: this.ctx,
			x: this.canvas_width - 150,
			y: 75,
			text: `🚀`,
			text_align: "end",
		});
		this.prg_power.update(this.player.power);

		//draw progress bar
		[this.prg_game, this.prg_life, this.prg_power].forEach((i) => i.draw(this.ctx));

		//game over message
		if (this.game_over) {
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 - 20,
				text: `Game over!`,
				font_weight: 50,
				text_align: "center",
				text_color: "red",
			});
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 + 20,
				text: `Press SPACEBAR to try again.`,
				font_weight: 30,
				text_align: "center",
				text_color: "red",
			});
		}

		//game level up
		if (this.game_up) {
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 - 20,
				text: `Level ${this.game_level} complete!`,
				font_weight: 50,
				text_align: "center",
				text_color: "green",
			});
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 + 20,
				text: `Press SPACEBAR to continue.`,
				font_weight: 30,
				text_align: "center",
				text_color: "green",
			});
		}

		if (this.game_pause) {
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 - 20,
				text: `Game pause!`,
				font_weight: 50,
				text_align: "center",
			});
			draw_text({
				ctx: this.ctx,
				x: this.canvas_width * 0.5,
				y: this.base_height * 0.5 + 20,
				text: `Press ENTER to continue.`,
				font_weight: 30,
				text_align: "center",
			});
		}
	}

	last_timestamp: number = 0;
	update(timestamp: number) {
		const delta_time = timestamp - this.last_timestamp;
		this.last_timestamp = timestamp;

		//update game progress
		this.progress_index += this.player.speed * 0.1;
		if (this.progress_index >= this.progress_max) this.game_up = true;

		//update player power
		this.player.power += 0.1;
		if (this.player.power > 100) this.player.power = 100;

		//update bg
		this.bg.update({ game_speed: this.player.speed });

		//update player state
		this.player.update_input(this.input);

		//update player
		this.player.update({ delta_time });

		//add particle when player run
		if (this.player.speed === this.player.max_speed) {
			Array(3)
				.fill("")
				.forEach((_i) => {
					this.particle2_list.push(
						new particle2({
							x: this.player.x - 50,
							y: this.player.y + this.player.height * 0.05 + Math.random() * 30 - 15,
							size: this.player.width,
						})
					);
				});
		}

		//add enemy
		if (this.enemy_index >= this.enemy_interval) {
			//choose enemy
			const random_enemy_index = enemy_type[Math.floor(Math.random() * enemy_type.length)];

			//create new enemy
			const enemy_object = enemyDB[random_enemy_index as enemyDBType];
			const new_enemy = new enemy_object({ canvas_width: this.canvas_width, canvas_height: this.base_height });

			//add explosion if explode in
			if (new_enemy.explode_in) {
				this.explosion_list.push(
					new explosion({
						x: new_enemy.x + new_enemy.width * 0.5,
						y: new_enemy.y + new_enemy.height * 0.5,
						scale: (new_enemy.width / new_enemy.sprite_width) * 1.5,
						play_sound: false,
					})
				);
			}

			//add enemy to list
			this.enemy_list.push(new_enemy);

			//sort enemy base on width
			this.enemy_list.sort((a, b) => a.width - b.width);

			//reset timer
			let tmp_enemy_interval = 3000 - this.game_level * 10;
			this.enemy_interval = Math.random() * tmp_enemy_interval + tmp_enemy_interval;
			this.enemy_index = 0;
		} else this.enemy_index += delta_time;

		//particle and explosion
		[...this.particle2_list, ...this.particle_list, ...this.explosion_list].forEach((i) => {
			//update location
			i.update({ delta_time });

			//update location base on player speed
			i.set_position(this.player.speed);
		});

		//floating score
		this.score_list.forEach((i) => {
			//update location
			i.update();

			//add to score if floating score deleted
			if (i.mark_delete) {
				this.score_value += i.value;
				this.score_text = this.score_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		});

		//enemy location
		this.enemy_list.forEach((i) => {
			//update location
			i.update({ delta_time });

			//update location base on player speed
			i.set_position(this.player.speed);

			//mark delete of out of screen
			if (i.x < 0 - i.width) i.mark_delete = true;

			//add particle
			if (i.have_particle) {
				this.particle_list.push(
					new particle({
						x: i.x + i.width * 0.5 + Math.random() * 50 - 25,
						y: i.y + i.height * 0.5 + Math.random() * 30 - 15,
						size: i.width * 0.5,
						color: i.uid_text,
					})
				);
			}
		});

		//check collision
		this.collision_detection();

		//remove mark delete
		this.score_list = this.score_list.filter((i) => !i.mark_delete);
		this.enemy_list = this.enemy_list.filter((i) => !i.mark_delete);
		this.particle_list = this.particle_list.filter((i) => !i.mark_delete);
		this.particle2_list = this.particle2_list.filter((i) => !i.mark_delete);
		this.explosion_list = this.explosion_list.filter((i) => !i.mark_delete);
	}

	draw() {
		[this.bg, this.player, ...this.score_list, ...this.particle2_list, ...this.particle_list, ...this.explosion_list, ...this.enemy_list].forEach((i) => {
			i.draw({ ctx: this.ctx });
		});
	}

	game_stop_listener = (event: KeyboardEvent) => {
		if (event.key === " ") {
			if (this.game_up || this.game_over) {
				event.preventDefault();
				event.stopPropagation();

				if (this.game_over) this.game_start();
				if (this.game_up) this.game_level_up();
			}
		} else if (event.key === "Enter") {
			if (!this.game_up && !this.game_over) {
				event.preventDefault();
				event.stopPropagation();

				if (!this.game_pause) this.game_pause = true;
				else if (this.game_pause) this.game_continue();
			}
		}
	};

	animate(timestamp: number) {
		this.update(timestamp);

		this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

		this.draw();
		this.draw_status();

		if (!this.game_over && !this.game_pause && !this.game_up) {
			requestAnimationFrame((timestamp) => {
				this.animate(timestamp);
			});
		}
	}
}
