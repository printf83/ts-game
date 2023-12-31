import { baseBg } from "./baseBg.js";
import { bg1 } from "./bg1.js";
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
import {
	MathFloor,
	MathRandom,
	clearArray,
	clear_text,
	draw_clear_text,
	draw_text,
	isFullscreen,
	isTouchDevice,
	read_random_index,
} from "./util.js";
import { input } from "./input.js";
import { score } from "./score.js";
import { dust } from "./dust.js";
import { control } from "./control.js";
import { gui } from "./gui.js";
import { COLOR } from "./asset.js";
import { shadow } from "./shadow.js";

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
const enemy_type = [
	"enemy1",
	"enemy2",
	"enemy3",
	"enemy4",
	"enemy5",
	"enemy6",
	"enemy7",
	"enemy8",
	"enemy9",
	"enemy10",
	"enemy11",
];
// const enemy_type = ["enemy4"];
// const enemy_type = ["enemy8", "enemy11"];
// const enemy_type = ["enemy9", "enemy10", "enemy11"];

export class game {
	CURRENT_ANIMATION_ID = MathRandom();

	canvas_game: HTMLCanvasElement;
	canvas_static: HTMLCanvasElement;
	canvas_value: HTMLCanvasElement;
	canvas_control: HTMLCanvasElement;
	canvas_pointer: HTMLCanvasElement;
	canvas_mark: HTMLCanvasElement;

	ctx_game: CanvasRenderingContext2D;
	ctx_static: CanvasRenderingContext2D;
	ctx_value: CanvasRenderingContext2D;
	ctx_control: CanvasRenderingContext2D;
	ctx_pointer: CanvasRenderingContext2D;
	ctx_mark: CanvasRenderingContext2D;

	canvas_width: number;
	canvas_height: number;
	base_height: number;

	ctl: control;
	gui: gui;
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
	shadow_list: shadow[] = [];
	score_list: score[] = [];
	progress_list: progress[] = [];

	dust_max: number = 50;
	fire_max: number = 50;
	debug: boolean = false;

	game_up: boolean = false;
	game_over: boolean = false;
	game_timeout: boolean = false;
	game_pause: boolean = false;
	game_ready: boolean = false;
	game_fps: number = 0;
	game_fps_list: number[] = [];

	score_value: number = 0;
	score_text: string = "0";
	progress_index: number = 0;
	progress_max: number = 1000;
	progress_timer: number = 0;
	progress_timer_index: number = 0;
	game_level: number = 1;

	enemy_max: number = 5;
	enemy_index: number = 0;
	enemy_interval: number = 0;
	enemy_interval_max: number = 2000;

