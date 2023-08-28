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

	bar_x: number;
	bar_y: number;
	bar_width: number;
	bar_height: number;

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
		bar_color?: string;
	}) {
		this.x = opt.x;
		this.y = opt.y;
		this.min = opt.min ? opt.min : 0;
		this.max = opt.max ? opt.max : 100;
		this.width = opt.width;
		this.height = opt.height ? opt.height : 20;
		this.value = opt.value ? opt.value : 0;
		this.percent = this.value / this.max;

		this.padding = 2;

		this.bar_x = this.x + this.padding;
		this.bar_y = this.y + this.padding;
		this.bar_height = this.height - this.padding * 2;
		this.bar_width = (this.width - this.padding * 2) * this.percent;

		this.bg_color = opt.bg_color ? opt.bg_color : "white";
		this.bar_color = opt.bar_color ? opt.bar_color : "red";
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
		ctx.fillStyle = this.bg_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.bar_color;
		ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
		ctx.restore();
	}
}
