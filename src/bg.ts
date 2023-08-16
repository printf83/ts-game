let bg_game_speed = 5;

export const update_game_speed = (value: number) => {
	bg_game_speed = value;
};

let bgAnimatedId = "";
export const bg = (opt: { canvas: HTMLCanvasElement; game_speed: number }) => {
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
			bg: [new layer("./res/layer-1.png", 0.2), new layer("./res/layer-2.png", 0.4), new layer("./res/layer-3.png", 0.6), new layer("./res/layer-4.png", 0.8), new layer("./res/layer-5.png", 1)],
			canvas_width: CANVAS_WIDTH,
			canvas_height: CANVAS_HEIGHT,
		});
	}
};

interface option {
	animateId: string;
	ctx: CanvasRenderingContext2D;
	bg: layer[];
	canvas_width: number;
	canvas_height: number;
}

class layer {
	x: number;
	y: number;
	width: number;
	height: number;
	x2: number;
	img: HTMLImageElement;
	game_speed: number;
	speed_modifier: number;
	constructor(img: string, speed_modifier: number) {
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 700;

		this.x2 = this.width;

		this.img = new Image();
		this.img.src = img;

		this.speed_modifier = speed_modifier;
		this.game_speed = bg_game_speed * this.speed_modifier;
	}

	update(game_speed: number) {
		this.game_speed = game_speed * this.speed_modifier;
		if (this.x < -this.width) {
			this.x = this.width + this.x2 - this.game_speed;
		}

		if (this.x2 < -this.width) {
			this.x2 = this.width + this.x - this.game_speed;
		}

		this.x = Math.floor(this.x - this.game_speed);
		this.x2 = Math.floor(this.x2 - this.game_speed);
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.img, this.x2, this.y, this.width, this.height);
	}
}

const animateBg = (opt: option) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	opt.bg.forEach((i) => {
		i.update(bg_game_speed);
		i.draw(opt.ctx);
	});

	requestAnimationFrame(() => {
		if (bgAnimatedId === opt.animateId) {
			animateBg(opt);
		}
	});
};
