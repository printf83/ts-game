import { ASSET } from "./asset.js";
import { COLOR, MathFloor, clear_text, draw_text } from "./util.js";

class box {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;
	width: number;
	height: number;

	debug: boolean;

	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; width: number; height: number; debug?: boolean }) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	clear() {
		this.ctx.clearRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);
		if (this.debug) this.ctx.strokeRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);
	}
	draw() {
		this.clear();
		this.ctx.fillRect(MathFloor(this.x), MathFloor(this.y), this.width, this.height);
	}
}

class image {
	ctx: CanvasRenderingContext2D;

	img: HTMLImageElement;
	img_width: number;
	img_height: number;

	x: number;
	y: number;
	width: number;
	height: number;

	debug: boolean;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;

		img: string;
		img_width: number;
		img_height: number;

		x: number;
		y: number;
		width: number;
		height: number;

		debug?: boolean;
	}) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.img = new Image();
		this.img.src = opt.img;
		this.img_width = opt.img_width;
		this.img_height = opt.img_height;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	clear() {
		this.ctx.clearRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);
		if (this.debug) this.ctx.strokeRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);
	}
	draw() {
		this.clear();
		this.ctx.fillStyle = `rgb(${COLOR.red})`;
		this.ctx.drawImage(this.img, 0, 0, this.img_width, this.img_height, MathFloor(this.x), MathFloor(this.y), this.width, this.height);
	}
}

class progress {
	debug: boolean;
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

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		width: number;
		height?: number;
		bg_color?: string;
		shadow_color?: string;
		shadow_blur?: number;
		radius?: number;
		debug?: boolean;
	}) {
		opt.height ??= 20;
		opt.shadow_color ??= "#555555";
		opt.shadow_blur ??= 1;
		opt.bg_color ??= "#FFFFFF";
		opt.radius ??= 5;
		opt.debug ??= false;

		this.debug = opt.debug;

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
		if (this.shadow_color && this.shadow_blur)
			this.ctx.clearRect(MathFloor(this.shadow_x - 2), MathFloor(this.shadow_y - 2), this.shadow_width + 4, this.shadow_height + 4);
		else this.ctx.clearRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);

		if (this.debug) {
			if (this.shadow_color && this.shadow_blur)
				this.ctx.strokeRect(
					MathFloor(this.shadow_x - 2),
					MathFloor(this.shadow_y - 2),
					this.shadow_width + 4,
					this.shadow_height + 4
				);
			else this.ctx.strokeRect(MathFloor(this.x - 1), MathFloor(this.y - 1), this.width + 2, this.height + 2);
		}
	}
	draw() {
		this.clear();

		this.ctx.save();

		if (this.radius) {
			if (this.shadow_color && this.shadow_blur) {
				this.ctx.beginPath();
				this.ctx.fillStyle = this.shadow_color;
				this.ctx.roundRect(MathFloor(this.shadow_x), MathFloor(this.shadow_y), this.shadow_width, this.shadow_height, [
					this.radius,
				]);
				this.ctx.fill();
			}
			this.ctx.beginPath();
			this.ctx.fillStyle = this.bg_color;
			this.ctx.roundRect(MathFloor(this.x), MathFloor(this.y), this.width, this.height, [this.radius]);
			this.ctx.fill();
		} else {
			if (this.shadow_color && this.shadow_blur) {
				this.ctx.fillStyle = this.shadow_color;
				this.ctx.fillRect(MathFloor(this.shadow_x), MathFloor(this.shadow_y), this.shadow_width, this.shadow_height);
			}
			this.ctx.fillStyle = this.bg_color;
			this.ctx.fillRect(MathFloor(this.x), MathFloor(this.y), this.width, this.height);
		}

		this.ctx.restore();
	}
}

class text {
	debug: boolean;

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

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		text: string;
		text_align?: CanvasTextAlign;
		font_weight?: number;
		font_family?: string;
		text_color?: string | CanvasGradient | CanvasPattern;
		shadow_color?: string;
		shadow_blur?: number;
		debug?: boolean;
	}) {
		opt.font_family ??= "Creepster";
		opt.font_weight ??= 20;
		opt.text_color ??= `rgb(${COLOR.light})`;
		opt.shadow_color ??= `rgb(${COLOR.dark})`;
		opt.shadow_blur ??= 2;
		opt.text_align ??= "left";
		opt.debug ??= false;

		this.debug = opt.debug;

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
			debug: this.debug,

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
			debug: this.debug,

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
	image: image[] = [];
	box: box[] = [];

	constructor(opt: { ctx: CanvasRenderingContext2D; canvas_width: number; canvas_height: number; debug?: boolean }) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		//text
		this.image.push(
			new image({
				ctx: this.ctx,
				img: ASSET.ctl.icon,
				img_width: 16,
				img_height: 16,
				x: 20,
				y: 30,
				width: 55,
				height: 55,
				debug: this.debug,
			})
		);
		//life
		this.image.push(
			new image({
				ctx: this.ctx,
				img: ASSET.ctl.life_icon,
				img_width: 16,
				img_height: 16,
				x: this.canvas_width - 165,
				y: 30,
				width: 20,
				height: 20,
				debug: this.debug,
			})
		);

		//power
		this.image.push(
			new image({
				ctx: this.ctx,
				img: ASSET.ctl.power_icon,
				img_width: 16,
				img_height: 16,
				x: this.canvas_width - 165,
				y: 60,
				width: 20,
				height: 20,
				debug: this.debug,
			})
		);

		//copyright
		this.text.push(
			new text({
				ctx: this.ctx,
				x: MathFloor(this.canvas_width - 5),
				y: MathFloor(this.canvas_height - 5),
				text: "https://printf83.github.io/ts-game/",
				text_align: "right",
				font_family: "Arial",
				shadow_blur: 0,
				text_color: `rgb(${COLOR.light})`,
				font_weight: 15,
				debug: this.debug,
			})
		);

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
					text_color: `rgb(${COLOR.yellow})`,
					font_family: "Arial",
					font_weight: 20,
					debug: this.debug,
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
			new progress({
				ctx: this.ctx,
				x: this.canvas_width * 0.5 - this.canvas_width * 0.4 * 0.5,
				y: 60,
				width: this.canvas_width * 0.4,
				debug: this.debug,
			})
		);

		//life
		this.progress.push(new progress({ ctx: this.ctx, x: this.canvas_width - 130, y: 30, width: 100, debug: this.debug }));

		//power
		this.progress.push(new progress({ ctx: this.ctx, x: this.canvas_width - 130, y: 60, width: 100, debug: this.debug }));
	}

	draw() {
		[...this.text, ...this.progress, ...this.box, ...this.image].forEach((i) => {
			i.draw();
		});
	}
}
