import { clear_text, draw_text } from "./util.js";

class box {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;
	width: number;
	height: number;
	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; width: number; height: number }) {
		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	clear() {
		this.ctx.clearRect(this.x, this.y, this.width, this.height);
	}
	draw() {
		this.clear();
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class progress {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;
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

	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; width: number; height?: number; bg_color?: string; shadow_color?: string; shadow_blur?: number; radius?: number }) {
		opt.height ??= 20;
		opt.shadow_color ??= "#555555";
		opt.shadow_blur ??= 1;
		opt.bg_color ??= "#FFFFFF";
		opt.radius ??= 5;

		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;
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
	clear() {
		if (this.shadow_color && this.shadow_blur) this.ctx.clearRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height);
		else this.ctx.clearRect(this.x, this.y, this.width, this.height);
	}
	draw() {
		this.clear();

		this.ctx.save();

		if (this.radius) {
			if (this.shadow_color && this.shadow_blur) {
				this.ctx.beginPath();
				this.ctx.fillStyle = this.shadow_color;
				this.ctx.roundRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height, [this.radius]);
				this.ctx.fill();
			}
			this.ctx.beginPath();
			this.ctx.fillStyle = this.bg_color;
			this.ctx.roundRect(this.x, this.y, this.width, this.height, [this.radius]);
			this.ctx.fill();
		} else {
			if (this.shadow_color && this.shadow_blur) {
				this.ctx.fillStyle = this.shadow_color;
				this.ctx.fillRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height);
			}
			this.ctx.fillStyle = this.bg_color;
			this.ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		this.ctx.restore();
	}
}
class text {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;

	text_value: string;
	text_align: CanvasTextAlign;
	font_weight: number;
	font_family: string;
	text_color: string | CanvasGradient | CanvasPattern;
	shadow_color: string;
	shadow_blur: number;

	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; text: string; text_align?: CanvasTextAlign; font_weight?: number; font_family?: string; text_color?: string | CanvasGradient | CanvasPattern; shadow_color?: string; shadow_blur?: number }) {
		opt.font_family ??= "Creepster";
		opt.font_weight ??= 20;
		opt.text_color ??= "white";
		opt.shadow_color ??= "black";
		opt.shadow_blur ??= 2;
		opt.text_align ??= "left";

		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;

		this.text_value = opt.text;
		this.text_align = opt.text_align;
		this.font_weight = opt.font_weight;
		this.font_family = opt.font_family;
		this.text_color = opt.text_color;
		this.shadow_color = opt.shadow_color;
		this.shadow_blur = opt.shadow_blur;
	}
	clear() {
		clear_text({
			ctx: this.ctx,

			x: this.x,
			y: this.y,

			text: this.text_value,
			text_align: this.text_align,
			font_weight: this.font_weight,
			font_family: this.font_family,
			shadow_blur: this.shadow_blur,
		});
	}
	draw() {
		this.clear();

		draw_text({
			ctx: this.ctx,

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

export class gui {
	debug: boolean;

	ctx: CanvasRenderingContext2D;
	canvas_width: number;
	canvas_height: number;

	progress: progress[] = [];
	text: text[] = [];
	box: box[] = [];

	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; debug?: boolean }) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		//text
		this.text.push(new text({ ctx: this.ctx, x: 20, y: 75, text: `🎮`, shadow_blur: 0, font_weight: 50 }));

		//life
		this.text.push(new text({ ctx: this.ctx, x: this.canvas_width - 150, y: 47, text: `🧡`, text_align: "end", shadow_blur: 0 }));

		//power
		this.text.push(new text({ ctx: this.ctx, x: this.canvas_width - 150, y: 78, text: `🚀`, text_align: "end", shadow_blur: 0 }));

		if (this.debug) {
			let text_y = 120;
			let text_y_index = 0;
			const gen_text = (text_value: string) => {
				return new text({
					ctx: this.ctx,
					x: 20,
					y: text_y + text_y_index++ * 25,
					shadow_blur: 0,
					text: text_value,
					text_color: "yellow",
					font_family: "Arial",
					font_weight: 20,
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
		this.progress.push(new progress({ ctx: this.ctx, x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5, y: 60, width: this.canvas_width * 0.4 }));

		//life
		this.progress.push(new progress({ ctx: this.ctx, x: this.canvas_width - 130, y: 30, width: 100 }));

		//power
		this.progress.push(new progress({ ctx: this.ctx, x: this.canvas_width - 130, y: 60, width: 100 }));
	}

	draw() {
		[...this.text, ...this.progress, ...this.box].forEach((i) => {
			i.draw();
		});
	}
}
