import { layer } from "./layer.js";

export class baseBg {
	width: number;
	height: number;
	ground: number;
	canvas_width: number;
	canvas_height: number;

	private img_setup = (src: string) => {
		const result = new Image();
		result.src = src;
		return result;
	};

	bg_list: layer[] = [];

	constructor(opt: { img: { url: string; speed_modifier: number }[]; canvas_width: number; canvas_height: number; width: number; height: number; ground: number }) {
		this.width = opt.width;
		this.height = opt.height;
		this.ground = opt.ground;

		this.canvas_width = opt.canvas_width;
		this.canvas_height = opt.canvas_height;

		opt.img.forEach((i) => {
			this.bg_list.push(new layer({ img: this.img_setup(i.url), canvas_height: this.canvas_height, width: this.width, height: this.height, speed_modifier: i.speed_modifier }));
		});
	}

	update = (opt: { game_speed: number }) => {
		this.bg_list.forEach((i) => {
			i.update(opt.game_speed);
		});
	};

	draw = (opt: { ctx: CanvasRenderingContext2D }) => {
		this.bg_list.forEach((i) => {
			i.draw(opt.ctx);
		});
	};
}
