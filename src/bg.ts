let BG_GAME_SPEED = 5;

export const update_game_speed = (value: number) => {
	BG_GAME_SPEED = value;
};

class layer {
	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;

	game_speed: number;
	speed_modifier: number;
	constructor(opt: { img: HTMLImageElement; width: number; height: number; speed_modifier: number }) {
		this.img = opt.img;

		this.x = 0;
		this.y = 0;
		this.width = opt.width;
		this.height = opt.height;

		this.speed_modifier = opt.speed_modifier;
		this.game_speed = BG_GAME_SPEED * this.speed_modifier;
	}

	update(game_frame: number, game_speed: number) {
		this.game_speed = game_speed * this.speed_modifier;
		this.x = (game_frame * this.game_speed) % this.width;
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
	}
}

const img_width = 2400;
const img_height = 700;
const img = (src: string) => {
	const result = new Image();
	result.src = src;
	return result;
};

export const bgDB = [
	new layer({ img: img("./res/layer-1.png"), width: img_width, height: img_height, speed_modifier: 0.2 }),
	new layer({ img: img("./res/layer-2.png"), width: img_width, height: img_height, speed_modifier: 0.4 }),
	new layer({ img: img("./res/layer-3.png"), width: img_width, height: img_height, speed_modifier: 0.6 }),
	new layer({ img: img("./res/layer-4.png"), width: img_width, height: img_height, speed_modifier: 0.8 }),
	new layer({ img: img("./res/layer-5.png"), width: img_width, height: img_height, speed_modifier: 1 }),
];

let bgAnimatedId = "";
export const bg = (opt: { canvas: HTMLCanvasElement; game_speed: number; bg: layer[] }) => {
	BG_GAME_SPEED = BG_GAME_SPEED;

	const ctx = opt.canvas.getContext("2d");

	const CANVAS_WIDTH = (opt.canvas.width = 800);
	const CANVAS_HEIGHT = (opt.canvas.height = 700);

	if (ctx) {
		bgAnimatedId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "");

		animateBg({
			animateId: bgAnimatedId,
			ctx,
			bg: opt.bg,
			game_frame: 0,
			canvas_width: CANVAS_WIDTH,
			canvas_height: CANVAS_HEIGHT,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	bg: layer[];
	game_frame: number;
	canvas_width: number;
	canvas_height: number;
}

const animateBg = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	opt.bg.forEach((i) => {
		i.update(opt.game_frame, BG_GAME_SPEED);
		i.draw(opt.ctx);
	});

	opt.game_frame--;

	requestAnimationFrame(() => {
		if (bgAnimatedId === opt.animateId) {
			animateBg(opt);
		}
	});
};
