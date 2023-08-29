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
	bar_color: string;
	shadow_color?: string;
	shadow_blur?: number;

	bar_x: number;
	bar_y: number;
	bar_width: number;
	bar_height: number;

	padding: number;

	constructor(opt: { x: number; y: number; min?: number; max?: number; width: number; height?: number; value?: number; bg_color?: string; bar_color?: string; shadow_color?: string; shadow_blur?: number }) {
		opt.shadow_color ??= "grey";
		opt.shadow_blur ??= 2;
		opt.bg_color ??= "white";
		opt.bar_color ??= "red";
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

		this.padding = 2;

		this.bar_x = this.x + this.padding;
		this.bar_y = this.y + this.padding;
		this.bar_height = this.height - this.padding * 2;
		this.bar_width = (this.width - this.padding * 2) * this.percent;

		this.bg_color = opt.bg_color;
		this.bar_color = opt.bar_color;
		this.shadow_color = opt.shadow_color;
		this.shadow_blur = opt.shadow_blur;
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
		ctx.save();

		// if (this.shadow_color) ctx.shadowColor = this.shadow_color;
		// if (this.shadow_blur) ctx.shadowBlur = this.shadow_blur;

		// ctx.fillStyle = this.bg_color;
		// ctx.fillRect(this.x, this.y, this.width, this.height);

		// if (this.shadow_blur) ctx.shadowBlur = 0;

		// ctx.fillStyle = this.bar_color;
		// ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);

		if (this.shadow_color && this.shadow_blur) {
			ctx.fillStyle = this.shadow_color;
			ctx.fillRect(this.x + this.shadow_blur, this.y + this.shadow_blur, this.width, this.height);
		}

		ctx.fillStyle = this.bg_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = this.bar_color;
		ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);

		ctx.restore();
	}
}
