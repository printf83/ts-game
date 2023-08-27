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
	handle_input(input: input) {}
}

export class state_idle extends state {
	constructor(player: player) {
		super("idle", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS right") this.player.set_state("run");
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
	}
}
export class state_jump extends state {
	constructor(player: player) {
		super("jump", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS down") this.player.set_state("fall");
	}
}
export class state_fall extends state {
	constructor(player: player) {
		super("fall", player);
	}
	handle_input(_input: input) {}
}
export class state_run extends state {
	constructor(player: player) {
		super("run", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS left") this.player.set_state("idle");
		if (input.last_key === "PRESS right") this.player.set_state("roll");
		if (input.last_key === "PRESS down") this.player.set_state("sit");
	}
}
export class state_dizzy extends state {
	constructor(player: player) {
		super("dizzy", player);
	}
	handle_input(_input: input) {}
}
export class state_sit extends state {
	constructor(player: player) {
		super("sit", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS up") this.player.set_state("idle");
		if (input.last_key === "PRESS left") this.player.set_state("idle");
		if (input.last_key === "PRESS right") this.player.set_state("run");
	}
}
export class state_roll extends state {
	constructor(player: player) {
		super("roll", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS right") this.player.set_state("run");
		if (input.last_key === "PRESS left") this.player.set_state("idle");
	}
}
export class state_bite extends state {
	constructor(player: player) {
		super("bite", player);
	}
	handle_input(input: input) {
		if (input.last_key === "PRESS up") this.player.set_state("jump");
		if (input.last_key === "PRESS right") this.player.set_state("run");
		if (input.last_key === "PRESS left") this.player.set_state("idle");
	}
}
export class state_ko extends state {
	constructor(player: player) {
		super("ko", player);
	}
	handle_input(_input: input) {}
}
export class state_gethit extends state {
	constructor(player: player) {
		super("gethit", player);
	}
	handle_input(_input: input) {}
}
