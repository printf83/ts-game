export const draw_text = (opt: {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	text: string;
	text_align?: CanvasTextAlign;
	font_weight?: string;
	font_family?: string;
	text_color?: string | CanvasGradient | CanvasPattern;
	shadow_color?: string;
	shadow_blur?: number;
}) => {
	opt.font_family ??= "Helvetica";
	opt.font_weight ??= "20px";
	opt.text_color ??= "white";
	opt.shadow_color ??= "black";
	opt.shadow_blur ??= 1;
	opt.text_align ??= "left";

	opt.ctx.save();

	opt.ctx.textAlign = opt.text_align;
	opt.ctx.font = `${opt.font_weight} ${opt.font_family}`;
	opt.ctx.shadowColor = opt.shadow_color;
	opt.ctx.shadowBlur = opt.shadow_blur;
	opt.ctx.fillText(opt.text, opt.x, opt.y);
	opt.ctx.shadowBlur = 0;
	opt.ctx.fillStyle = opt.text_color;
	opt.ctx.fillText(opt.text, opt.x, opt.y);

	// opt.ctx.textAlign = opt.text_align;
	// opt.ctx.font = `${opt.font_weight} ${opt.font_family}`;
	// opt.ctx.fillStyle = opt.shadow_color;
	// opt.ctx.fillText(opt.text, opt.x, opt.y);
	// opt.ctx.fillStyle = opt.text_color;
	// opt.ctx.fillText(opt.text, opt.x + opt.shadow_blur, opt.y + opt.shadow_blur);

	opt.ctx.restore();
};
