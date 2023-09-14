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
		this.check();
	}
	pause() {
		this.state_check = false;
	}

	check() {
		this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

		if (this.state_check) {
			if (!this.is_attack_enemy) {
				this.detect_player();
				const nearest_enemy = this.detect_enemy(this.get_near_distance());
				if (nearest_enemy) this.attack_enemy(this.game.player, nearest_enemy);
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

			if (this.game.game_up || this.game.game_ready || this.game.game_pause) {
				this.press_key("Enter", 100, () => {
					this.is_detect_state = false;
				});
			} else {
				if (this.game.player.current_state?.current_state === "idle") {
					this.press_key("ArrowRight");
				} else if (
					this.game.player.current_state?.current_state === "sit" &&
					this.game.player.power >= 100 &&
					!this.is_attack_enemy
				) {
					this.press_key("ArrowRight");
				}

				this.is_detect_state = false;
			}
		}
	}

	detect_player() {
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

	detect_enemy(near_distance: number) {
		let nearest_enemy: baseEnemy | null = null;
		let nearest_distance = Number.MAX_VALUE;

		this.game.enemy_list.forEach((i) => {
			const distance = this.calc_distance(this.game.player, i);

			const is_near =
				distance <
				i.width * i.collision_scale +
					this.game.player.width * this.game.player.collision_scale +
					near_distance;

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
				this.ctx.arc(i.x + i.width * 0.5, i.y + i.height * 0.5, i.width * 0.5, 0, MathPI2);
				this.ctx.fill();
				this.ctx.restore();
			}
		});

		return nearest_enemy;
	}

	get_near_distance() {
		return 200 + this.game.game_level * 10;
	}

	is_enemy_near(player: player, enemy: baseEnemy) {
		const distance = this.calc_distance(player, enemy);
		return (
			distance <
			enemy.width * enemy.collision_scale +
				player.width * player.collision_scale +
				this.get_near_distance()
		);
	}

	is_enemy_top(player: player, enemy: baseEnemy) {
		return enemy.x + enemy.height <= player.x;
	}

	is_attack_enemy: boolean = false;
	attack_enemy(player: player, enemy: baseEnemy) {
		if (!this.is_attack_enemy) {
			this.is_attack_enemy = true;

			if (player.power > 10) {
				if (this.is_enemy_top(player, enemy)) {
					if (this.game.debug) console.log("top");

					if (player.life > 50) {
						this.press_key("ArrowUp", 500, () => {
							this.press_key("ArrowDown", 300, () => {
								this.is_attack_enemy = false;
							});
							// this.press_key("Control", 100, () => {
							// 	this.is_attack_enemy = false;
							// });
						});
					} else {
						this.is_attack_enemy = false;
					}
				} else {
					if (this.game.debug) console.log("front");

					this.press_key("Control", 100, () => {
						this.is_attack_enemy = false;
					});
				}
			} else {
				this.press_key("ArrowDown", 3000, () => {
					const nearest_enemy = this.detect_enemy(this.get_near_distance() * 0.5);
					if (nearest_enemy) {
						this.is_attack_enemy = false;
						this.attack_enemy(player, nearest_enemy);
					} else {
						this.press_key("ArrowRight", 100, () => {
							this.is_attack_enemy = false;
						});
					}
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
