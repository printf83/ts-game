import { baseAnimation } from "./base.js";
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
import { draw_text } from "./util.js";

export class player extends baseAnimation {
	state_list: { [key: string]: state } = {};
	current_state?: state;

	canvas_width: number;
	canvas_height: number;

	invulnerable_max: number;
	invulnerable: number;
	power: number;
	powered: number;
	speed: number;
	life: number;
	max_speed: number;
	velocity_y: number;
	weight: number;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const img = new Image();
		img.src = "./res/player.png";

		const sprite_width = 575;
		const sprite_height = 523;
		const width = sprite_width * 0.25;
		const height = sprite_height * 0.25;

		super({
			img,

			x: opt.canvas_width * 0.1,
			y: opt.canvas_height - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length: 0,

			fps: 20,
		});

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.velocity_y = 0;
		this.weight = 1;
		this.speed = 0;
		this.life = 100;
		this.max_speed = 14;
		this.power = 100;
		this.powered = 0;
		this.invulnerable = 0;
		this.invulnerable_max = 0;

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
		return this.powered > 0 || this.speed === this.max_speed;
	}
	set_state = (state: state_type) => {
		this.current_state = this.state_list[state];
		this.current_state?.enter();
	};
	update(delta_time: number, onframechange?: (() => void) | undefined): void {
		this.y += this.velocity_y;
		if (!this.is_ground()) this.velocity_y += this.weight;
		else this.velocity_y = 0;

		if (this.y > this.canvas_height - this.height) this.y = this.canvas_height - this.height;

		this.power += 0.1;
		if (this.power > 100) this.power = 100;
		if (this.power < 0) this.power = 0;

		this.current_state?.update();
		super.update(delta_time, onframechange);
	}
}

export const animate_player = (opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number }) => {
	const obj_player = new player({
		canvas_width: opt.canvas_height,
		canvas_height: opt.canvas_height,
	});

	const obj_input = new input();

	player_animate({
		ctx: opt.ctx,
		player: obj_player,
		input: obj_input,
		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
		timestamp: 0,
	});
};

let player_last_timestamp = 0;
const player_animate = (opt: {
	ctx: CanvasRenderingContext2D;
	player: player;
	input: input;
	canvas_width: number;
	canvas_height: number;
	timestamp: number;
}) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	const delta_time = opt.timestamp - player_last_timestamp;
	player_last_timestamp = opt.timestamp;

	draw_text({
		ctx: opt.ctx,
		x: 20,
		y: 30,
		text_color: "black",
		shadow_color: "gray",
		text: `Last input : ${opt.input.last_key}`,
	});

	draw_text({
		ctx: opt.ctx,
		x: 20,
		y: 60,
		text_color: "black",
		shadow_color: "gray",
		text: `Player state : ${opt.player.frame_y}`,
	});

	draw_text({
		ctx: opt.ctx,
		x: 20,
		y: 90,
		text_color: "black",
		shadow_color: "gray",
		text: `Player Y : ${opt.player.y}`,
	});

	draw_text({
		ctx: opt.ctx,
		x: 20,
		y: 120,
		text_color: "black",
		shadow_color: "gray",
		text: `Player Speed : ${opt.player.speed}`,
	});

	draw_text({
		ctx: opt.ctx,
		x: 20,
		y: 150,
		text_color: "black",
		shadow_color: "gray",
		text: `Player Power : ${opt.player.power}`,
	});

	if (opt.player) {
		opt.player.update_input(opt.input);
		opt.player.update(delta_time);
		opt.player.draw(opt.ctx);
	}

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		player_animate(opt);
	});
};
