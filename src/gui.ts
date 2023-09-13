import { ASSET, ASSETIMG, ASSETSVG, COLOR } from "./asset.js";
import { clear_text, draw_text } from "./util.js";

class box {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;
	width: number;
	height: number;

	debug: boolean;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		width: number;
		height: number;
		debug?: boolean;
	}) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	clear() {
		this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
		if (this.debug)
			this.ctx.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
	}
	draw() {
		this.clear();
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
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

		img: HTMLImageElement;
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

		this.img = opt.img;
		this.img_width = opt.img_width;
		this.img_height = opt.img_height;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	clear() {
		this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
		if (this.debug)
			this.ctx.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
	}
	draw() {
		this.clear();
		this.ctx.fillStyle = `rgb(${COLOR.red})`;
		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.img_width,
			this.img_height,
			this.x,
			this.y,
			this.width,
			this.height
		);
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
	border_color?: string;
	border_size?: number;

	radius: number;

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		width: number;
		height?: number;
		bg_color?: string;
		border_color?: string;
		border_size?: number;
		radius?: number;
		debug?: boolean;
	}) {
		opt.height ??= 20;
		opt.border_color ??= `rgba(${COLOR.dark}, 0.8)`;
		opt.border_size ??= 2;
		opt.bg_color ??= `rgba(${COLOR.light}, 0.8)`;
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
		this.border_color = opt.border_color;
		this.border_size = opt.border_size;
	}
	clear() {
		if (this.border_color && this.border_size)
			this.ctx.clearRect(
				this.x - this.border_size,
				this.y - this.border_size,
				this.width + this.border_size * 2,
				this.height + this.border_size * 2
			);
		else this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);

		if (this.debug) {
			if (this.border_color && this.border_size)
				this.ctx.strokeRect(
					this.x - this.border_size,
					this.y - this.border_size,
					this.width + this.border_size * 2,
					this.height + this.border_size * 2
				);
			else this.ctx.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
		}
	}
	draw() {
		this.clear();

		this.ctx.save();
		this.ctx.beginPath();

		if (this.border_color && this.border_size) {
			this.ctx.strokeStyle = this.border_color;
			this.ctx.lineWidth = this.border_size;
		}

		this.ctx.fillStyle = this.bg_color;

		if (this.radius) this.ctx.roundRect(this.x, this.y, this.width, this.height, [this.radius]);
		else this.ctx.fillRect(this.x, this.y, this.width, this.height);

		this.ctx.fill();
		if (this.border_color && this.border_size) this.ctx.stroke();

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

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		canvas_width: number;
		canvas_height: number;
		debug?: boolean;
	}) {
		opt.debug ??= false;
		this.debug = opt.debug;

		this.ctx = opt.ctx;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		//thropy
		this.image.push(
			new image({
				ctx: this.ctx,
				img: ASSETIMG(ASSET.ctl.icon_png),
				img_width: 72,
				img_height: 72,
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
				img: ASSETSVG("life", `rgb(${COLOR.red})`),
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
				img: ASSETSVG("lightning", `rgb(${COLOR.yellow})`),
				img_width: 16,
				img_height: 16,
				x: this.canvas_width - 165,
				y: 60,
				width: 20,
				height: 20,
				debug: this.debug,
			})
		);

		//url
		this.text.push(
			new text({
				ctx: this.ctx,
				x: 5,
				y: this.canvas_height - 5,
				text: "https://github.com/printf83/ts-game",
				text_align: "left",
				font_family: "Arial",
				shadow_blur: 0,
				text_color: `rgb(${COLOR.light})`,
				font_weight: 15,
				debug: this.debug,
			})
		);
		this.text.push(
			new text({
				ctx: this.ctx,
				x: this.canvas_width - 5,
				y: this.canvas_height - 5,
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
		this.progress.push(
			new progress({
				ctx: this.ctx,
				x: this.canvas_width - 130,
				y: 30,
				width: 100,
				debug: this.debug,
			})
		);

		//power
		this.progress.push(
			new progress({
				ctx: this.ctx,
				x: this.canvas_width - 130,
				y: 60,
				width: 100,
				debug: this.debug,
			})
		);
	}

	draw() {
		[...this.text, ...this.progress, ...this.box, ...this.image].forEach((i) => {
			i.draw();
		});
	}
}
