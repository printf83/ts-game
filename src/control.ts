import { draw_text } from "./util.js";

class elem {
	x: number;
	y: number;

	constructor(opt: { x: number; y: number }) {
		this.x = opt.x;
		this.y = opt.y;
	}
}

class button extends elem {
	img: HTMLImageElement;

	width: number;
	height: number;
	constructor(opt: { img: string; x: number; y: number; width: number; height: number }) {
		super(opt);

		this.img = new Image();
		this.img.src = opt.img;
		this.width = opt.width;
		this.height = opt.height;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

// class box extends elem {
// 	width: number;
// 	height: number;
// 	constructor(opt: { x: number; y: number; width: number; height: number }) {
// 		super(opt);

// 		this.width = opt.width;
// 		this.height = opt.height;
// 	}
// 	draw(opt: { ctx: CanvasRenderingContext2D }) {
// 		opt.ctx.fillStyle = "red";
// 		opt.ctx.fillRect(this.x, this.y, this.width, this.height);
// 	}
// }

class progress extends elem {
	width: number;
	height: number;

	bg_color: string;
	shadow_color?: string;
	shadow_blur?: number;

	shadow_x: number;
	shadow_y: number;
	shadow_width: number;
	shadow_height: number;

	radius: number;

	constructor(opt: {
		x: number;
		y: number;
		width: number;
		height?: number;
		bg_color?: string;
		shadow_color?: string;
		shadow_blur?: number;
		radius?: number;
	}) {
		super({ x: opt.x, y: opt.y });

		opt.height ??= 20;
		opt.shadow_color ??= "#555555";
		opt.shadow_blur ??= 1;
		opt.bg_color ??= "#FFFFFF";
		opt.radius ??= 5;

		this.width = opt.width;
		this.height = opt.height;

		this.radius = opt.radius;
		this.bg_color = opt.bg_color;
		this.shadow_color = opt.shadow_color;
		this.shadow_blur = opt.shadow_blur;

		this.shadow_x = this.x - this.shadow_blur;
		this.shadow_y = this.y - this.shadow_blur;
		this.shadow_width = this.width + this.shadow_blur * 2;
		this.shadow_height = this.height + this.shadow_blur * 2;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.save();

		if (this.radius) {
			if (this.shadow_color && this.shadow_blur) {
				opt.ctx.beginPath();
				opt.ctx.fillStyle = this.shadow_color;
				opt.ctx.roundRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height, [this.radius]);
				opt.ctx.fill();
			}
			opt.ctx.beginPath();
			opt.ctx.fillStyle = this.bg_color;
			opt.ctx.roundRect(this.x, this.y, this.width, this.height, [this.radius]);
			opt.ctx.fill();
		} else {
			if (this.shadow_color && this.shadow_blur) {
				opt.ctx.fillStyle = this.shadow_color;
				opt.ctx.fillRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height);
			}
			opt.ctx.fillStyle = this.bg_color;
			opt.ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		opt.ctx.restore();
	}
}
class text extends elem {
	text_value: string;
	text_align?: CanvasTextAlign;
	font_weight?: number;
	font_family?: string;
	text_color?: string | CanvasGradient | CanvasPattern;
	shadow_color?: string;
	shadow_blur?: number;
	constructor(opt: {
		x: number;
		y: number;
		text: string;
		text_align?: CanvasTextAlign;
		font_weight?: number;
		font_family?: string;
		text_color?: string | CanvasGradient | CanvasPattern;
		shadow_color?: string;
		shadow_blur?: number;
	}) {
		super({ x: opt.x, y: opt.y });

		this.text_value = opt.text;
		this.text_align = opt.text_align;
		this.font_weight = opt.font_weight;
		this.font_family = opt.font_family;
		this.text_color = opt.text_color;
		this.shadow_color = opt.shadow_color;
		this.shadow_blur = opt.shadow_blur;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		draw_text({
			ctx: opt.ctx,
			x: this.x,
			y: this.y,
			text: this.text_value,
			text_align: this.text_align,
			font_weight: this.font_weight,
			font_family: this.font_family,
			text_color: this.text_color,
			shadow_color: this.shadow_color,
			shadow_blur: this.shadow_blur,
		});
	}
}

export class control {
	debug: boolean;
	canvas_width: number;
	canvas_height: number;

	pause: button;
	setting: button;
	up: button;
	down: button;
	left: button;
	right: button;

	progress: progress[] = [];
	text: text[] = [];
	// box: box[] = [];

	constructor(opt: { canvas_width: number; canvas_height: number; debug?: boolean }) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		//text
		this.text.push(new text({ x: 20, y: 60, text: `🎮`, shadow_blur: 0, font_weight: 40 }));

		//level
		this.text.push(new text({ x: (this.canvas_width - this.canvas_width * 0.4) * 0.5, y: 35, text: "Level", text_align: "start" }));

		//life
		this.text.push(new text({ x: this.canvas_width - 150, y: 45, text: `🧡`, text_align: "end", shadow_blur: 0 }));

		//power
		this.text.push(new text({ x: this.canvas_width - 150, y: 75, text: `🚀`, text_align: "end", shadow_blur: 0 }));

		if (this.debug) {
			let text_y = 100;
			let text_y_index = 0;
			const gen_text = (text_value: string) => {
				return new text({
					x: 20,
					y: text_y + text_y_index++ * 20,
					shadow_blur: 0,
					text: text_value,
					text_color: "yellow",
					font_family: "Arial",
					font_weight: 15,
				});
			};

			this.text.push(gen_text("FPS :"));
			this.text.push(gen_text("Dust :"));
			this.text.push(gen_text("Fire :"));
			this.text.push(gen_text("Explosion :"));
			this.text.push(gen_text("Enemy :"));
			this.text.push(gen_text("Score :"));
			this.text.push(gen_text("Random :"));
		}

		//progress
		//game
		this.progress.push(
			new progress({ x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5, y: 45, width: this.canvas_width * 0.4 })
		);

		//life
		this.progress.push(new progress({ x: this.canvas_width - 130, y: 30, width: 100 }));

		//power
		this.progress.push(new progress({ x: this.canvas_width - 130, y: 60, width: 100 }));

		//button
		this.pause = new button({
			img: "./res/ctl/pause.png",
			x: this.canvas_width - 120,
			y: 20,
			width: 30,
			height: 30,
		});
		this.setting = new button({
			img: "./res/ctl/gear.png",
			x: this.canvas_width - 60,
			y: 20,
			width: 30,
			height: 30,
		});
		this.up = new button({
			img: "./res/ctl/up.png",
			x: 190,
			y: this.canvas_height - 240,
			width: 30,
			height: 30,
		});
		this.down = new button({
			img: "./res/ctl/down.png",
			x: 190,
			y: this.canvas_height - 100,
			width: 30,
			height: 30,
		});
		this.left = new button({
			img: "./res/ctl/left.png",
			x: 60,
			y: this.canvas_height - 120,
			width: 30,
			height: 30,
		});
		this.right = new button({
			img: "./res/ctl/right.png",
			x: 350,
			y: this.canvas_height - 120,
			width: 30,
			height: 30,
		});
	}

	draw(opt: { ctx: CanvasRenderingContext2D }) {
		[this.pause, this.setting, this.left, this.right, this.up, this.down, ...this.text, ...this.progress].forEach((i) => {
			i.draw(opt);
		});
	}
	clear(_opt: { ctx: CanvasRenderingContext2D }) {}
}
