import { baseAnimation } from "./base.js";

const actionDB = {
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

type actionDBType = keyof typeof actionDB;

export class player extends baseAnimation {
	constructor(opt: { canvas_width: number; canvas_height: number }) {
		const img = new Image();
		img.src = "./res/player.png";

		const sprite_width = 575;
		const sprite_height = 523;
		const width = sprite_width * 0.5;
		const height = sprite_height * 0.5;

		super({
			img,

			x: (opt.canvas_width - width) * 0.5,
			y: opt.canvas_height - height,
			width,
			height,

			sprite_width,
			sprite_height,
			sprite_length: 0,

			fps: 20,
		});
	}

	set_action = (action: actionDBType) => {
		const act = actionDB[action];
		this.frame_y = act.frame_y * this.sprite_height;
		this.sprite_length = act.sprite_length - 1;
	};
}

let player_obj: player | null;

export const animate_player = (opt: {
	ctx: CanvasRenderingContext2D;
	cbo: HTMLSelectElement;
	canvas_width: number;
	canvas_height: number;
}) => {
	player_obj = new player({
		canvas_width: opt.canvas_height,
		canvas_height: opt.canvas_height,
	});

	opt.cbo.addEventListener("change", (event) => {
		const target = event.currentTarget as HTMLSelectElement;
		const value = target.value;
		if (value && player_obj) {
			player_obj.set_action(value as actionDBType);
		}
	});

	player_animate({ ctx: opt.ctx, canvas_width: opt.canvas_width, canvas_height: opt.canvas_height, timestamp: 0 });

	opt.cbo.dispatchEvent(new Event("change"));
};

let player_last_timestamp = 0;

const player_animate = (opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; timestamp: number }) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	const delta_time = opt.timestamp - player_last_timestamp;
	player_last_timestamp = opt.timestamp;

	if (player_obj) {
		player_obj.update(delta_time);
		player_obj.draw(opt.ctx);
	}

	requestAnimationFrame((timestamp) => {
		opt.timestamp = timestamp;
		player_animate(opt);
	});
};
