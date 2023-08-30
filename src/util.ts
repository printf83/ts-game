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
	opt.ctx.fillText(opt.text, opt.x + opt.shadow_blur, opt.y + opt.shadow_blur);

	//text
	opt.ctx.fillStyle = opt.text_color;
	opt.ctx.fillText(opt.text, opt.x, opt.y);

	opt.ctx.restore();
};
