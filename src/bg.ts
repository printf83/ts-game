class layer {
	img: HTMLImageElement;

	x: number;
	y: number;
	width: number;
	height: number;
	ratio: number;
	canvas_width: number;
	canvas_height: number;

	x2: number;

	speed_modifier: number;
	constructor(opt: { img: HTMLImageElement; width: number; height: number; canvas_height: number; speed_modifier: number }) {
		this.img = opt.img;

		this.x = 0;
		this.y = 0;
		this.width = opt.width;
		this.height = opt.height;
		this.canvas_height = opt.canvas_height;

		this.ratio = this.width / this.height;
		this.canvas_width = this.canvas_height * this.ratio;

		// 		console.log(`Width: ${this.width}
		// Height: ${this.height}
		// Ratio (W/H): ${this.ratio}
		// Canvas Height: ${opt.canvas_height}
		// Canvas Width: ${this.canvas_width}`);

		this.speed_modifier = opt.speed_modifier;

		this.x2 = this.x + this.width;
	}

	update(game_speed: number) {
		this.x -= game_speed * this.speed_modifier;
		if (this.x < 0 - this.width) this.x = 0;
		this.x2 = this.x + this.width - game_speed - 2;
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.img, this.x2, this.y, this.width, this.height);
	}
}

export class bg {
	width = 2400;
	height = 700;
	canvas_width: number;
	canvas_height: number;

	img_setup = (src: string) => {
		const result = new Image();
		result.src = src;
		return result;
	};

	bg_list: layer[] = [];

	game_speed: number;

	constructor(opt: { game_speed: number; canvas_width: number; canvas_height: number }) {
		this.game_speed = opt.game_speed;
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.bg_list.push(new layer({ img: this.img_setup("./res/layer-1.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.2 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/layer-2.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.4 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/layer-3.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.6 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/layer-4.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 0.8 }));

		this.bg_list.push(new layer({ img: this.img_setup("./res/layer-5.png"), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: 1 }));
	}

	set_game_speed = (game_speed: number) => {
		this.game_speed = game_speed;
	};

	update = (game_speed: number) => {
		this.bg_list.forEach((i) => {
			i.update(game_speed);
		});
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		this.bg_list.forEach((i) => {
			i.draw(ctx);
		});
	};
}

export const animate_bg = (opt: { ctx: CanvasRenderingContext2D; ctl: HTMLInputElement; lbl: HTMLSpanElement; canvas_width: number; canvas_height: number }) => {
	const obj_bg = new bg({
		game_speed: 5,
		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
	});

	opt.ctl.addEventListener("change", (event) => {
		const target = event.currentTarget as HTMLInputElement;
		const value = target.value;
		if (value && obj_bg) {
			opt.lbl.innerText = `[${value}]`;
			obj_bg.set_game_speed(parseInt(value));
		}
	});

	bg_animate({
		ctx: opt.ctx,
		bg: obj_bg,
		canvas_width: opt.canvas_width,
		canvas_height: opt.canvas_height,
		game_frame: 0,
	});

	opt.ctl.dispatchEvent(new Event("change"));
};

const bg_animate = (opt: { ctx: CanvasRenderingContext2D; bg: bg; canvas_width: number; canvas_height: number; game_frame: number }) => {
	opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);

	if (opt.bg) {
		opt.bg.update(opt.bg.game_speed);
		opt.bg.draw(opt.ctx);
	}

	requestAnimationFrame(() => {
		bg_animate(opt);
	});
};
