class elem {
	img: HTMLImageElement;
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(opt: { img: string; x: number; y: number; width: number; height: number }) {
		this.img = new Image();
		this.img.src = opt.img;

		this.x = opt.x;
		this.y = opt.y;
		this.width = opt.width;
		this.height = opt.height;
	}
	draw(opt: { ctx: CanvasRenderingContext2D }) {
		opt.ctx.drawImage(this.img, 0, 0, 16, 16, this.x, this.y, this.width, this.height);
	}
}

class button extends elem {
	constructor(opt: { img: string; x: number; y: number; width: number; height: number }) {
		super(opt);
	}
}

export class control {
	canvas_width: number;
	canvas_height: number;

	pause: button;
	setting: button;
	up: button;
	down: button;
	left: button;
	right: button;

	constructor(opt: { canvas_width: number; canvas_height: number }) {
		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		this.pause = new button({
			img: "./res/ctl/pause.svg",
			x: this.canvas_width - 120,
			y: 20,
			width: 30,
			height: 30,
		});

		this.setting = new button({
			img: "./res/ctl/gear.svg",
			x: this.canvas_width - 60,
			y: 20,
			width: 30,
			height: 30,
		});

		this.up = new button({
			img: "./res/ctl/up.svg",
			x: 190,
			y: this.canvas_height - 240,
			width: 30,
			height: 30,
		});
		this.down = new button({
			img: "./res/ctl/down.svg",
			x: 190,
			y: this.canvas_height - 100,
			width: 30,
			height: 30,
		});
		this.left = new button({
			img: "./res/ctl/left.svg",
			x: 60,
			y: this.canvas_height - 120,
			width: 30,
			height: 30,
		});
		this.right = new button({
			img: "./res/ctl/right.svg",
			x: 350,
			y: this.canvas_height - 120,
			width: 30,
			height: 30,
		});
	}

	draw(opt: { ctx: CanvasRenderingContext2D }) {
		[this.pause, this.setting, this.left, this.right, this.up, this.down].forEach((i) => {
			i.draw(opt);
		});
	}
}
