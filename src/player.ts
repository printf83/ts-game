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
		sprite_length: 9,
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

export type actionDBType = keyof typeof actionDB;

interface location {
	x: number;
	y: number;
}

export const playerAct = (canvas: HTMLCanvasElement, action: actionDBType) => {
	let item = actionDB[action];
	const sprite_width = 575;
	const sprite_height = 523;
	const frame_y = sprite_height * item.frame_y;

	const img = new Image();
	img.src = "./res/player.png";

	return {
		canvas,
		img,
		sprite_width,
		sprite_height,
		location: Array(item.sprite_length)
			.fill("")
			.map((_i, ix) => {
				return {
					y: frame_y,
					x: ix * sprite_width,
				};
			}),
	};
};

let playerAnimatedId: string = "";
export const player = (opt: { canvas: HTMLCanvasElement; img: HTMLImageElement; sprite_width: number; sprite_height: number; location: location[] }) => {
	const ctx = opt.canvas.getContext("2d");

	const CANVAS_WIDTH = (opt.canvas.width = 500);
	const CANVAS_HEIGHT = (opt.canvas.height = 500);

	if (ctx) {
		playerAnimatedId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "");

		animatePlayer({
			animateId: playerAnimatedId,
			ctx,
			img: opt.img,
			location: opt.location,
			frame_stagger: 0.2,
			sprite_width: opt.sprite_width,
			sprite_height: opt.sprite_height,
			canvas_width: CANVAS_WIDTH,
			canvas_height: CANVAS_HEIGHT,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	img: HTMLImageElement;
	location: location[];
	game_frame?: number;
	frame_stagger: number;
	frame_x?: number;
	sprite_width: number;
	sprite_height: number;
	canvas_width: number;
	canvas_height: number;
}

const animatePlayer = (opt: option) => {
	opt.game_frame ??= 0;
	opt.frame_x ??= 0;
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	let position = Math.floor(opt.game_frame * opt.frame_stagger) % opt.location.length;
	const frame_x = opt.location[position]?.x;
	const frame_y = opt.location[position]?.y;

	if (frame_x !== undefined && frame_y !== undefined) {
		opt.ctx.drawImage(opt.img, frame_x, frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);
		opt.game_frame++;

		requestAnimationFrame(() => {
			if (playerAnimatedId === opt.animateId) {
				animatePlayer(opt);
			}
		});
	}
};
