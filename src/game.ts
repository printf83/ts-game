const DEBUG = false;

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
import { fire } from "./fire.js";
import { player } from "./player.js";
import { progress } from "./progress.js";
import { MathFloor, MathRandom, draw_text, read_random_index } from "./util.js";
import { input } from "./input.js";
import { score } from "./score.js";
import { dust } from "./dust.js";

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
// const enemy_type = ["enemy4"];
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
	dust_list: dust[] = [];
	fire_list: fire[] = [];
	score_list: score[] = [];
	progress_list: progress[] = [];

	dust_max: number = 50;
	fire_max: number = 50;
	fps_min: number = 30;
	debug: boolean = DEBUG;

	game_up: boolean = false;
	game_over: boolean = false;
	game_pause: boolean = false;
	game_fps: number = 0;
	game_fps_list: number[] = [];

	score_value: number = 0;
	score_text: string = "0";
	progress_index: number = 0;
	progress_max: number = 1000;
	game_level: number = 1;

	enemy_index: number = 0;
	enemy_interval: number = 0;
	enemy_interval_max: number = 1000;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;

		canvas_width: number;
		canvas_height: number;
	}) {
		this.ctx = opt.ctx;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.input = new input();
		this.bg = new bg2({ canvas_width: this.canvas_width, canvas_height: this.canvas_height });
		this.base_height = this.canvas_height - this.bg.ground;
		this.player = new player({ canvas_width: this.canvas_width, canvas_height: this.base_height, debug: this.debug });

		this.prg_game = new progress({
			x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5,
			y: 45,
			min: 0,
			max: this.progress_max,
			width: this.canvas_width * 0.4,
			value: this.progress_index,
			bar_color: ["red", "yellow", "green"],
		});
		this.prg_life = new progress({
			x: this.canvas_width - 130,
			y: 30,
			width: 100,
			value: this.player.life,
			max: 100,
			bar_color: ["red", "yellow", "green"],
		});
		this.prg_power = new progress({
			x: this.canvas_width - 130,
			y: 60,
			width: 100,
			value: this.player.power,
			max: 100,
			bar_color: ["red", "yellow", "green"],
		});
	}

	gen_enemy_interval() {
		return this.enemy_interval_max - this.game_level * 100;
	}

	game_start() {
		this.game_level = 1;

		this.progress_index = 0;
		this.progress_max = 1000;
		this.enemy_index = 0;
		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list.length = 0; // = [];
		this.explosion_list.length = 0; // = [];
		this.dust_list.length = 0; // = [];
		this.fire_list.length = 0; // = [];
		this.score_list.length = 0; // = [];

		this.player.set_state("idle");
		this.player.life = 100;
		this.player.power = 0;
		this.player.speed = 0;
		this.player.max_speed = 14 + this.game_level;
		this.player.weight = 1;
		this.player.velocity_y = 0;
		this.player.y = this.base_height - this.player.height;
		this.player.powered = false;
		this.player.invulnerable = false;

		this.score_value = 0;
		this.score_text = "0";

		window.removeEventListener("keyup", this.game_stop_listener);
		window.addEventListener("keyup", this.game_pause_listener);

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

		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list.length = 0; //= [];
		this.explosion_list.length = 0; // = [];
		this.dust_list.length = 0; // = [];
		this.fire_list.length = 0; // = [];

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

		window.removeEventListener("keyup", this.game_stop_listener);
		window.addEventListener("keyup", this.game_pause_listener);

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

	add_explosion(enemy: baseEnemy, play_sound: boolean) {
		this.explosion_list.push(
			new explosion({
				x: enemy.x + enemy.width * 0.5,
				y: enemy.y + enemy.height * 0.5,
				scale: enemy.width * 0.008,
				play_sound: play_sound,
			})
		);
	}

	add_floating_score(enemy: baseEnemy, deduction: boolean) {
		let point = MathFloor((100 - (enemy.y / (enemy.canvas_height - enemy.height + this.base_height)) * 100) * 0.1 * enemy.point);

		if (deduction && point > 0) point *= -1;
		if (!deduction && point < 0) point *= -1;

		this.score_list.push(
			new score({
				text: `${point > 0 ? "+" : ""}${point}`,
				value: point,
				x: enemy.x + enemy.width * 0.5,
				y: enemy.y + enemy.height * 0.5,
				destination_x: 90,
				destination_y: 60,
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

						this.add_explosion(i, true);
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
									window.removeEventListener("keyup", this.game_pause_listener);
									window.addEventListener("keyup", this.game_stop_listener);
								}, 1500);
							}
						}

						if (!this.game_over) {
							i.explode_out = false;

							this.add_explosion(i, false);
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
			y: 60,
			text: `🎮`,
			shadow_blur: 0,
			font_weight: 40,
		});
		draw_text({
			ctx: this.ctx,
			x: 90,
			y: 60,
			text: `${this.score_text}`,
			text_color: this.score_value < 0 ? "red" : "white",
			font_weight: 40,
		});

		//progress
		draw_text({
			ctx: this.ctx,
			x: this.canvas_width * 0.5,
			y: 35,
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
			shadow_blur: 0,
		});
		this.prg_life.update(this.player.life);

		//power
		draw_text({
			ctx: this.ctx,
			x: this.canvas_width - 150,
			y: 75,
			text: `🚀`,
			text_align: "end",
			shadow_blur: 0,
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
		if (this.progress_index >= this.progress_max) {
			this.game_up = true;
			window.removeEventListener("keyup", this.game_pause_listener);
			window.addEventListener("keyup", this.game_stop_listener);
		}

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
					this.fire_list.unshift(
						new fire({
							x: this.player.x - 40 + MathRandom() * 10 - 10,
							y: this.player.y + 25 + MathRandom() * 10 - 10,
						})
					);
				});
		}

		//add enemy
		if (this.enemy_index >= this.enemy_interval) {
			//choose enemy
			const random_enemy_index = enemy_type[MathFloor(MathRandom() * enemy_type.length)];

			//create new enemy
			const enemy_object = enemyDB[random_enemy_index as enemyDBType];
			const new_enemy = new enemy_object({ canvas_width: this.canvas_width, canvas_height: this.base_height, debug: this.debug });

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
			let tmp_enemy_interval = this.gen_enemy_interval();
			this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;
			this.enemy_index = 0;
		} else this.enemy_index += delta_time;

		//fire, particle and explosion
		[...this.fire_list, ...this.dust_list, ...this.explosion_list].forEach((i) => {
			//update location
			i.update({ delta_time });

			//update location base on player speed
			i.set_position({ game_speed: this.player.speed });
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
			i.set_position({ game_speed: this.player.speed });

			//mark delete of out of screen
			if (i.x < 0 - i.width) i.mark_delete = true;
			else {
				if (i.mark_delete && i.explode_out) this.add_explosion(i, false);
			}

			//add particle
			if (i.have_particle) {
				this.dust_list.unshift(
					new dust({
						x: i.x + i.width * 0.5 + MathRandom() * 50 - 25,
						y: i.y + i.height * 0.5 + MathRandom() * 30 - 15,
						color: `rgba(${i.uid_number},0.2)`,
					})
				);
			}
		});

		//check collision
		this.collision_detection();

		//remove mark delete
		this.score_list = this.score_list.filter((i) => !i.mark_delete);
		this.dust_list = this.dust_list.filter((i) => !i.mark_delete);
		this.fire_list = this.fire_list.filter((i) => !i.mark_delete);
		this.explosion_list = this.explosion_list.filter((i) => !i.mark_delete);
		this.enemy_list = this.enemy_list.filter((i) => !i.mark_delete);

		//remove overflow particle
		if (this.dust_list.length > this.dust_max) this.dust_list = this.dust_list.slice(0, this.dust_max);
		if (this.fire_list.length > this.fire_max) this.fire_list = this.fire_list.slice(0, this.fire_max);
	}

	draw() {
		[
			this.bg,
			...this.fire_list,
			...this.dust_list,
			...this.score_list,
			...this.enemy_list,
			this.player,
			...this.explosion_list,
		].forEach((i) => {
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
		}
	};

	game_pause_listener = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			if (!this.game_up && !this.game_over) {
				event.preventDefault();
				event.stopPropagation();

				if (!this.game_pause) this.game_pause = true;
				else if (this.game_pause) this.game_continue();
			}
		}
	};

	is_enough_fps(timestamp: number, callback: (timestamp: number) => void) {
		const last_second = timestamp - 1000;
		if (this.game_fps_list.length > this.fps_min) this.game_fps_list = this.game_fps_list.filter((i) => i > last_second);
		this.game_fps_list.push(timestamp);
		this.game_fps = this.game_fps_list.length;

		if (this.game_fps >= this.fps_min) callback(timestamp);
		else {
			requestAnimationFrame((timestamp) => {
				this.is_enough_fps(timestamp, callback);
			});
		}
	}

	debug_info() {
		let text_y = 100;
		let text_y_index = 0;
		const gen_text = (text: string, text_color?: string) => {
			draw_text({
				ctx: this.ctx,
				x: 20,
				y: text_y + text_y_index++ * 20,
				shadow_blur: 0,
				text: text,
				text_color: text_color ? text_color : "yellow",
				font_family: "Arial",
				font_weight: 15,
			});
		};

		gen_text(`FPS : ${this.game_fps}`, this.game_fps < 30 ? "red" : "yellow");
		gen_text(`Dust : ${this.dust_list.length}`);
		gen_text(`Fire : ${this.fire_list.length}`);
		gen_text(`Explosion : ${this.explosion_list.length}`);
		gen_text(`Enemy : ${this.enemy_list.length}`);
		gen_text(`Score : ${this.score_list.length}`);
		gen_text(`Random : ${read_random_index()}`);
	}

	do_animate = (timestamp: number) => {
		//clear canvas
		this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

		//update object
		this.update(timestamp);

		//draw object
		this.draw();

		//draw status
		this.draw_status();

		//count fps
		if (this.debug) this.debug_info();

		if (!this.game_over && !this.game_pause && !this.game_up) {
			requestAnimationFrame((timestamp) => {
				this.animate(timestamp);
			});
		}
	};

	animate(timestamp: number) {
		if (this.debug) this.is_enough_fps(timestamp, this.do_animate);
		else this.do_animate(timestamp);
	}
}