	constructor(opt: {
		canvas_game: HTMLCanvasElement;
		canvas_static: HTMLCanvasElement;
		canvas_value: HTMLCanvasElement;
		canvas_control: HTMLCanvasElement;
		canvas_pointer: HTMLCanvasElement;
		canvas_mark: HTMLCanvasElement;

		debug?: boolean;
	}) {
		this.canvas_game = opt.canvas_game;
		this.canvas_static = opt.canvas_static;
		this.canvas_value = opt.canvas_value;
		this.canvas_control = opt.canvas_control;
		this.canvas_pointer = opt.canvas_pointer;
		this.canvas_mark = opt.canvas_mark;

		this.ctx_game = opt.canvas_game.getContext("2d", { alpha: false })!;
		this.ctx_static = opt.canvas_static.getContext("2d")!;
		this.ctx_value = opt.canvas_value.getContext("2d")!;
		this.ctx_control = opt.canvas_control.getContext("2d")!;
		this.ctx_pointer = opt.canvas_pointer.getContext("2d")!;
		this.ctx_mark = opt.canvas_mark.getContext("2d")!;

		this.canvas_width = opt.canvas_game.width;
		this.canvas_height = opt.canvas_game.height;

		opt.debug ??= false;
		this.debug = opt.debug;

		this.input = new input({ debug: this.debug });
		this.ctl = new control({
			game: this,
			canvas_control: this.canvas_control,
			canvas_mark: this.canvas_mark,
			canvas_pointer: this.canvas_pointer,
			ctx_control: this.ctx_control,
			ctx_mark: this.ctx_mark,
			ctx_pointer: this.ctx_pointer,
			canvas_width: this.canvas_width,
			canvas_height: this.canvas_height,
			debug: this.debug,
		});
		this.gui = new gui({
			ctx: this.ctx_static,
			canvas_width: this.canvas_width,
			canvas_height: this.canvas_height,
			debug: this.debug,
		});
		this.bg = new bg1({
			ctx: this.ctx_game,
			canvas_width: this.canvas_width,
			canvas_height: this.canvas_height,
		});
		this.base_height = this.canvas_height - this.bg.ground;
		this.player = new player({
			game: this,
			ctx: this.ctx_game,
			canvas_width: this.canvas_width,
			canvas_height: this.base_height,
			x: isTouchDevice() ? this.canvas_width * 0.25 : this.canvas_width * 0.1,
			debug: this.debug,
		});

		this.prg_game = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5,
			y: 60,
			min: 0,
			max: this.progress_max,
			width: this.canvas_width * 0.4,
			value: this.progress_index,
			bar_color: [`rgb(${COLOR.red})`, `rgb(${COLOR.yellow})`, `rgb(${COLOR.green})`],
		});
		this.prg_life = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width - 130,
			y: 30,
			width: 100,
			value: this.player.life,
			max: 100,
			bar_color: [`rgb(${COLOR.red})`, `rgb(${COLOR.yellow})`, `rgb(${COLOR.green})`],
		});
		this.prg_power = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width - 130,
			y: 60,
			width: 100,
			value: this.player.power,
			max: 100,
			bar_color: [`rgb(${COLOR.red})`, `rgb(${COLOR.yellow})`, `rgb(${COLOR.green})`],
		});

		//game halt listener
		window.addEventListener("keyup", this.game_halt_listener);

		//draw control

		this.draw_gui();
	}

	draw_gui() {
		requestIdleCallback(() => {
			this.gui.draw();
			this.ctl.draw_gui();

			if (isTouchDevice()) {
				this.ctl.draw_control();
				this.ctl.draw_arrow();

				this.ctl.attach_touch({
					canvas_mark: this.canvas_mark,
					marker_ctx: this.ctx_mark,
					pointer_ctx: this.ctx_pointer,
					control_ctx: this.ctx_control,
					debug: this.debug,
				});
			} else {
				if (this.debug) {
					this.ctl.draw_control();
					this.ctl.draw_arrow();
				}

				this.ctl.attach_mouse({
					canvas_mark: this.canvas_mark,
					marker_ctx: this.ctx_mark,
					pointer_ctx: this.ctx_pointer,
					control_ctx: this.ctx_control,
					debug: this.debug,
				});
			}
		});
	}

	resize() {
		this.ctl.resize();
	}

	gen_enemy_interval() {
		return this.enemy_interval_max - this.game_level * 100;
	}

	game_bg() {
		this.clean_ctx_value_message();

		if (this.game_level % 2 === 0) {
			this.bg = new bg2({
				ctx: this.ctx_game,
				canvas_width: this.canvas_width,
				canvas_height: this.canvas_height,
			});
		} else {
			this.bg = new bg2({
				ctx: this.ctx_game,
				canvas_width: this.canvas_width,
				canvas_height: this.canvas_height,
			});
		}

		this.base_height = this.canvas_height - this.bg.ground;
		this.player.canvas_height = this.base_height;
	}

	add_player_shadow() {
		this.shadow_list.push(
			new shadow({
				ctx: this.ctx_game,
				ground: this.base_height,
				element: this.player,
			})
		);
	}

	game_start(opt?: {
		game_score: number;
		game_level: number;
		player_life: number;
		player_power: number;
	}) {
		opt ??= {
			game_score: 0,
			game_level: 1,
			player_life: 100,
			player_power: 0,
		};

		this.game_level = opt.game_level;

		this.game_bg();

		this.progress_index = 0;
		this.progress_max = 1000 + this.game_level * 100;
		this.progress_timer = performance.now() + 120000;
		this.progress_timer_index = 120;

		this.enemy_index = 0;

		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		clearArray(this.enemy_list);
		clearArray(this.explosion_list);
		clearArray(this.dust_list);
		clearArray(this.fire_list);
		clearArray(this.shadow_list);
		clearArray(this.score_list);

		this.player.set_state("idle");
		this.player.life = opt.player_life;
		if (this.player.life > 100) this.player.life = 100;
		this.player.power = opt.player_power;
		this.player.speed = 0;
		this.player.max_speed = 14 + this.game_level;
		this.player.weight = 1;
		this.player.velocity_y = 0;
		this.player.y = this.base_height - this.player.height;
		this.player.powered = false;
		this.player.invulnerable = false;

		this.score_value = opt.game_score;
		this.score_text = opt.game_score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		this.draw_life();
		this.draw_timer();
		this.draw_score();
		this.draw_level();
		this.add_player_shadow();

		// this.ctl.draw_pause();

		// if (isTouchDevice() || this.debug) {
		// 	this.ctl.draw_control();
		// 	this.ctl.draw_arrow();
		// }

		this.check_fps(24, 0, this.CURRENT_ANIMATION_ID, (timestamp, animation_id) => {
			this.game_over = false;
			this.game_timeout = false;
			this.game_pause = false;

			this.ctl.clear_control();
			this.ctl.clear_arrow();
			this.ctl.draw_start();

			this.clean_ctx_value_message();
			this.animate(timestamp, animation_id);
			this.game_ready = true;

			// this.ctl.clear_control();
			// this.ctl.clear_arrow();
		});
	}

	game_level_up() {
		this.game_level++;

		this.game_bg();

		this.progress_index = 0;
		this.progress_max = 1000 + this.game_level * 100;
		this.progress_timer = performance.now() + 120000;
		this.progress_timer_index = 120;

		this.enemy_index = 0;

		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		clearArray(this.enemy_list);
		clearArray(this.explosion_list);
		clearArray(this.dust_list);
		clearArray(this.shadow_list);
		clearArray(this.fire_list);

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

		this.draw_life();
		this.draw_timer();
		this.draw_level();
		this.ctl.draw_pause();
		this.add_player_shadow();

		if (isTouchDevice() || this.debug) {
			this.ctl.draw_control();
			this.ctl.draw_arrow();
		}

		this.check_fps(24, 0, this.CURRENT_ANIMATION_ID, (timestamp, animation_id) => {
			this.game_up = false;

			this.player.set_state("run");

			this.animate(timestamp, animation_id);
		});
	}

	game_continue() {
		this.progress_timer = performance.now() + this.progress_timer_index * 1000;

		this.ctl.draw_pause();
		if (isTouchDevice() || this.debug) {
			this.ctl.draw_control();
			this.ctl.draw_arrow();
		}

		this.check_fps(24, 0, this.CURRENT_ANIMATION_ID, (timestamp, animation_id) => {
			this.game_pause = false;
			this.game_ready = false;
			this.clean_ctx_value_message();

			this.animate(timestamp, animation_id);
		});
	}

	add_explosion(enemy: baseEnemy, play_sound: boolean) {
		this.explosion_list.push(
			new explosion({
				ctx: this.ctx_game,
				x: enemy.x + enemy.width * 0.5,
				y: enemy.y + enemy.height * 0.5,
				scale: enemy.width * 0.008,
				play_sound: play_sound,
			})
		);
	}

	add_floating_score(enemy: baseEnemy, deduction: boolean) {
		let point = MathFloor(
			(100 - (enemy.y / (enemy.canvas_height - enemy.height + this.base_height)) * 100) *
				0.1 *
				enemy.point
		);

		if (deduction && point > 0) point *= -1;
		if (!deduction && point < 0) point *= -1;

		this.score_list.push(
			new score({
				ctx: this.ctx_game,
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
								this.draw_life();
							} else if (this.player.life > 0) {
								this.player.life -= 10;
								this.player.set_state("dizzy");
								this.draw_life();
							} else {
								this.player.set_state("ko");
								setTimeout(() => {
									this.set_game_over();
								}, 500);
							}
						}

						if (!this.game_over && !this.game_timeout) {
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

	last_draw_message_title: string = "";
	last_draw_message_message: string = "";
	draw_message(title: string, message: string, color: string) {
		this.last_draw_message_title = title;
		this.last_draw_message_message = message;
		if (this.debug) this.clear_message(title, message);

		draw_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 - 20,
			text: title,
			font_weight: 60,
			text_align: "center",
			text_color: color,
			debug: this.debug,
		});
		draw_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 + 20,
			text: message,
			font_weight: 30,
			text_align: "center",
			text_color: color,
			debug: this.debug,
		});
	}

	clear_message(title: string, message: string) {
		clear_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 - 20,
			text: title,
			font_weight: 60,
			text_align: "center",
			debug: this.debug,
		});
		clear_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 + 20,
			text: message,
			font_weight: 30,
			text_align: "center",
			debug: this.debug,
		});
	}

	clean_ctx_value_message() {
		this.clear_message(this.last_draw_message_title, this.last_draw_message_message);
	}

	draw_level() {
		//level
		draw_clear_text({
			ctx: this.ctx_value,
			x: (this.canvas_width - this.prg_game.width) * 0.5,
			y: 50,
			text: `Level ${this.game_level}`,
			text_align: "start",
			font_weight: 25,
			debug: this.debug,
		});
	}

	draw_timer() {
		//timer
		draw_clear_text({
			ctx: this.ctx_value,
			x: (this.canvas_width + this.prg_game.width) * 0.5,
			y: 50,
			text: `${new Date(this.progress_timer_index * 1000).toISOString().substring(15, 19)}`,
			text_align: "end",
			text_color:
				this.progress_timer_index < 20 ? `rgb(${COLOR.red})` : `rgb(${COLOR.light})`,
			font_weight: 25,
			debug: this.debug,
		});
	}

	draw_score() {
		//score
		draw_clear_text({
			ctx: this.ctx_value,
			x: 90,
			y: 80,
			text: `${this.score_text}`,
			text_color: this.score_value < 0 ? `rgb(${COLOR.red})` : `rgb(${COLOR.light})`,
			font_weight: 60,
			debug: this.debug,
		});
	}

	draw_life() {
		//life
		this.prg_life.update(this.player.life);
		this.prg_life.draw();
	}

	draw_power() {
		//life
		this.prg_power.update(this.player.power);
		this.prg_power.draw();
	}

	draw_progress() {
		//life
		this.prg_game.update(this.progress_index, 0, this.progress_max);
		this.prg_game.draw();
	}

	draw_status() {
		this.draw_progress();
		this.draw_power();

		//game over message
		if (this.game_over)
			this.draw_message(
				"Game over!",
				isTouchDevice() ? "Press START to try again." : "Press START/ENTER to try again.",
				`rgb(${COLOR.red})`
			);

		//game timeout message
		if (this.game_timeout)
			this.draw_message(
				"Times up!",
				isTouchDevice() ? "Press START to try again." : "Press START/ENTER to try again.",
				`rgb(${COLOR.red})`
			);

		//game level up
		if (this.game_up)
			this.draw_message(
				`Level ${this.game_level} complete!`,
				isTouchDevice() ? "Press START to continue." : "Press START/ENTER to continue.",
				`rgb(${COLOR.green})`
			);

		//pause
		if (this.game_pause)
			this.draw_message(
				`Pause!`,
				isTouchDevice() ? "Press START to continue." : "Press START/ENTER to continue.",
				`rgb(${COLOR.light})`
			);

		//ready
		if (this.game_ready)
			this.draw_message(
				`Are you ready?`,
				isTouchDevice() ? "Press START to continue." : "Press START/ENTER to continue.",
				`rgb(${COLOR.green})`
			);
	}

	set_game_over() {
		this.ctl.clear_control();
		this.ctl.clear_arrow();
		this.ctl.draw_start();

		this.game_over = true;
		this.canvas_game.dispatchEvent(new CustomEvent("game_over"));
	}

	set_game_up() {
		this.ctl.clear_control();
		this.ctl.clear_arrow();
		this.ctl.draw_start();

		this.game_up = true;

		//get score
		let fly_score = 0;
		this.score_list.forEach((i) => {
			fly_score += i.value;
		});

		this.canvas_game.dispatchEvent(
			new CustomEvent("game_up", {
				detail: {
					game_score: this.score_value + fly_score,
					game_level: this.game_level + 1,
					player_life: this.player.life + 10,
					player_power: this.player.power,
				},
			})
		);
	}

	last_timestamp: number = 0;
	update(timestamp: number) {
		const delta_time = timestamp - this.last_timestamp;
		this.last_timestamp = timestamp;

		//update game progress
		this.progress_index += this.player.speed * 0.1;
		if (this.progress_index >= this.progress_max) {
			this.score_list.push(
				new score({
					ctx: this.ctx_game,
					text: `+${this.progress_timer_index.toString().padStart(2, "0")}`,
					value: this.progress_timer_index,
					x: (this.canvas_width + this.prg_game.width) * 0.5 - 120,
					y: 25,
					destination_x: 90,
					destination_y: 60,
				})
			);

			this.set_game_up();
		}

		//update game timeout
		this.progress_timer_index = MathFloor((this.progress_timer - timestamp) * 0.001);
		if (this.progress_timer_index > 120) this.progress_timer_index = 120;

		if (this.progress_timer_index <= 0) {
			this.ctl.clear_control();
			this.ctl.clear_arrow();
			this.ctl.draw_start();

			this.game_timeout = true;
		} else {
			this.draw_timer();
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
				.fill(0)
				.forEach((_i) => {
					this.fire_list.unshift(
						new fire({
							ctx: this.ctx_game,
							x: this.player.x + 50 + MathRandom() * 10 - 10,
							y: this.player.y + 100 + MathRandom() * 10 - 10,
						})
					);
				});
		}

		//add enemy
		if (this.enemy_index >= this.enemy_interval) {
			if (this.enemy_list.length <= this.enemy_max) {
				//choose enemy
				const random_enemy_index = enemy_type[MathFloor(MathRandom() * enemy_type.length)];

				//create new enemy
				const enemy_object = enemyDB[random_enemy_index as enemyDBType];
				const new_enemy = new enemy_object({
					ctx: this.ctx_game,
					canvas_width: this.canvas_width,
					canvas_height: this.base_height,
					debug: this.debug,
				});

				if (this.player.speed > 0 || (this.player.speed === 0 && new_enemy.can_move)) {
					//add explosion if explode in
					if (new_enemy.explode_in) {
						this.explosion_list.push(
							new explosion({
								ctx: this.ctx_game,
								x: new_enemy.x + new_enemy.width * 0.5,
								y: new_enemy.y + new_enemy.height * 0.5,
								scale: (new_enemy.width / new_enemy.sprite_width) * 1.5,
								play_sound: false,
							})
						);
					}

					//add shadow for new enemy
					if (new_enemy.have_shadow && this.bg.support_shadow) {
						this.shadow_list.push(
							new shadow({
								ctx: this.ctx_game,
								ground: this.base_height,
								element: new_enemy,
							})
						);
					}

					//add enemy to list
					this.enemy_list.push(new_enemy);

					//sort enemy base on width
					this.enemy_list.sort((a, b) => a.width - b.width);
				}
			}

			//reset timer
			let tmp_enemy_interval = this.gen_enemy_interval();
			this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;
			this.enemy_index = 0;
		} else this.enemy_index += delta_time;

		//fire, particle and explosion
		[...this.fire_list, ...this.dust_list, ...this.shadow_list, ...this.explosion_list].forEach(
			(i) => {
				//update location
				i.update({ delta_time });

				//update location base on player speed
				i.set_position({ game_speed: this.player.speed });
			}
		);

		//floating score
		this.score_list.forEach((i) => {
			//update location
			i.update();

			//add to score if floating score deleted
			if (i.mark_delete) {
				this.score_value += i.value;
				this.score_text = this.score_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				this.draw_score();
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
						ctx: this.ctx_game,
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
		this.shadow_list = this.shadow_list.filter((i) => !i.mark_delete);
		this.fire_list = this.fire_list.filter((i) => !i.mark_delete);
		this.explosion_list = this.explosion_list.filter((i) => !i.mark_delete);
		this.enemy_list = this.enemy_list.filter((i) => !i.mark_delete);

		//remove overflow particle
		if (this.dust_list.length > this.dust_max)
			this.dust_list = this.dust_list.slice(0, this.dust_max);
		if (this.fire_list.length > this.fire_max)
			this.fire_list = this.fire_list.slice(0, this.fire_max);
	}

	draw() {
		[
			this.bg,
			...this.fire_list,
			...this.dust_list,
			...this.shadow_list,
			...this.score_list,
			...this.enemy_list,
			this.player,
			...this.explosion_list,
		].forEach((i) => {
			i.draw();
		});
	}

	game_halt_listener = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();

			if (
				this.game_up ||
				this.game_over ||
				this.game_timeout ||
				this.game_pause ||
				this.game_ready
			) {
				if (this.game_over || this.game_timeout) this.game_start();
				if (this.game_up) this.game_level_up();
				if (this.game_pause) this.game_continue();
				if (this.game_ready) this.game_continue();
			} else {
				this.ctl.clear_control();
				this.ctl.clear_arrow();
				this.ctl.draw_start();
				this.game_pause = true;
			}
		} else if (event.key === "F11") {
			event.preventDefault();
			event.stopPropagation();

			if (isFullscreen()) {
				document
					.exitFullscreen()
					.then(() => {
						if (!isFullscreen()) this.ctl.draw_fullscreen();
					})
					.catch((reason) => {
						console.log(reason);
					});
			} else {
				const container = this.canvas_game.parentElement as HTMLDivElement;
				container
					.requestFullscreen({ navigationUI: "hide" })
					.then(() => {
						if (isFullscreen()) this.ctl.draw_normalscreen();
					})
					.catch((reason) => {
						console.log(reason);
					});
			}
		}
	};

	last_fps_timestamp: number = 0;
	check_fps(
		min_fps: number,
		timestamp: number,
		animation_id: number,
		callback: (timestamp: number, animation_id: number) => void
	) {
		const last_second = timestamp - 1000;
		if (this.game_fps_list.length > 0)
			this.game_fps_list = this.game_fps_list.filter((i) => i > last_second);
		this.game_fps_list.push(timestamp);
		this.game_fps = this.game_fps_list.length;

		if (this.game_fps >= min_fps) callback(timestamp, animation_id);
		else {
			requestAnimationFrame((timestamp) => {
				if (this.CURRENT_ANIMATION_ID === animation_id)
					this.check_fps(min_fps, timestamp, animation_id, callback);
			});
		}
	}

	debug_info() {
		//generate function for easy populate debug info
		let text_y = 120;
		let text_y_index = 0;
		const gen_text = (x: number, text: string, text_color?: string) => {
			draw_clear_text({
				ctx: this.ctx_value,
				x: x,
				y: text_y + text_y_index++ * 25,
				shadow_blur: 0,
				text: text,
				text_color: text_color ? text_color : `rgb(${COLOR.yellow})`,
				font_family: "Arial",
				font_weight: 20,
				debug: this.debug,
			});
		};

		gen_text(
			78,
			`${this.game_fps}`,
			this.game_fps < 30 ? `rgb(${COLOR.red})` : `rgb(${COLOR.yellow})`
		);
		gen_text(80, `${this.dust_list.length}`);
		gen_text(73, `${this.fire_list.length}`);
		gen_text(125, `${this.explosion_list.length}`);
		gen_text(100, `${this.enemy_list.length}`);
		gen_text(90, `${this.score_list.length}`);
		gen_text(115, `${read_random_index()}`);
	}

	do_animate = (timestamp: number, animation_id: number) => {
		//update object
		this.update(timestamp);

		//draw object
		this.draw();

		//draw status
		this.draw_status();

		//count fps
		if (this.debug) this.debug_info();

		if (
			!this.game_over &&
			!this.game_timeout &&
			!this.game_pause &&
			!this.game_ready &&
			!this.game_up
		) {
			requestAnimationFrame((timestamp) => {
				if (this.CURRENT_ANIMATION_ID === animation_id)
					this.animate(timestamp, animation_id);
				else {
					console.log({
						animation_id1: this.CURRENT_ANIMATION_ID,
						animation_id2: animation_id,
					});
				}
			});
		} else {
			this.CURRENT_ANIMATION_ID = MathRandom();
		}
	};

	animate(timestamp: number, animation_id: number) {
		if (this.debug) this.check_fps(0, timestamp, animation_id, this.do_animate);
		else this.do_animate(timestamp, animation_id);
	}
}
