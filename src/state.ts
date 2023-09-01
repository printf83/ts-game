import { input } from "./input.js";
import { player } from "./player.js";

export const state_list = {
	idle: {
		frame_y: 0,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
	},
	jump: {
		frame_y: 1,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
	},
	fall: {
		frame_y: 2,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
	},
	run: {
		frame_y: 3,
		sprite_length: 8,
		animation_repeat: true,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
	},
	dizzy: {
		frame_y: 4,
		sprite_length: 11,
		animation_repeat: false,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
	},
	sit: {
		frame_y: 5,
		sprite_length: 5,
		animation_repeat: true,
		collision_adjust_x: 0,
		collision_adjust_y: 15,
	},
	roll: {
		frame_y: 6,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: -2,
		collision_adjust_y: 22,
	},
	jump_roll: {
		frame_y: 6,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: -2,
		collision_adjust_y: 22,
	},
	fall_roll: {
		frame_y: 6,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: -2,
		collision_adjust_y: 22,
	},
	power_fall: {
		frame_y: 6,
		sprite_length: 7,
		animation_repeat: true,
		collision_adjust_x: -2,
		collision_adjust_y: 22,
	},
	bite: {
		frame_y: 7,
		sprite_length: 7,
		animation_repeat: false,
		collision_adjust_x: 15,
		collision_adjust_y: 8,
	},
	ko: {
		frame_y: 8,
		sprite_length: 12,
		animation_repeat: false,
		collision_adjust_x: 0,
		collision_adjust_y: 30,
	},
	gethit: {
		frame_y: 9,
		sprite_length: 4,
		animation_repeat: false,
		collision_adjust_x: 0,
		collision_adjust_y: 0,
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
		this.player.frame = 0;
		this.player.frame_x = 0;
		this.player.collision_adjust_x = state_list[this.current_state].collision_adjust_x;
		this.player.collision_adjust_y = state_list[this.current_state].collision_adjust_y;
		this.player.frame_y = state_list[this.current_state].frame_y * this.player.sprite_height;
		this.player.sprite_length = state_list[this.current_state].sprite_length - 1;
		this.player.animation_repeat = state_list[this.current_state].animation_repeat;
	}
	update() {}
	handle_input(_input: input) {}
	animation_end(_player: player) {}
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
		if (this.player.is_ground()) {
			this.player.weight = 1;
			this.player.velocity_y -= 32;
		}
	}
	update(): void {
		super.update();
		if (this.player.velocity_y > 0) this.player.set_state("fall");
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS down") {
			this.player.velocity_y = 0;
			this.player.set_state("fall");
		}
		if (input.last_key === "PRESS right" && this.player.power > 10) this.player.set_state("jump_roll");
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
		super.update();
		if (this.player.is_ground()) {
			if (this.player.speed > 0) this.player.set_state("run");
			else this.player.set_state("idle");
		}
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS right" && this.player.power > 10) this.player.set_state("fall_roll");
		if (input.last_key === "PRESS down" && this.player.power > 10) this.player.set_state("power_fall");
	}
}
export class state_power_fall extends state {
	constructor(player: player) {
		super("power_fall", player);
	}
	enter(): void {
		super.enter();
		this.player.weight = 20;
		this.player.speed = this.player.max_speed;
	}
	update() {
		super.update();
		this.player.power--;

		if (this.player.is_ground()) {
			this.player.speed = this.player.max_speed * 0.5;
			this.player.set_state("run");
		} else {
			if (this.player.power <= 0) {
				this.player.weight = 1;
				this.player.speed = this.player.max_speed * 0.5;
				this.player.set_state("fall");
			}
		}
	}

	handle_input(input: input) {
		if (input.last_key === "RELESE down") {
			this.player.speed = this.player.max_speed * 0.5;
			this.player.set_state("fall");
		}
	}
}

export class state_run extends state {
	constructor(player: player) {
		super("run", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = this.player.max_speed * 0.5;
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS left") this.player.set_state("idle");
		if (input.last_key === "PRESS right" && this.player.power > 10) this.player.set_state("roll");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS space") this.player.set_state("bite");
	}
}
export class state_dizzy extends state {
	constructor(player: player) {
		super("dizzy", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = 0;
		this.player.invulnerable = true;
	}
	animation_end(player: player) {
		setTimeout(() => {
			player.invulnerable = false;
		}, 300);

		player.set_state("idle");
	}
}
export class state_sit extends state {
	constructor(player: player) {
		super("sit", player);
	}
	enter(): void {
		super.enter();
		this.player.invulnerable = true;
		this.player.speed = 0;
	}
	update(): void {
		super.update();
		this.player.power += 0.5;
	}
	handle_input(input: input) {
		if (input.last_key === "RELEASE down") {
			this.player.invulnerable = false;
			this.player.set_state("idle");
		}
	}
}
export class state_roll extends state {
	constructor(player: player) {
		super("roll", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = this.player.max_speed;
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
		if (input.last_key === "RELEASE down") this.player.set_state("run");
		if (input.last_key === "PRESS up" && this.player.power > 10) this.player.set_state("jump_roll");
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
		this.player.speed = this.player.max_speed;
	}
	update(): void {
		super.update();
		this.player.power--;

		if (this.player.velocity_y > 0) {
			if (this.player.power <= 0) {
				this.player.speed = this.player.max_speed * 0.5;
				this.player.set_state("fall");
			} else {
				this.player.set_state("fall_roll");
			}
		} else {
			if (this.player.power <= 0) {
				this.player.speed = this.player.max_speed * 0.5;
				this.player.set_state("jump");
			}
		}
	}

	handle_input(input: input) {
		if (input.last_key === "RELEASE right") {
			this.player.speed = this.player.max_speed * 0.5;

			if (this.player.velocity_y > 0) {
				this.player.set_state("fall");
			} else {
				this.player.set_state("jump");
			}
		}
	}
}
export class state_fall_roll extends state {
	constructor(player: player) {
		super("fall_roll", player);
	}
	enter(): void {
		super.enter();
		this.player.speed = this.player.max_speed;
	}
	update(): void {
		super.update();
		if (this.player.is_ground()) {
			this.player.set_state("roll");
		} else {
			this.player.power--;
			if (this.player.power <= 0) {
				this.player.speed = this.player.max_speed * 0.5;
				this.player.set_state("fall");
			}
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
	constructor(player: player) {
		super("bite", player);
	}
	enter(): void {
		super.enter();
		this.player.powered = true;
		this.player.invulnerable = true;
		this.player.speed = 0;
	}
	animation_end(player: player) {
		setTimeout(() => {
			player.powered = false;
			player.invulnerable = false;
		}, 300);

		player.set_state("idle");
	}
}
export class state_ko extends state {
	constructor(player: player) {
		super("ko", player);
	}
	enter(): void {
		super.enter();
		this.player.invulnerable = true;
		this.player.speed = 0;
	}
	animation_end(player: player) {
		player.invulnerable = false;
	}
}
export class state_gethit extends state {
	constructor(player: player) {
		super("gethit", player);
	}
	enter(): void {
		super.enter();
		this.player.invulnerable = true;
		this.player.speed = 0;
	}
	animation_end(player: player) {
		setTimeout(() => {
			player.invulnerable = false;
		}, 300);
		player.set_state("idle");
	}
}
