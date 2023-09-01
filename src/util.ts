export const MathPI = Math.PI;
export const MathPI2 = MathPI * 2;
export const MathFloor = (n: number) => (n + (n < 0 ? -1 : 0)) >> 0;
export const MathFloorPosifive = (n: number) => n >> 0;

let random_index = 0;
const random_table = Array(1e6)
	.fill(0)
	.map((_i) => Math.random());

export const MathRandom = (): number => (++random_index >= 1e6 ? random_table[(random_index = 0)]! : random_table[random_index]!);
export const read_random_index = () => random_index;

export const draw_text = (opt: {
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
}) => {
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
