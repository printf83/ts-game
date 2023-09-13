import { baseEnemy } from "./enemy/baseEnemy.js";
import { game } from "./game.js";
import { player } from "./player.js";
import { MathPI2 } from "./util.js";

export class ai {
	canvas: HTMLCanvasElement;
	canvas_width: number;
	canvas_height: number;

	ctx: CanvasRenderingContext2D;
	game: game;

	state_check: boolean = false;

	constructor(opt: { canvas: HTMLCanvasElement; game: game }) {
		this.canvas = opt.canvas;
		this.canvas_width = this.canvas.width;
		this.canvas_height = this.canvas.height;

		this.ctx = this.canvas.getContext("2d")!;
		this.game = opt.game;
	}

	start() {
		this.state_check = true;
		requestIdleCallback(() => {
			this.check();
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
		});
	}
	pause() {
		this.state_check = false;
	}

	check() {
		if (this.state_check) {
			if (!this.is_attack_enemy) {
				this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

				this.detect_player();
				this.detect_enemy();
				this.detect_state();
			}

			requestIdleCallback(() => {
				this.check();
			});
		}
	}

	is_detect_state: boolean = false;
	detect_state() {
		if (!this.is_detect_state) {
			this.is_detect_state = true;

			if (
				this.game.game_over ||
				this.game.game_up ||
				this.game.game_ready ||
				this.game.game_pause
			) {
				this.press_key("Enter", 100, () => {
					setTimeout(() => {
						requestIdleCallback(() => {
							this.is_detect_state = false;
						});
					}, 1000);
				});
			} else {
				if (this.game.player.current_state?.current_state === "idle") {
					this.press_key("ArrowRight");
				} else if (
					this.game.player.current_state?.current_state === "sit" &&
					this.game.player.power >= 100
				) {
					this.press_key("ArrowRight");
				}

				requestIdleCallback(() => {
					this.is_detect_state = false;
				});
			}
		}
	}

	detect_player() {
		if (this.game.player.life <= 10) this.game.player.life = 100;

		if (this.game.debug) {
			this.ctx.save();
			this.ctx.fillStyle = "green";
			this.ctx.beginPath();

			this.ctx.arc(
				this.game.player.x + this.game.player.width * 0.5,
				this.game.player.y + this.game.player.height * 0.5,
				this.game.player.width * 0.5,
				0,
				MathPI2
			);
			this.ctx.fill();
			this.ctx.restore();
		}
	}

	calc_distance(player: player, enemy: baseEnemy) {
		const dx = enemy.collision_x - player.collision_x;
		const dy = enemy.collision_y - player.collision_y;

		return Math.sqrt(dx * dx + dy * dy);
	}

	near_distance() {
		return 300 * this.game.game_level * 0.2;
	}

	detect_enemy() {
		if (
			!(
				this.game.game_over ||
				this.game.game_up ||
				this.game.game_ready ||
				this.game.game_pause
			)
		) {
			let nearest_enemy: baseEnemy | null = null;
			let nearest_distance = Number.MAX_VALUE;

			this.game.enemy_list.forEach((i) => {
				const distance = this.calc_distance(this.game.player, i);

				const is_near =
					distance <
					i.width * i.collision_scale +
						this.game.player.width * this.game.player.collision_scale +
						this.near_distance();

				if (is_near) {
					if (distance < nearest_distance) {
						nearest_enemy = i;
						nearest_distance = distance;
					}
				}

				if (this.game.debug) {
					this.ctx.save();
					this.ctx.fillStyle = is_near ? "red" : "yellow";
					this.ctx.beginPath();
					this.ctx.arc(
						i.x + i.width * 0.5,
						i.y + i.height * 0.5,
						i.width * 0.5,
						0,
						MathPI2
					);
					this.ctx.fill();
					this.ctx.restore();
				}
			});

			if (nearest_enemy) {
				this.attack_enemy(this.game.player, nearest_enemy);
				requestIdleCallback(() => {
					this.detect_enemy();
				});
			}
		}
	}

	is_enemy_near(player: player, enemy: baseEnemy) {
		const distance = this.calc_distance(player, enemy);
		return (
			distance <
			enemy.width * enemy.collision_scale +
				player.width * player.collision_scale +
				this.near_distance()
		);
	}

	is_enemy_top(player: player, enemy: baseEnemy) {
		return enemy.x + enemy.height <= player.x;
	}

	is_attack_enemy: boolean = false;
	attack_enemy(player: player, enemy: baseEnemy) {
		if (!this.is_attack_enemy) {
			this.is_attack_enemy = true;

			if (player.power > 20) {
				if (this.is_enemy_top(player, enemy)) {
					if (this.game.debug) console.log("Enemy on top");
					this.press_key("ArrowUp", 50, () => {
						let press_time = this.near_distance() * 0.75;
						if (press_time > 3000) press_time = 3000;
						this.press_key("Control", press_time, () => {
							if (press_time >= 3000) {
								this.press_key(" ", 100, () => {
									this.is_attack_enemy = false;
								});
							} else this.is_attack_enemy = false;
						});
					});
				} else {
					if (this.game.debug) console.log("Enemy in front");
					let press_time = this.near_distance() * 0.75;
					if (press_time > 3000) press_time = 3000;
					this.press_key("Control", press_time, () => {
						if (press_time >= 3000) {
							this.press_key(" ", 100, () => {
								this.is_attack_enemy = false;
							});
						} else this.is_attack_enemy = false;
					});
				}
			} else {
				this.press_key(" ", 100, () => {
					this.press_key("ArrowDown", 3000, () => {
						this.press_key("ArrowRight", 100, () => {
							this.is_attack_enemy = false;
						});
					});
				});
			}
		}
	}

	press_key(key: string, length?: number, callback?: Function) {
		length ??= 100;

		window.dispatchEvent(new KeyboardEvent("keydown", { key: key }));

		setTimeout(() => {
			this.release_key(key);
			if (callback) callback();
		}, length);
	}

	release_key(key: string) {
		window.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
	}
}
