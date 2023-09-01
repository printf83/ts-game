export class progress {
	x: number;
	y: number;
	min: number;
	max: number;
	width: number;
	height: number;
	value: number;
	percent: number;

	bg_color: string;
	bar_color: string | string[];
	shadow_color?: string;
	shadow_blur?: number;

	bar_x: number;
	bar_y: number;
	bar_width: number;
	bar_max_width: number;
	bar_height: number;

	shadow_x: number;
	shadow_y: number;
	shadow_width: number;
	shadow_height: number;

	radius: number;
	padding: number;

	constructor(opt: {
		x: number;
		y: number;
		min?: number;
		max?: number;
		width: number;
		height?: number;
		value?: number;
		bg_color?: string;
		bar_color?: string | string[];
		shadow_color?: string;
		shadow_blur?: number;
		radius?: number;
		padding?: number;
	}) {
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

		this.bg_color = opt.bg_color;
		this.bar_color = opt.bar_color;
		this.shadow_color = opt.shadow_color;
		this.shadow_blur = opt.shadow_blur;

		this.shadow_x = this.x - this.shadow_blur;
		this.shadow_y = this.y - this.shadow_blur;
		this.shadow_width = this.width + this.shadow_blur * 2;
		this.shadow_height = this.height + this.shadow_blur * 2;
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
	draw(ctx: CanvasRenderingContext2D) {
		// ctx.save();

		// if (this.shadow_color && this.shadow_blur) {
		// 	ctx.fillStyle = this.shadow_color;
		// 	ctx.fillRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height);
		// }

		// ctx.fillStyle = this.bg_color;
		// ctx.fillRect(this.x, this.y, this.width, this.height);

		// ctx.fillStyle = this.bar_color;
		// ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);

		// ctx.restore();

		ctx.save();

		if (this.radius) {
			if (this.shadow_color && this.shadow_blur) {
				ctx.beginPath();
				ctx.fillStyle = this.shadow_color;
				ctx.roundRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height, [this.radius]);
				ctx.fill();
			}
			ctx.beginPath();
			ctx.fillStyle = this.bg_color;
			ctx.roundRect(this.x, this.y, this.width, this.height, [this.radius]);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = this.gradient_bar_color(this.bar_color, ctx, this.bar_x, this.bar_max_width);
			ctx.roundRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height, [this.radius]);
			ctx.fill();
		} else {
			if (this.shadow_color && this.shadow_blur) {
				ctx.fillStyle = this.shadow_color;
				ctx.fillRect(this.shadow_x, this.shadow_y, this.shadow_width, this.shadow_height);
			}
			ctx.fillStyle = this.bg_color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.fillStyle = this.gradient_bar_color(this.bar_color, ctx, this.bar_x, this.bar_max_width);
			ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
		}

		ctx.restore();
	}

	gradient_bar_color(bar_color: string | string[], ctx: CanvasRenderingContext2D, x: number, width: number) {
		if (Array.isArray(bar_color)) {
			if (bar_color.length >= 2) {
				const color_step = 100 / (bar_color.length - 1) / 100;
				let grad = ctx.createLinearGradient(x, 0, width + x, 0);
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
