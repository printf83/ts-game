export class progress {
	ctx: CanvasRenderingContext2D;

	x: number;
	y: number;
	min: number;
	max: number;
	width: number;
	height: number;
	value: number;
	percent: number;

	bar_color: string | string[];

	bar_x: number;
	bar_y: number;
	bar_width: number;
	bar_max_width: number;
	bar_height: number;

	radius: number;
	padding: number;

	constructor(opt: { ctx: CanvasRenderingContext2D; x: number; y: number; min?: number; max?: number; width: number; height?: number; value?: number; bg_color?: string; bar_color?: string | string[]; shadow_color?: string; shadow_blur?: number; radius?: number; padding?: number }) {
		opt.shadow_color ??= "#555555";
		opt.shadow_blur ??= 1;
		opt.bg_color ??= "#FFFFFF";
		opt.bar_color ??= "#555555";
		opt.radius ??= 5;
		opt.padding ??= 2;
		opt.min ??= 0;
		opt.max ??= 1000;
		opt.height ??= 20;
		opt.value ??= 0;

		this.ctx = opt.ctx;

		this.x = opt.x;
		this.y = opt.y;
		this.min = opt.min;
		this.max = opt.max;
		this.width = opt.width;
		this.height = opt.height;
		this.value = opt.value;
		this.percent = this.value / this.max;

		this.radius = opt.radius;
		this.padding = opt.padding;

		this.bar_x = this.x + this.padding;
		this.bar_y = this.y + this.padding;
		this.bar_height = this.height - this.padding * 2;
		this.bar_max_width = this.width - this.padding * 2;
		this.bar_width = this.bar_max_width * this.percent;

		this.bar_color = opt.bar_color;
	}
	update(value: number, min?: number, max?: number) {
		this.min = min ?? this.min;
		this.max = max ?? this.max;

		this.value = value;
		if (this.value < this.min) this.value = this.min;
		if (this.value > this.max) this.value = this.max;
		this.percent = this.value / this.max;
		this.bar_width = (this.width - this.padding * 2) * this.percent;
	}
	clean() {
		this.ctx.clearRect(this.bar_x, this.bar_y, this.bar_max_width, this.bar_height);
	}
	draw() {
		this.clean();
		this.ctx.save();

		if (this.radius) {
			this.ctx.beginPath();
			this.ctx.fillStyle = this.gradient_bar_color(this.bar_color, this.bar_x, this.bar_max_width);
			this.ctx.roundRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height, [this.radius]);
			this.ctx.fill();
		} else {
			this.ctx.fillStyle = this.gradient_bar_color(this.bar_color, this.bar_x, this.bar_max_width);
			this.ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
		}

		this.ctx.restore();
	}

	gradient_bar_color(bar_color: string | string[], x: number, width: number) {
		if (Array.isArray(bar_color)) {
			if (bar_color.length >= 2) {
				const color_step = 100 / (bar_color.length - 1) / 100;
				let grad = this.ctx.createLinearGradient(x, 0, width + x, 0);
				bar_color.forEach((i, ix) => {
					grad.addColorStop(ix * color_step, i);
				});
				return grad;
			} else if (bar_color.length === 1 && bar_color[0]) {
				return bar_color[0];
			} else {
				return "black";
			}
		} else return bar_color;
	}
}
