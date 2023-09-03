export const MathPI = Math.PI;
export const MathPI2 = MathPI * 2;
export const MathFloor = (n: number) => (n + (n < 0 ? -1 : 0)) >> 0;
export const MathFloorPosifive = (n: number) => n >> 0;

let random_index = 0;
const random_max = 32000;
const random_table = Array(random_max)
	.fill(0)
	.map((_i) => Math.random());

export const MathRandom = (): number => (++random_index >= random_max ? random_table[(random_index = 0)]! : random_table[random_index]!);
export const read_random_index = () => random_index;

export const genUID = () => {
	return Array(3)
		.fill("")
		.map((_i) => MathFloor(MathRandom() * 255));
};

export const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const isFullscreen = () => window.innerHeight === screen.height;

export const DPI = window.devicePixelRatio;

const measure_text = (opt: { ctx: CanvasRenderingContext2D; text: string; font_weight?: number; font_family?: string; text_align?: CanvasTextAlign }) => {
	opt.font_family ??= "Creepster";
	opt.font_weight ??= 20;
	opt.text_align ??= "left";

	opt.ctx.save();
	opt.ctx.font = `${opt.font_weight}px ${opt.font_family}`;
	opt.ctx.textAlign = opt.text_align;
	const metrics = opt.ctx.measureText(opt.text);
	opt.ctx.restore();

	return { w: metrics.width, h: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent };
};

export const clear_text = (opt: { ctx: CanvasRenderingContext2D; x: number; y: number; text: string; text_align?: CanvasTextAlign; font_weight?: number; font_family?: string; shadow_blur?: number }) => {
	opt.font_family ??= "Creepster";
	opt.font_weight ??= 20;
	opt.shadow_blur ??= 2;
	opt.text_align ??= "left";

	const metrics = measure_text({
		ctx: opt.ctx,
		text: opt.text,
		font_weight: opt.font_weight,
		font_family: opt.font_family,
	});

	let x: number = 0;
	let y: number = 0;
	let w: number = 0;
	let h: number = 0;

	if (opt.text_align === "start" || opt.text_align === "left") {
		x = opt.x;
		y = opt.y;
		w = metrics.w + opt.shadow_blur;
		h = metrics.h + opt.shadow_blur;
	} else if (opt.text_align === "end" || opt.text_align === "right") {
		x = opt.x - metrics.w;
		y = opt.y - metrics.h;
		w = metrics.w + opt.shadow_blur;
		h = metrics.h + opt.shadow_blur;
	} else {
		x = opt.x - metrics.w * 0.5;
		y = opt.y - metrics.h;
		w = metrics.w + opt.shadow_blur;
		h = metrics.h + opt.shadow_blur;
	}

	opt.ctx.clearRect(MathFloor(x - opt.font_weight), MathFloor(y - opt.font_weight), MathFloor(w + opt.font_weight * 2), MathFloor(h + opt.font_weight * 2));
};

export const draw_clear_text = (opt: { ctx: CanvasRenderingContext2D; x: number; y: number; text: string; text_align?: CanvasTextAlign; font_weight?: number; font_family?: string; text_color?: string | CanvasGradient | CanvasPattern; shadow_color?: string; shadow_blur?: number }) => {
	opt.font_family ??= "Creepster";
	opt.font_weight ??= 20;
	opt.text_color ??= "white";
	opt.shadow_color ??= "black";
	opt.shadow_blur ??= 2;
	opt.text_align ??= "left";

	clear_text(opt);
	draw_text(opt);
};
export const draw_text = (opt: { ctx: CanvasRenderingContext2D; x: number; y: number; text: string; text_align?: CanvasTextAlign; font_weight?: number; font_family?: string; text_color?: string | CanvasGradient | CanvasPattern; shadow_color?: string; shadow_blur?: number }) => {
	opt.font_family ??= "Creepster";
	opt.font_weight ??= 20;
	opt.text_color ??= "white";
	opt.shadow_color ??= "black";
	opt.shadow_blur ??= 2;
	opt.text_align ??= "left";

	opt.ctx.save();

	opt.ctx.textAlign = opt.text_align;
	opt.ctx.font = `${opt.font_weight}px ${opt.font_family}`;

	opt.ctx.fillStyle = opt.shadow_color;
	opt.ctx.fillText(opt.text, MathFloor(opt.x + opt.shadow_blur), MathFloor(opt.y + opt.shadow_blur));

	//text
	opt.ctx.fillStyle = opt.text_color;
	opt.ctx.fillText(opt.text, MathFloor(opt.x), MathFloor(opt.y));

	opt.ctx.restore();
};
