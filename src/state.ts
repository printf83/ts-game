import { input } from "./input.js";
import { player } from "./player.js";

export const state_list = {
	idle: {
		frame_y: 0,
		sprite_length: 7,
	},
	jump: {
		frame_y: 1,
		sprite_length: 7,
	},
	fall: {
		frame_y: 2,
		sprite_length: 7,
	},
	run: {
		frame_y: 3,
		sprite_length: 8,
	},
	dizzy: {
		frame_y: 4,
		sprite_length: 11,
	},
	sit: {
		frame_y: 5,
		sprite_length: 5,
	},
	roll: {
		frame_y: 6,
		sprite_length: 7,
	},
	jump_roll: {
		frame_y: 6,
		sprite_length: 7,
	},
	fall_roll: {
		frame_y: 6,
		sprite_length: 7,
	},
	bite: {
		frame_y: 7,
		sprite_length: 7,
	},
	ko: {
		frame_y: 8,
		sprite_length: 12,
	},
	gethit: {
		frame_y: 9,
		sprite_length: 4,
	},
};

export type state_type = keyof typeof state_list;

export class state {
	current_state: state_type;
	player: player;
	constructor(current_state: state_type, player: player) {
		this.current_state = current_state;
		this.player = player;
	}

	enter() {
		this.player.frame_y = state_list[this.current_state].frame_y * this.player.sprite_height;
		this.player.sprite_length = state_list[this.current_state].sprite_length - 1;
	}
	update() {}
	handle_input(_input: input) {}
}

export class state_idle extends state {
	constructor(player: player) {
		super("idle", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = 0;
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS right") this.player.set_state("run");
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
		if (input.last_key === "PRESS space") this.player.set_state("bite");
	}
}
export class state_jump extends state {
	constructor(player: player) {
		super("jump", player);
	}
	enter(): void {
		super.enter();
		if (this.player.is_ground()) this.player.velocity_y -= 32;
	}
	update(): void {
		super.update();
		if (this.player.velocity_y > 0) this.player.set_state("fall");
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS down") this.player.set_state("fall");
		if (input.last_key === "PRESS right") this.player.set_state("jump_roll");
	}
}
export class state_fall extends state {
	constructor(player: player) {
		super("fall", player);
	}
	enter(): void {
		super.enter();
	}
	update() {
		if (this.player.is_ground()) {
			if (this.player.speed > 0) this.player.set_state("run");
			else this.player.set_state("idle");
		} else {
			super.update();
		}
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS right") this.player.set_state("fall_roll");
	}
}
export class state_run extends state {
	constructor(player: player) {
		super("run", player);
	}
	enter(): void {
		super.enter();
		this.player.y = this.player.canvas_height - this.player.height;
		this.player.speed = this.player.max_speed * 0.5;
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS left") this.player.set_state("idle");
		if (input.last_key === "PRESS right") this.player.set_state("roll");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS space") this.player.set_state("bite");
	}
}
export class state_dizzy extends state {
	interval: number;

	constructor(player: player) {
		super("dizzy", player);
		this.interval = 0;
	}
	enter(): void {
		super.enter();
		this.player.speed = 0;
		this.interval = 150;
		this.player.invulnerable = this.interval;
	}
	update(): void {
		super.update();
		this.interval--;
		this.player.invulnerable = this.interval;
		if (this.interval === 0) this.player.set_state("idle");
	}
	handle_input(_input: input) {}
}
export class state_sit extends state {
	constructor(player: player) {
		super("sit", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = 0;
	}
	update(): void {
		super.update();
		this.player.power += 0.5;
	}
	handle_input(input: input) {
		if (input.last_key === "RELEASE down") this.player.set_state("idle");
	}
}
export class state_roll extends state {
	constructor(player: player) {
		super("roll", player);
	}
	enter(): void {
		super.enter();
		if (this.player.power > 0) {
			super.enter();
			this.player.speed = this.player.max_speed;
		} else this.player.set_state("run");
	}
	update(): void {
		super.update();
		this.player.power--;
		if (this.player.power < 0) {
			this.player.power = 0;
			this.player.set_state("run");
		}
	}

	handle_input(input: input) {
		if (input.last_key === "RELEASE right") this.player.set_state("run");
		if (input.last_key === "PRESS up") this.player.set_state("jump_roll");
		if (input.last_key === "PRESS left") this.player.set_state("idle");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
	}
}
export class state_jump_roll extends state {
	constructor(player: player) {
		super("jump_roll", player);
	}
	enter(): void {
		super.enter();
		if (this.player.power > 0) this.player.speed = this.player.max_speed;
		else this.player.set_state("jump");
	}
	update(): void {
		super.update();
		this.player.power--;
		if (this.player.velocity_y > 0) {
			if (this.player.power <= 0) this.player.set_state("fall");
		} else {
			if (this.player.power <= 0) this.player.set_state("jump");
		}
	}

	handle_input(input: input) {
		if (input.last_key === "RELEASE right") {
			this.player.speed = this.player.max_speed * 0.5;
			this.player.set_state("jump");
		}
	}
}
export class state_fall_roll extends state {
	constructor(player: player) {
		super("fall_roll", player);
	}
	enter(): void {
		if (this.player.power > 0) {
			super.enter();
			this.player.speed = this.player.max_speed;
		} else this.player.set_state("fall");
	}
	update(): void {
		if (this.player.is_ground()) {
			if (this.player.power > 0) this.player.set_state("roll");
			else this.player.set_state("run");
		} else {
			super.update();

			this.player.power--;
			if (this.player.power <= 0) this.player.set_state("fall");
		}
	}

	handle_input(input: input) {
		if (input.last_key === "RELEASE right") {
			this.player.speed = this.player.max_speed * 0.5;
			this.player.set_state("fall");
		}
	}
}
export class state_bite extends state {
	interval: number;
	constructor(player: player) {
		super("bite", player);
		this.interval = 0;
	}
	enter(): void {
		super.enter();
		this.interval = 25;
		this.player.powered = this.interval;
		this.player.invulnerable = this.interval;
		this.player.speed = 0;
	}
	update(): void {
		super.update();
		this.interval--;
		this.player.powered = this.interval;
		this.player.invulnerable = this.interval;
		if (this.interval <= 0) this.player.set_state("idle");
	}
	handle_input(_input: input) {
		// if (input.last_key === "PRESS up") this.player.set_state("jump");
		// if (input.last_key === "PRESS right") this.player.set_state("run");
		// if (input.last_key === "PRESS left") this.player.set_state("idle");
	}
}
export class state_ko extends state {
	constructor(player: player) {
		super("ko", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = 0;
	}
	handle_input(_input: input) {}
}
export class state_gethit extends state {
	interval: number;
	constructor(player: player) {
		super("gethit", player);
		this.interval = 0;
	}
	enter(): void {
		super.enter();
		this.interval = 25;
		this.player.invulnerable = this.interval;
		this.player.speed = 0;
	}
	update(): void {
		super.update();
		this.interval--;
		this.player.invulnerable = this.interval;
		if (this.interval <= 0) this.player.set_state("idle");
	}
	handle_input(_input: input) {}
}
