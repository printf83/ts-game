let bg_game_speed = 5;

export const update_game_speed = (value: number) => {
	bg_game_speed = value;
};

class layer {
	x: number;
	y: number;
	width: number;
	height: number;
	img: HTMLImageElement;
	game_speed: number;
	speed_modifier: number;
	constructor(img: string, width: number, height: number, speed_modifier: number) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;

		this.img = new Image();
		this.img.src = img;

		this.speed_modifier = speed_modifier;
		this.game_speed = bg_game_speed * this.speed_modifier;
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

export const bgDB = [new layer("./res/layer-1.png", 2400, 700, 0.2), new layer("./res/layer-2.png", 2400, 700, 0.4), new layer("./res/layer-3.png", 2400, 700, 0.6), new layer("./res/layer-4.png", 2400, 700, 0.8), new layer("./res/layer-5.png", 2400, 700, 1)];

let bgAnimatedId = "";
export const bg = (opt: { canvas: HTMLCanvasElement; game_speed: number; bg: layer[] }) => {
	bg_game_speed = bg_game_speed;

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
		i.update(opt.game_frame, bg_game_speed);
		i.draw(opt.ctx);
	});

	opt.game_frame--;

	requestAnimationFrame(() => {
		if (bgAnimatedId === opt.animateId) {
			animateBg(opt);
		}
	});
};
