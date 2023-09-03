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
import { MathFloor, MathRandom, clear_text, draw_clear_text, draw_text, isFullscreen, isTouchDevice, read_random_index } from "./util.js";
import { input } from "./input.js";
import { score } from "./score.js";
import { dust } from "./dust.js";
import { control } from "./control.js";
import { gui } from "./gui.js";

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
	score_list: score[] = [];
	progress_list: progress[] = [];

	dust_max: number = 50;
	fire_max: number = 50;
	fps_min: number = 30;
	debug: boolean = false;

	game_up: boolean = false;
	game_over: boolean = false;
	game_timeout: boolean = false;
	game_pause: boolean = false;
	game_fps: number = 0;
	game_fps_list: number[] = [];

	score_value: number = 0;
	score_text: string = "0";
	progress_index: number = 0;
	progress_max: number = 1000;
	progress_timer: number = 0;
	progress_timer_index: number = 0;
	game_level: number = 1;

	enemy_index: number = 0;
	enemy_interval: number = 0;
	enemy_interval_max: number = 3000;

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

		this.ctx_game = opt.canvas_game.getContext("2d")!;
		this.ctx_static = opt.canvas_static.getContext("2d")!;
		this.ctx_value = opt.canvas_value.getContext("2d")!;
		this.ctx_control = opt.canvas_control.getContext("2d")!;
		this.ctx_pointer = opt.canvas_pointer.getContext("2d")!;
		this.ctx_mark = opt.canvas_mark.getContext("2d")!;

		this.canvas_width = opt.canvas_game.width;
		this.canvas_height = opt.canvas_game.height;

		opt.debug ??= false;
		this.debug = opt.debug;

		this.input = new input();
		this.ctl = new control({
			canvas_control: this.canvas_control,
			canvas_mark: this.canvas_mark,
			canvas_pointer: this.canvas_pointer,
			ctx_control: this.ctx_control,
			ctx_mark: this.ctx_mark,
			ctx_pointer: this.ctx_pointer,
			canvas_width: this.canvas_width,
			canvas_height: this.canvas_height,
		});
		this.gui = new gui({ ctx: this.ctx_static, canvas_width: this.canvas_width, canvas_height: this.canvas_height, debug: this.debug });
		this.bg = new bg2({ ctx: this.ctx_game, canvas_width: this.canvas_width, canvas_height: this.canvas_height });
		this.base_height = this.canvas_height - this.bg.ground;
		this.player = new player({ ctx: this.ctx_game, canvas_width: this.canvas_width, canvas_height: this.base_height, debug: this.debug });

		this.prg_game = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5,
			y: 60,
			min: 0,
			max: this.progress_max,
			width: this.canvas_width * 0.4,
			value: this.progress_index,
			bar_color: ["red", "yellow", "green"],
		});
		this.prg_life = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width - 130,
			y: 30,
			width: 100,
			value: this.player.life,
			max: 100,
			bar_color: ["red", "yellow", "green"],
		});
		this.prg_power = new progress({
			ctx: this.ctx_value,
			x: this.canvas_width - 130,
			y: 60,
			width: 100,
			value: this.player.power,
			max: 100,
			bar_color: ["red", "yellow", "green"],
		});

		//draw control
		this.draw_gui();
	}

	draw_gui() {
		setTimeout(() => {
			this.gui.draw();
			this.ctl.draw_gui();

			if (isTouchDevice()) {
				this.ctl.draw_control();

				this.ctl.attach_touch({
					canvas_mark: this.canvas_mark,
					marker_ctx: this.ctx_mark,
					pointer_ctx: this.ctx_pointer,
					control_ctx: this.ctx_control,
					debug: this.debug,
				});
			} else {
				this.ctl.attach_mouse({
					canvas_mark: this.canvas_mark,
					marker_ctx: this.ctx_mark,
					pointer_ctx: this.ctx_pointer,
					control_ctx: this.ctx_control,
					debug: this.debug,
				});
			}
		}, 1500);
	}

	resize() {
		this.ctl.resize();
	}

	gen_enemy_interval() {
		return this.enemy_interval_max - this.game_level * 10;
	}

	game_start() {
		this.game_level = 1;

		this.progress_index = 0;
		this.progress_max = 1000;
		this.progress_timer = performance.now() + 60000;
		this.progress_timer_index = 60;

		this.enemy_index = 0;
		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list = [];
		this.explosion_list = [];
		this.dust_list = [];
		this.fire_list = [];
		this.score_list = [];

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

		this.ctl.draw_pause();

		if (isTouchDevice()) {
			this.ctl.draw_control();
		}

		this.game_over = false;
		this.game_timeout = false;
		this.clean_ctx_value_message();
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
		});
	}

	game_level_up() {
		this.game_level++;

		this.progress_index = 0;
		this.progress_max = 1000 + this.game_level * 100;
		this.progress_timer = performance.now() + 60000;
		this.progress_timer_index = 60;

		this.enemy_index = 0;

		let tmp_enemy_interval = this.gen_enemy_interval();
		this.enemy_interval = MathRandom() * tmp_enemy_interval + tmp_enemy_interval;

		this.enemy_list = [];
		this.explosion_list = [];
		this.dust_list = [];
		this.fire_list = [];

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

		this.ctl.draw_pause();

		if (isTouchDevice()) {
			this.ctl.draw_control();
		}

		this.game_up = false;
		this.clean_ctx_value_message();
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
		});
	}

	game_continue() {
		this.progress_timer = performance.now() + this.progress_timer_index * 1000;

		this.ctl.draw_pause();
		if (isTouchDevice()) {
			this.ctl.draw_control();
		}

		this.game_pause = false;
		this.clean_ctx_value_message();
		requestAnimationFrame((timestamp) => {
			this.animate(timestamp);
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
		let point = MathFloor((100 - (enemy.y / (enemy.canvas_height - enemy.height + this.base_height)) * 100) * 0.1 * enemy.point);

		if (deduction && point > 0) point *= -1;
		if (!deduction && point < 0) point *= -1;

		this.score_list.push(new score({ ctx: this.ctx_game, text: `${point > 0 ? "+" : ""}${point}`, value: point, x: enemy.x + enemy.width * 0.5, y: enemy.y + enemy.height * 0.5, destination_x: 90, destination_y: 60 }));
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
									this.ctl.clear_control();
									this.ctl.clear_pause();

									this.game_over = true;
									window.removeEventListener("keyup", this.game_pause_listener);
									window.addEventListener("keyup", this.game_stop_listener);
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

		draw_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 - 20,
			text: title,
			font_weight: 60,
			text_align: "center",
			text_color: color,
		});
		draw_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 + 20,
			text: message,
			font_weight: 30,
			text_align: "center",
			text_color: color,
		});
	}

	clean_message(title: string, message: string) {
		clear_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 - 20,
			text: title,
			font_weight: 60,
			text_align: "center",
		});
		clear_text({
			ctx: this.ctx_value,
			x: this.canvas_width * 0.5,
			y: this.base_height * 0.5 + 20,
			text: message,
			font_weight: 30,
			text_align: "center",
		});
	}

	clean_ctx_value_message() {
		this.clean_message(this.last_draw_message_title, this.last_draw_message_message);
	}

	draw_status() {
		//cleanup
		// this.cleanup_ctxvalue();

		//score
		draw_clear_text({
			ctx: this.ctx_value,
			x: 90,
			y: 80,
			text: `${this.score_text}`,
			text_color: this.score_value < 0 ? "red" : "white",
			font_weight: 60,
		});

		//level
		draw_clear_text({
			ctx: this.ctx_value,
			x: (this.canvas_width - this.prg_game.width) * 0.5,
			y: 50,
			text: `Level ${this.game_level}`,
			text_align: "start",
			font_weight: 25,
		});

		//timer
		draw_clear_text({
			ctx: this.ctx_value,
			x: (this.canvas_width + this.prg_game.width) * 0.5,
			y: 50,
			text: `0:${this.progress_timer_index.toString().padStart(2, "0")}`,
			text_align: "end",
			text_color: this.progress_timer_index < 20 ? "red" : "white",
			font_weight: 25,
		});

		//progress
		this.prg_game.update(this.progress_index, 0, this.progress_max);

		//life
		this.prg_life.update(this.player.life);

		//power
		this.prg_power.update(this.player.power);

		//draw progress bar
		[this.prg_game, this.prg_life, this.prg_power].forEach((i) => i.draw());

		//game over message
		if (this.game_over) this.draw_message("Game over!", isTouchDevice() ? "Touch HERE to try again." : "Press SPACEBAR to try again.", "red");

		//game timeout message
		if (this.game_timeout) this.draw_message("Time up!", isTouchDevice() ? "Touch HERE to try again." : "Press SPACEBAR to try again.", "red");

		//game level up
		if (this.game_up) this.draw_message(`Level ${this.game_level} complete!`, isTouchDevice() ? "Touch HERE to continue." : "Press SPACEBAR to continue.", "green");

		//pause
		if (this.game_pause) this.draw_message(`Pause!`, isTouchDevice() ? "Touch PAUSE BUTTON to continue." : "Press ENTER to continue.", "white");
	}

	last_timestamp: number = 0;
	update(timestamp: number) {
		const delta_time = timestamp - this.last_timestamp;
		this.last_timestamp = timestamp;

		//update game progress
		this.progress_index += this.player.speed * 0.1;
		if (this.progress_index >= this.progress_max) {
			this.ctl.clear_control();
			this.ctl.clear_pause();

			this.game_up = true;
			window.removeEventListener("keyup", this.game_pause_listener);
			window.addEventListener("keyup", this.game_stop_listener);
		}

		//update game timeout
		this.progress_timer_index = MathFloor((this.progress_timer - timestamp) * 0.001);
		if (this.progress_timer_index <= 0) {
			this.ctl.clear_control();
			this.ctl.clear_pause();

			this.game_timeout = true;
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
					this.fire_list.unshift(new fire({ ctx: this.ctx_game, x: this.player.x - 40 + MathRandom() * 10 - 10, y: this.player.y + 25 + MathRandom() * 10 - 10 }));
				});
		}

		//add enemy
		if (this.enemy_index >= this.enemy_interval) {
			//choose enemy
			const random_enemy_index = enemy_type[MathFloor(MathRandom() * enemy_type.length)];

			//create new enemy
			const enemy_object = enemyDB[random_enemy_index as enemyDBType];
			const new_enemy = new enemy_object({ ctx: this.ctx_game, canvas_width: this.canvas_width, canvas_height: this.base_height, debug: this.debug });

			//add explosion if explode in
			if (new_enemy.explode_in) {
				this.explosion_list.push(new explosion({ ctx: this.ctx_game, x: new_enemy.x + new_enemy.width * 0.5, y: new_enemy.y + new_enemy.height * 0.5, scale: (new_enemy.width / new_enemy.sprite_width) * 1.5, play_sound: false }));
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
				this.dust_list.unshift(new dust({ ctx: this.ctx_game, x: i.x + i.width * 0.5 + MathRandom() * 50 - 25, y: i.y + i.height * 0.5 + MathRandom() * 30 - 15, color: `rgba(${i.uid_number},0.2)` }));
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
		[this.bg, ...this.fire_list, ...this.dust_list, ...this.score_list, ...this.enemy_list, this.player, ...this.explosion_list].forEach((i) => {
			i.draw();
		});
	}

	game_stop_listener = (event: KeyboardEvent) => {
		if (event.key === " ") {
			if (this.game_up || this.game_over || this.game_timeout) {
				event.preventDefault();
				event.stopPropagation();

				if (this.game_over || this.game_timeout) this.game_start();
				if (this.game_up) this.game_level_up();
			}
		} else if (event.key === "F11") {
			event.preventDefault();
			event.stopPropagation();

			const container = this.canvas_game.parentElement as HTMLDivElement;
			container.requestFullscreen({ navigationUI: "hide" });

			setTimeout(() => {
				if (isFullscreen()) this.ctl.draw_normalscreen();
				else this.ctl.draw_fullscreen();
			}, 1000);
		}
	};

	game_pause_listener = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			if (!this.game_up && !this.game_over && !this.game_timeout) {
				event.preventDefault();
				event.stopPropagation();

				if (!this.game_pause) {
					this.ctl.clear_control();
					this.ctl.draw_start();
					this.game_pause = true;
				} else if (this.game_pause) this.game_continue();
			}
		} else if (event.key === "F11") {
			event.preventDefault();
			event.stopPropagation();

			const container = this.canvas_game.parentElement as HTMLDivElement;
			container.requestFullscreen({ navigationUI: "hide" });

			setTimeout(() => {
				if (isFullscreen()) this.ctl.draw_normalscreen();
				else this.ctl.draw_fullscreen();
			}, 1000);
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
				text_color: text_color ? text_color : "yellow",
				font_family: "Arial",
				font_weight: 20,
			});
		};

		gen_text(78, `${this.game_fps}`, this.game_fps < 30 ? "red" : "yellow");
		gen_text(80, `${this.dust_list.length}`);
		gen_text(73, `${this.fire_list.length}`);
		gen_text(125, `${this.explosion_list.length}`);
		gen_text(100, `${this.enemy_list.length}`);
		gen_text(90, `${this.score_list.length}`);
		gen_text(115, `${read_random_index()}`);
	}

	do_animate = (timestamp: number) => {
		//update object
		this.update(timestamp);

		//draw object
		this.draw();

		//draw status
		this.draw_status();

		//count fps
		if (this.debug) this.debug_info();

		if (!this.game_over && !this.game_timeout && !this.game_pause && !this.game_up) {
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
