import { ASSET, ASSETIMG, ASSETSVG, COLOR } from "./asset.js";
import { baseAnimation } from "./baseAnimation.js";
import { game } from "./game.js";
import { input } from "./input.js";
import {
	state,
	state_bite,
	state_dizzy,
	state_fall,
	state_fall_roll,
	state_gethit,
	state_idle,
	state_jump,
	state_jump_roll,
	state_ko,
	state_power_fall,
	state_roll,
	state_run,
	state_sit,
	state_type,
} from "./state.js";
import { MathFloor, MathPI2 } from "./util.js";

export class player extends baseAnimation {
	debug: boolean = false;

	game: game;

	state_list: { [key: string]: state } = {};
	current_state?: state;

	canvas_width: number;
	canvas_height: number;

	invulnerable: boolean;
	powered: boolean;
	power: number;
	speed: number;
	life: number;
	max_speed: number;
	velocity_y: number;
	weight: number;

	collision_scale = 0.5;
	collision_adjust_x = 0;
	collision_adjust_y = 0;
	collision_x: number;
	collision_y: number;

	img_life: HTMLImageElement;
	img_life_inactive: HTMLImageElement;
	img_power: HTMLImageElement;
	img_power_inactive: HTMLImageElement;
	img_stopwatch: HTMLImageElement;
	img_stopwatch_inactive: HTMLImageElement;
	img_shield: HTMLImageElement;
	img_shield_inactive: HTMLImageElement;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		game: game;
		x: number;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		const sprite_width = 575;
		const sprite_height = 523;
		const width = sprite_width * 0.25;
		const height = sprite_height * 0.25;

		super({
			img: ASSETIMG(ASSET.player),

			ctx: opt.ctx,
			x: opt.x,
			y: opt.canvas_height - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length: 0,
		});

		opt.debug ??= false;
		this.debug = opt.debug;

		this.game = opt.game;

		this.img_life = ASSETSVG("life", `rgb(${COLOR.red})`);
		this.img_power = ASSETSVG("lightning", `rgb(${COLOR.yellow})`);
		this.img_stopwatch = ASSETSVG("stopwatch", `rgb(${COLOR.blue})`);
		this.img_shield = ASSETSVG("shield", `rgb(${COLOR.green})`);

		this.img_life_inactive = ASSETSVG("life", `rgb(${COLOR.light})`);
		this.img_power_inactive = ASSETSVG("lightning", `rgb(${COLOR.light})`);
		this.img_stopwatch_inactive = ASSETSVG("stopwatch", `rgb(${COLOR.light})`);
		this.img_shield_inactive = ASSETSVG("shield", `rgb(${COLOR.light})`);

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
		this.collision_y = this.y + this.collision_adjust_y + this.height * this.collision_scale;

		this.velocity_y = 0;
		this.weight = 1;
		this.speed = 0;
		this.life = 100;
		this.max_speed = 14;
		this.power = 100;
		this.powered = false;
		this.invulnerable = false;

		this.state_list = {
			idle: new state_idle(this),
			jump: new state_jump(this),
			fall: new state_fall(this),
			power_fall: new state_power_fall(this),
			run: new state_run(this),
			dizzy: new state_dizzy(this),
			sit: new state_sit(this),
			roll: new state_roll(this),
			jump_roll: new state_jump_roll(this),
			fall_roll: new state_fall_roll(this),
			bite: new state_bite(this),
			ko: new state_ko(this),
			gethit: new state_gethit(this),
		};
		this.current_state = this.state_list.idle;
	}
	update_input(input: input) {
		this.current_state?.handle_input(input);
	}
	is_ground() {
		return this.y >= this.canvas_height - this.height;
	}
	is_powered() {
		return this.powered || this.speed === this.max_speed;
	}
	set_state = (state: state_type) => {
		this.current_state?.exit();
		this.current_state = this.state_list[state];
		this.current_state?.enter();
	};

	update(opt: { delta_time: number; onframechange?: () => void; onframecomplete?: () => void }) {
		this.y += this.velocity_y;
		if (!this.is_ground()) this.velocity_y += this.weight;
		else this.velocity_y = 0;

		if (this.y > this.canvas_height - this.height) this.y = this.canvas_height - this.height;

		this.power += 0.1;
		if (this.power > 100) this.power = 100;
		if (this.power < 0) this.power = 0;

		this.current_state?.update();
		super.update({
			delta_time: opt.delta_time,
			onframecomplete: () => {
				this.current_state?.animation_end(this);
			},
		});

		this.collision_x = this.x + this.collision_adjust_x + this.width * this.collision_scale;
		this.collision_y = this.y + this.collision_adjust_y + this.height * this.collision_scale;
	}
	draw(): void {
		//draw sprite
		super.draw();

		if (this.power >= 100)
			this.ctx.drawImage(
				this.img_power,
				MathFloor(this.x + this.width * 0.5),
				MathFloor(this.y + 10),
				16,
				16
			);
		else
			this.ctx.drawImage(
				this.img_power_inactive,
				MathFloor(this.x + this.width * 0.5),
				MathFloor(this.y + 10),
				16,
				16
			);

		if (this.life < 30)
			this.ctx.drawImage(
				this.img_life,
				MathFloor(this.x + this.width * 0.5 + 20),
				MathFloor(this.y + 10),
				16,
				16
			);
		else
			this.ctx.drawImage(
				this.img_life_inactive,
				MathFloor(this.x + this.width * 0.5 + 20),
				MathFloor(this.y + 10),
				16,
				16
			);

		if (this.game.progress_timer_index < 20)
			this.ctx.drawImage(
				this.img_stopwatch,
				MathFloor(this.x + this.width * 0.5 - 20),
				MathFloor(this.y + 10),
				16,
				16
			);
		else
			this.ctx.drawImage(
				this.img_stopwatch_inactive,
				MathFloor(this.x + this.width * 0.5 - 20),
				MathFloor(this.y + 10),
				16,
				16
			);

		if (this.invulnerable || this.is_powered())
			this.ctx.drawImage(
				this.img_shield,
				MathFloor(this.x + this.width * 0.5 - 40),
				MathFloor(this.y + 10),
				16,
				16
			);
		else
			this.ctx.drawImage(
				this.img_shield_inactive,
				MathFloor(this.x + this.width * 0.5 - 40),
				MathFloor(this.y + 10),
				16,
				16
			);

		//draw collision area
		if (this.debug) {
			this.ctx.save();

			this.ctx.strokeStyle = `rgb(${COLOR.light})`;
			this.ctx.beginPath();
			this.ctx.arc(
				MathFloor(this.collision_x),
				MathFloor(this.collision_y),
				this.collision_scale * 100,
				0,
				MathPI2
			);
			this.ctx.stroke();

			this.ctx.restore();
		}
	}
}
