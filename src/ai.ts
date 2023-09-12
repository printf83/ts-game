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
		this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);

		if (this.state_check) {
			this.detect_player();
			this.detect_enemy();
			this.detect_state();

			requestIdleCallback(() => {
				this.check();
			});
		}
	}

	detect_state() {
		if (this.game.game_up || this.game.game_ready || this.game.game_pause) {
			this.press_key("Enter");
		}
	}

	detect_player() {
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

	detect_enemy() {
		this.ctx.save();

		this.game.enemy_list.forEach((i) => {
			const is_near = this.is_emeny_near(this.game.player, i);

			this.ctx.fillStyle = is_near ? "red" : "yellow";

			this.ctx.beginPath();
			this.ctx.arc(i.x + i.width * 0.5, i.y + i.height * 0.5, i.width * 0.5, 0, MathPI2);
			this.ctx.fill();

			if (is_near) {
				this.attack_enemy(this.game.player, i);
			}
		});

		this.ctx.restore();
	}

	is_emeny_near(player: player, enemy: baseEnemy) {
		const dx = enemy.collision_x - player.collision_x;
		const dy = enemy.collision_y - player.collision_y;

		const distance = Math.sqrt(dx * dx + dy * dy);
		return (
			distance <
			enemy.width * enemy.collision_scale + player.width * player.collision_scale + 200
		);
	}

	is_attack: boolean = false;
	attack_enemy(player: player, _enemy: baseEnemy) {
		if (!this.is_attack) {
			if (player.power > 10) {
				this.is_attack = true;
				this.press_key("Control", 100, () => {
					this.is_attack = false;
				});
			} else {
				this.is_attack = true;
				this.press_key("ArrowDown", 3000, () => {
					this.press_key("ArrowRight", 100, () => {
						this.is_attack = false;
					});
				});
			}
		} else {
			if (player.power >= 100) {
				this.release_key("ArrowDown");
				this.is_attack = false;
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
