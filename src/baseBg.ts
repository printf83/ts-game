import { layer } from "./layer.js";

export class baseBg {
	ctx: CanvasRenderingContext2D;

	ground: number;
	img_width: number;
	img_height: number;
	canvas_width: number;
	canvas_height: number;

	bg_list: layer[] = [];

	constructor(opt: {
		ctx: CanvasRenderingContext2D;
		img_list: { img: HTMLImageElement; speed_modifier: number }[];
		ground: number;
		img_width: number;
		img_height: number;
		canvas_width: number;
		canvas_height: number;
	}) {
		this.ctx = opt.ctx;

		this.img_width = opt.img_width;
		this.img_height = opt.img_height;
		this.ground = opt.ground;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		opt.img_list.forEach((i) => {
			this.bg_list.push(
				new layer({
					ctx: this.ctx,
					img: i.img,
					canvas_height: this.canvas_height,
					img_width: this.img_width,
					img_height: this.img_height,
					speed_modifier: i.speed_modifier,
				})
			);
		});
	}

	update = (opt: { game_speed: number }) => {
		this.bg_list.forEach((i) => {
			i.update(opt.game_speed);
		});
	};

	draw = () => {
		this.bg_list.forEach((i) => {
			i.draw();
		});
	};
}
